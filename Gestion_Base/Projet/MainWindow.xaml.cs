using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

using System.IO;
using System.Diagnostics;
using System.Net;
using System.Runtime.InteropServices;
using System.Data;
using MySql.Data.MySqlClient;
using System.Configuration;

namespace Projet
{
    /// <summary>
    /// Logique d'interaction pour MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private MySqlConnection connexion; //Instance de MySqlConnection
        private string dossier; //Dossier où sont stockées les images.
        //Pour l'instant le dossier est en chemin absolu. Il faut le préciser dans la méthode Initialisation()

        public MainWindow()
        {
            InitializeComponent();
            Initialisation();
        }


        #region Initialisation
        /// <summary>
        /// Permet d'ouvrir une instance de MySqlConnection pour faire le lien avec une base de données MySql
        /// </summary>
        /// <param name="server">Serveur de la base de données MySql</param>
        /// <param name="port">Port associé à la base de données</param>
        /// <param name="database">Nom de la base de données</param>
        /// <param name="userId">Id de l'utilisateur</param>
        /// <param name="password">Mot de passe de l'utilisateur</param>
        /// <returns>Instance de MySqlConnection pour une connexion ouverte</returns>
        private MySqlConnection OuvrirConnexion(string server, string port, string database, string userId, string password)
        {
            Console.WriteLine();
            MySqlConnection connexion = null;
            try
            {
                //Ouverture de la connexion
                string connexionString = $"SERVER={server};PORT={port};" +
                                         $"DATABASE={database};" +
                                         $"UID={userId};PASSWORD={password}";

                connexion = new MySqlConnection(connexionString);
                connexion.Open();
            }
            catch (MySqlException e) //Message d'erreur en cas de problème dû à MySql
            { MessageBox.Show("Erreur Connexion : " + e.Message); }
            return connexion;
        }

        /// <summary>
        /// Méthode à appeler au lancement du programme
        /// </summary>
        private void Initialisation()
        {
            dossier = @"C:\Users\louis\OneDrive - De Vinci\Documents\Cours\A4\S7\PI2\Gestion_Base\Projet\bin\Debug\pictogrammes\";
            connexion = OuvrirConnexion("localhost", "3306", "Falc", "root", "root");
            Actualiser();
        }

