# Auto_FALC

### Projet Add-in : 
#### Le dossier First Add-in comporte l'add-in fonctionnel
c'est à dire qu'il suffit d'avoir installé node.js (et Yeoman ?) pour pouvoir lancer le projet.
donc à chaque fois que l'on souhaite le tester:
- utiliser git bash, se placer dans le "main"
- git push (pour récupérer toutes les dernières modif en ligne)
- utiliser son invite de commande
- se placer dans le dossier First Add-in
- npm start (démarre le projet)

pour modifier : ne pas oublier de créer sa branche, de faire ses commit sur sa branche, une fois fait de merge puis executer git push pour maj en ligne

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
### Le dossier Test Add-In permet de lancer un premier prototype de l'Add-In
tips : - créér un add-in en utilisant le Yeoman generator comme décrit dans le tutoriel suivant : https://docs.microsoft.com/fr-fr/office/dev/add-ins/tutorials/word-tutorial
       - remplacer les images du dossier assets par ceux du dossier Test Add-In
       - remplacer les fichiers du dossier src/taskpane/ par taskpane.css, taskpane.html et taskpane.js du dossier Test Add-In
       - lancer l'Add-In en suivant le tutoriel de Microsoft précédent ( cd pour aller dans la racine du dossier et commande npm start )
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Le fichier .py "YAKE_algo", permet de tester rapidement l'IA YAKE sur un doc .txt nommé "texte".
tips : -installer les librairies en utilisant les commandes en commentaire, dans le prompt d'anaconda
       -changer le path du fichier dans open() pour que ça marche
 