        /// <summary>
        /// Affiche le résultat d'une requête SQL dans un DataGrid
        /// </summary>
        /// <param name="requete">Requête MySql à exécuter</param>
        /// <param name="dg">DataGrid dans lequel on souhaite afficher le résultat</param>
        private void AfficherRequete(string requete, DataGrid dg)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand(requete, connexion);
                MySqlDataAdapter adp = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                adp.Fill(ds, "LoadDataBinding");
                dg.DataContext = ds;
            }
            catch (MySqlException ex) //Message en cas d'erreur MySql
            { MessageBox.Show("Erreur MySql : " + ex.Message); }
        }

        /// <summary>
        /// Permet d'effectuer un scrolling plus doux sur un scrollviewer lors de l'utilisation
        /// de la molette de la souris
        /// </summary>
        /// <param name="sender">ScrollViewer</param>
        /// <param name="e">Molette de la souris</param>
        private void scrollViewer_PreviewMouseWheel(object sender, MouseWheelEventArgs e)
        {
            ((ScrollViewer)sender).ScrollToVerticalOffset(((ScrollViewer)sender).VerticalOffset - (e.Delta / 4));
            e.Handled = true;
        }

        /// <summary>
        /// Permets de télécharger l'image dont l'URL est entrée en paramètre
        /// </summary>
        /// <param name="url">URL de l'image que l'on souhaite télécharger</param>
        static void download(string url)
        {
            try
            {
                using (WebClient client = new WebClient())
                { client.DownloadFile(new Uri(url), "Image.png"); }
            }
            catch (Exception e) { MessageBox.Show(e.Message); }
        }

        /// <summary>
        /// Méthode à appeler régulièrement pour actualiser l'application
        /// </summary>
        private void Actualiser()
        {
            RemplissageMotsCle();
            MotsCleChampsDefaut();
        }
        #endregion

        #region Mot Cle
        /// <summary>
        /// Remplit le datagrid des mots clés pour l'affichage
        /// </summary>
        private void RemplissageMotsCle()
        {
            string requete = "SELECT mc.id_mc AS ID, Mot, GROUP_CONCAT(url SEPARATOR '\n') AS 'Lien des pictogrammes associés' " +
                "FROM motcle mc " +
                "LEFT JOIN picto_motcle pm ON mc.id_mc = pm.id_mc " +
                "LEFT JOIN picto p ON p.id_pic = pm.id_pic " +
                "GROUP BY mc.id_mc;";
            AfficherRequete(requete, dg_motcle);
        }

        /// <summary>
        /// Permet de modifier le mot-clé sur lequel on vient de cliquer dans le datagrid
        /// </summary>
        /// <param name="sender">Datagrid sur lequel on vient de sélectionner une ligne</param>
        /// <param name="e">Clic de la souris</param>
        private void dg_motcle_MouseUp(object sender, RoutedEventArgs e)
        {
            MotsCleChampsDefaut();
            //On vérifie qu'une ligne du DataGrid a bien été sélectionnée
            if (dg_motcle.SelectedIndex >= 0)
            {
                //On récupère l'id du motcle, qui se situe toujours à la 1ere colonne de la ligne sélectionnée
                string id = (dg_motcle.SelectedItem as DataRowView).Row.ItemArray[0].ToString();

                //On vérifie qu'il s'agisse bien d'une nouvelle selection
                if (dg_motcle.Tag.ToString() != id)
                {
                    //On associe au Tag du datagrid l'id, de sorte que si l'utilisateur venait
                    //à re-sélectionner la même ligne, on enlève tous les champs
                    dg_motcle.Tag = id; 
                    tbk_mc_info.Text = "Modifier / Supprimer mot";

                    //On enlève le bouton "valider" et on met les boutons "modifier" et "supprimer" à la place
                    btn_mc_valider.Visibility = Visibility.Hidden;
                    btn_mc_modifier.Visibility = Visibility.Visible;
                    btn_mc_supprimer.Visibility = Visibility.Visible;

                    //On affiche l'id du mot-clé sélectionné
                    tbk_mc_id.Text = "ID : " + id;
                    tbk_mc_id.Tag = id;

                    //On récupère le mot et les pictogrammes qui lui sont associés
                    string requete = "SELECT mot, GROUP_CONCAT(id_pic) " +
                                     "FROM motcle mc " +
                                     "LEFT JOIN picto_motcle pm ON mc.id_mc = pm.id_mc " +
                                    $"WHERE mc.id_mc = {id};";
                    MySqlCommand cmd = new MySqlCommand(requete, connexion);
                    MySqlDataReader reader = cmd.ExecuteReader();
                    reader.Read();
                    string mot = reader.GetString(0);
                    tbx_mot.Text = mot;

                    //On vérifie qu'il y ait bien des pictogrammes qui soient associés
                    if (!(reader.GetValue(1).ToString() == ""))
                    {
                        string[] pictos = reader.GetString(1).Split(','); //Liste des pictogrammes associés
                        reader.Close(); cmd.Dispose();
                        for (int i = 0; i < pictos.Length; i++)
                        {
                            //On ajoute l'affichage d'un pictogramme sélectionné pour chaque pictogramme
                            btn_plus_mc_Click(null, null);
                            ComboBox cbx = ((StackPanel)(sp_mc_pictos.Children[i])).Children[0] as ComboBox;
                            foreach (ComboBoxItem item in cbx.Items)
                            {
                                //On affiche le bon pictogramme
                                if (item.Tag.ToString() == pictos[i])
                                { cbx.SelectedItem = item; break; }
                            }
                            cbx.IsEnabled = false; //Et on désactive la possibilité de pouvoir changer ce pictogramme là
                        }
                    }
                    else { reader.Close(); cmd.Dispose(); };
                }
                else { dg_motcle.Tag = 0; } //On met un tag par défaut pour pouvoir re-sélectionner la ligne plus tard
            }
        }

        /// <summary>
        /// Permet de donner l'affichage par défaut pour la création d'un mot-clé
        /// </summary>
        private void MotsCleChampsDefaut()
        {
            tbk_mc_info.Text = "Ajouter Mot";
            //On efface le contenu de la TextBox du mot-clé
            tbx_mot.Clear();

            //On affiche le bouton Valider et on cache les 2 autres
            btn_mc_valider.Visibility = Visibility.Visible;
            btn_mc_modifier.Visibility = Visibility.Hidden;
            btn_mc_supprimer.Visibility = Visibility.Hidden;

            //On efface tous les combobox des pictogrammes associés existants
            while (sp_mc_pictos.Children.Count > 0)
            {
                //Le Combobox doit être activé pour ne pas supprimer les pictogrammes associés de la base
                ((StackPanel)sp_mc_pictos.Children[0]).Children[0].IsEnabled = true;
                Button btn = ((StackPanel)sp_mc_pictos.Children[0]).Children[1] as Button;
                btn_mc_picto_Click(btn, null);
            }


            //On précise le numéro du prochain mot-clé
            MySqlCommand cmd = new MySqlCommand("SELECT max(id_mc) + 1 FROM motcle;", connexion);
            MySqlDataReader reader = cmd.ExecuteReader(); reader.Read();
            int id = reader.GetUInt16(0); reader.Close();
            tbk_mc_id.Text = "ID : " + id;
            tbk_mc_id.Tag = id;
        }

        /// <summary>
        /// Permet d'ajouter une combobox avec toutes les images de la base à sélectionner
        /// </summary>
        /// <param name="sender">Bouton '+'</param>
        /// <param name="e">Clic de la souris</param>
        private void btn_plus_mc_Click(object sender, RoutedEventArgs e)
        {
            Thickness mrg = new Thickness(5); //Marge de 5

            //Incrémentation de l'affichage du nombre de pictogrammes sélectionnés
            tbk_nb_picto.Text = (int.Parse(tbk_nb_picto.Text) + 1).ToString();

            //Nouvelle combobox avec des paramètres par défaut
            ComboBox cbx = new ComboBox() { Height = 50, Width = 150, Margin = mrg };
            cbx.Items.Add(new ComboBoxItem() { Height = 50, Content = "--Choisir--", Tag = "0" });
            cbx.SelectedIndex = 0;
            cbx.SelectionChanged += cbx_mc_picto_Selection_Changed;

            //On remplit la combobox
            Remplir_cbx_mc_picto(cbx);

            //Bouton qui permettra d'effacer le combobox que l'on vient de créer
            Button btn = new Button()
            {
                Height = 30,
                Width = 30,
                Content = "X",
                Margin = mrg
            };
            btn.Click += btn_mc_picto_Click;

            //Stackpanel pour afficher le combobox et le bouton côte à côte
            StackPanel sp = new StackPanel()
            {
                Orientation = Orientation.Horizontal,
                Children = { cbx, btn }
            };

            //On ajoute ça au stackpanel principal
            sp_mc_pictos.Children.Add(sp);
        }

        /// <summary>
        /// Remplit une combobox avec la liste des pictogrammes de la base
        /// </summary>
        /// <param name="cbx">Combobox à remplir</param>
        private void Remplir_cbx_mc_picto(ComboBox cbx)
        {
            //On fait la liste des pictogrammes déjà sélectionnés
            string liste = "(0";
            foreach (StackPanel sp in sp_mc_pictos.Children)
            {
                ComboBox cbx2 = sp.Children[0] as ComboBox;
                liste += "," + ((ComboBoxItem)cbx2.SelectedItem).Tag.ToString();
            }

            //On récupère toutes les url des pictogrammes de la base qui n'ont pas déjà été sélectionnés dans
            //les précédents combobox
            string requete = "SELECT id_pic, url FROM picto WHERE id_pic NOT IN " + liste + ");";
            MySqlCommand cmd = new MySqlCommand(requete, connexion);
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                //On récupère l'image pour pouvoir l'afficher
                string src = dossier + reader.GetString(1);
                Image img = new Image()
                {
                    Source = new BitmapImage(new Uri(src)),
                    Height = 50,
                    Width = 50
                };
                //On affiche l'url
                TextBlock tbk = new TextBlock() { Text = reader.GetString(1) };
                StackPanel sp = new StackPanel() { Orientation = Orientation.Horizontal, Children = { img, tbk } };
                //On crée un nouvel item comprenant l'image et l'url côte à côte
                ComboBoxItem item = new ComboBoxItem()
                {
                    Content = sp,
                    Tag = reader.GetString(0)
                };
                cbx.Items.Add(item);
            }
            reader.Close(); cmd.Dispose();
        }

        /// <summary>
        /// Supprime un combobox de pictogramme associé au mot clé.
        /// Si le pictogramme en question était déjà enregistré dans la base de données,
        /// il sera alors supprimé de la base également
        /// </summary>
        /// <param name="sender">Bouton "X"</param>
        /// <param name="e">Clic de la souris</param>
        private void btn_mc_picto_Click(object sender, RoutedEventArgs e)
        {
            //On récupère le stackpanel comprenant le combobox et le bouton
            StackPanel sp = (sender as Button).Parent as StackPanel;
            ComboBox cbx = sp.Children[0] as ComboBox;

            //Si le combobox est désactivé, cela veut dire que l'association avec le pictogramme dans le combobox
            //est déjà enregistré dans la base. On supprime donc l'association de la base
            if (cbx.IsEnabled == false)
            {
                //On récupère l'ID du mot-clé et du pictogramme de l'association
                string id_mc = tbk_mc_id.Tag.ToString();
                string id_pic = ((ComboBoxItem)cbx.SelectedItem).Tag.ToString();

                //Et on supprime
                string requete = "DELETE FROM picto_motcle " +
                                $"WHERE id_mc = {id_mc} AND id_pic = {id_pic}";
                MySqlCommand cmd = new MySqlCommand(requete, connexion);
                cmd.ExecuteNonQuery(); cmd.Dispose();

                //On actualise ensuite l'affichage du datagrid
                RemplissageMotsCle();
            }
            //Puis on efface l'affichage du combobox
            sp_mc_pictos.Children.Remove(sp);

            //Et on décrémente le compteur d'associations de pictogrammes au mot-clé
            tbk_nb_picto.Text = (int.Parse(tbk_nb_picto.Text) - 1).ToString();
        }

        /// <summary>
        /// Supprime des autres combobox la possibilité de choisir le même pictogramme que celui
        /// qui vient d'être sélectionné
        /// </summary>
        /// <param name="sender">Combobox que l'on vient de sélectionner</param>
        /// <param name="e">Changement de sélection</param>
        private void cbx_mc_picto_Selection_Changed(object sender, SelectionChangedEventArgs e)
        {
            ComboBox cbx = sender as ComboBox;
            ComboBoxItem item = cbx.SelectedItem as ComboBoxItem;
            //On vérifie qu'un pictogramme a bien été sélectionné
            if (item.Tag.ToString() != "0")
            {
                //On parcourt tous les combobox
                for (int i = 0; i < Convert.ToInt32(tbk_nb_picto.Text); i++)
                {
                    //On récupère la combobx
                    ComboBox cbx2 = (ComboBox)((StackPanel)sp_mc_pictos.Children[i]).Children[0];
                    //On vérifie qu'il ne s'agi pas de la même
                    if (cbx2 != cbx)
                    {
                        //On récupère l'item correspondant au pictogramme qui vient d'être sélectionné et on le retire
                        foreach (ComboBoxItem it in cbx2.Items)
                        {
                            if (it.Tag.ToString() == item.Tag.ToString())
                            {
                                cbx2.Items.Remove(it);
                                break;
                            }
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Ajoute un nouveau mot-clé et ses associations
        /// </summary>
        /// <param name="sender">Bouton valider</param>
        /// <param name="e">Clic de la souris</param>
        private void btn_mc_valider_Click(object sender, RoutedEventArgs e)
        {
            //On vérifie que le mot contient des lettres
            string mot = tbx_mot.Text;
            if (mot.ToLower() == mot.ToUpper()) { MessageBox.Show("Veuillez entrer un mot-clé"); }
            else
            {
                //On récupère l'id du mot dans le tag du textblock
                string id_mc = tbk_mc_id.Tag.ToString();
                MySqlCommand cmd = new MySqlCommand($"INSERT INTO motcle VALUES ({id_mc},'{mot}');", connexion);
                try
                {
                    //On ajoute le mot
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Le mot " + mot + " a bien été ajouté");

                    foreach (StackPanel sp in sp_mc_pictos.Children)
                    {
                        //Pour chaque pictogramme sélectionné, on ajoute une association
                        ComboBox cbx = sp.Children[0] as ComboBox;
                        string id_pic = ((ComboBoxItem)cbx.SelectedItem).Tag.ToString();
                        cmd.CommandText = $"INSERT INTO picto_motcle VALUES ({id_mc},{id_pic});";
                        cmd.ExecuteNonQuery();
                    }
                }
                catch (MySqlException ex) //Message en cas d'erreur SQL (contrainte non respectée, etc)
                { MessageBox.Show("Erreur MySql : " + ex.Message); }
                finally
                {
                    cmd.Dispose();
                    Actualiser();
                }
            }
        }

        /// <summary>
        /// Modifie un mot-clé et ses éventuelles associations
        /// </summary>
        /// <param name="sender">Bouton Modifier</param>
        /// <param name="e">Clic de la souris</param>
        private void btn_mc_modifier_Click(object sender, RoutedEventArgs e)
        {
            //On récupère tous les mots de la base excepté celui qu'on a modifié
            string mot = tbx_mot.Text.ToUpper();
            string requete = $"SELECT GROUP_CONCAT(UPPER(mot)) FROM motcle WHERE UPPER(mot) != '{mot}';";
            MySqlCommand cmd = new MySqlCommand(requete, connexion);
            MySqlDataReader reader = cmd.ExecuteReader();
            reader.Read();
            string[] mots = reader.GetString(0).Split(',');
            reader.Close();

            //On vérifie que le nouveau mot n'existe pas déjà et qu'il contienne bien des lettres
            if (mots.Contains(mot) || mot == mot.ToLower())
            { MessageBox.Show("Le mot entré existe déjà ou ne contient pas de lettres"); }
            else
            {
                //On récupère l'id du mot
                string id_mc = tbk_mc_id.Tag.ToString();
                try
                {
                    //On met à jour le mot dans la base de données
                    mot = tbx_mot.Text;
                    cmd.CommandText = $"UPDATE motcle SET mot = '{mot}' WHERE id_mc = {id_mc};";
                    cmd.ExecuteNonQuery();

                    //Pour chaque nouveau combobox, on ajoute une nouvelle association
                    foreach (StackPanel sp in sp_mc_pictos.Children)
                    {
                        ComboBox cbx = sp.Children[0] as ComboBox;
                        if (cbx.IsEnabled == true) 
                            //On vérifie que le pictogramme est bien nouveau
                            //pour ne pas ajoute de doublons
                        {
                            string id_pic = ((ComboBoxItem)cbx.SelectedItem).Tag.ToString();
                            cmd.CommandText = $"INSERT INTO picto_motcle VALUES ({id_mc},{id_pic});";
                            cmd.ExecuteNonQuery();
                        }
                    }
                }
                catch (MySqlException ex)
                { MessageBox.Show(ex.Message); }
            }
            cmd.Dispose(); Actualiser(); dg_motcle.Tag = 0;
        }

        /// <summary>
        /// Supprime le mot de la base de données
        /// </summary>
        /// <param name="sender">Bouton supprimer</param>
        /// <param name="e">Clic de la sourio</param>
        private void btn_mc_supprimer_Click(object sender, RoutedEventArgs e)
        {
            //On récupère l'id du mot-clé et on le supprime de la base
            string id = tbk_mc_id.Tag.ToString();
            string requete = $"DELETE FROM motcle WHERE id_mc = {id};";
            MySqlCommand cmd = new MySqlCommand(requete, connexion);
            cmd.ExecuteNonQuery(); cmd.Dispose();
            Actualiser();
        }
        #endregion
    }
}