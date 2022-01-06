
DROP DATABASE IF EXISTS Falc; 
CREATE DATABASE IF NOT EXISTS Falc; 
USE Falc;
--
DROP TABLE IF EXISTS motcle;
CREATE TABLE IF NOT EXISTS motcle (
	id_mc	SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	mot     VARCHAR(32) UNIQUE CHECK(mot NOT LIKE '%,%' OR mot NOT LIKE '%\%'));
--
DROP TABLE IF EXISTS picto;
CREATE TABLE IF NOT EXISTS picto (
	id_pic	SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	url     VARCHAR(1000));
--
DROP TABLE IF EXISTS picto_motcle;
CREATE TABLE IF NOT EXISTS picto_motcle (
	id_mc   SMALLINT UNSIGNED NOT NULL,
			FOREIGN KEY (id_mc) REFERENCES motcle(id_mc)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
	id_pic  SMALLINT UNSIGNED NOT NULL,
			FOREIGN KEY (id_pic) REFERENCES picto(id_pic)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
	PRIMARY KEY (id_pic,id_mc));
    
INSERT INTO motcle (mot) VALUES ('Diplôme'), ('Document Officiel'), ('Enfant'), ('Etudes'), ('Examen'); 
INSERT INTO motcle (mot) VALUES ('Test'), ('Ecole'), ('Bac'), ('Terminale'), ('Lycée'); 
INSERT INTO motcle (mot) VALUES ('BTS'), ('Classe préparatoire'), ('Concours'), ('Grandes écoles'), ('Banque'); 
INSERT INTO motcle (mot) VALUES ('Argent'), ('Chez moi'), ('Mode d’emploi'), ('Compte bancaire'), ('Demander de l’aide'); 
INSERT INTO motcle (mot) VALUES ('Conseiller'), ('Tuteur'), ('Curateur'), ('Ouvrir un compte'), ('Carte d’identité'); 
INSERT INTO motcle (mot) VALUES ('Justificatif de domicile'), ('Adresse'), ('Facture'), ('Protection juridique'), ('Juge'); 
INSERT INTO motcle (mot) VALUES ('Aider'), ('Maladie'), ('Cerveau'), ('Crise d’épilepsie'), ('Danger'); 
INSERT INTO motcle (mot) VALUES ('Prévient'), ('Seul'), ('Répond plus'), ('Tomber'), ('Tremblements'); 
INSERT INTO motcle (mot) VALUES ('Secousses'), ('Enlever'), ('Appeler'), ('Allonger'), ('Fatigué'); 
INSERT INTO motcle (mot) VALUES ('Se repose'), ('Foot'), ('Cinéma'), ('Amis'), ('Courses'), ('Cuisine');

INSERT INTO picto(url) VALUES ('00001.png');
INSERT INTO picto(url) VALUES ('00002.png');
INSERT INTO picto(url) VALUES ('00003.png');
INSERT INTO picto(url) VALUES ('00004.png');
INSERT INTO picto(url) VALUES ('00005.png');
INSERT INTO picto(url) VALUES ('00006.png');
INSERT INTO picto(url) VALUES ('00007.png');
INSERT INTO picto(url) VALUES ('00008.png');
INSERT INTO picto(url) VALUES ('00009.png');
INSERT INTO picto(url) VALUES ('00010.png');
INSERT INTO picto(url) VALUES ('00011.png');
INSERT INTO picto(url) VALUES ('00012.png');
INSERT INTO picto(url) VALUES ('00013.png');
INSERT INTO picto(url) VALUES ('00014.png');
INSERT INTO picto(url) VALUES ('00015.png');
INSERT INTO picto(url) VALUES ('00016.png');
INSERT INTO picto(url) VALUES ('00017.png');
INSERT INTO picto(url) VALUES ('00018.png');
INSERT INTO picto(url) VALUES ('00019.png');
INSERT INTO picto(url) VALUES ('00020.png');
INSERT INTO picto(url) VALUES ('00021.png');
INSERT INTO picto(url) VALUES ('00022.png');
INSERT INTO picto(url) VALUES ('00023.png');
INSERT INTO picto(url) VALUES ('00024.png');
INSERT INTO picto(url) VALUES ('00025.png');
INSERT INTO picto(url) VALUES ('00026.png');
INSERT INTO picto(url) VALUES ('00027.png');
INSERT INTO picto(url) VALUES ('00028.png');
INSERT INTO picto(url) VALUES ('00029.png');
INSERT INTO picto(url) VALUES ('00030.png');
INSERT INTO picto(url) VALUES ('00031.png');
INSERT INTO picto(url) VALUES ('00032.png');
INSERT INTO picto(url) VALUES ('00033.png');
INSERT INTO picto(url) VALUES ('00034.png');
INSERT INTO picto(url) VALUES ('00035.png');
INSERT INTO picto(url) VALUES ('00036.png');
INSERT INTO picto(url) VALUES ('00037.png');
INSERT INTO picto(url) VALUES ('00038.png');
INSERT INTO picto(url) VALUES ('00039.png');
INSERT INTO picto(url) VALUES ('00040.png');
INSERT INTO picto(url) VALUES ('00041.png');
INSERT INTO picto(url) VALUES ('00042.png');
INSERT INTO picto(url) VALUES ('00043.png');
INSERT INTO picto(url) VALUES ('00044.png');
INSERT INTO picto(url) VALUES ('00045.png');
INSERT INTO picto(url) VALUES ('00046.png');
INSERT INTO picto(url) VALUES ('00047.png');
INSERT INTO picto(url) VALUES ('00048.png');
INSERT INTO picto(url) VALUES ('00049.png');
INSERT INTO picto(url) VALUES ('00050.png');
INSERT INTO picto(url) VALUES ('00051.png');
INSERT INTO picto(url) VALUES ('00052.png');
INSERT INTO picto(url) VALUES ('00053.png');
INSERT INTO picto(url) VALUES ('00054.png');
INSERT INTO picto(url) VALUES ('00055.png');
INSERT INTO picto(url) VALUES ('00056.png');
INSERT INTO picto(url) VALUES ('00057.png');
INSERT INTO picto(url) VALUES ('00058.png');
INSERT INTO picto(url) VALUES ('00059.png');
INSERT INTO picto(url) VALUES ('00060.png');
INSERT INTO picto(url) VALUES ('00061.png');
INSERT INTO picto(url) VALUES ('00062.png');
INSERT INTO picto(url) VALUES ('00063.png');
INSERT INTO picto(url) VALUES ('00064.png');
INSERT INTO picto(url) VALUES ('00065.png');
INSERT INTO picto(url) VALUES ('00066.png');
INSERT INTO picto(url) VALUES ('00067.png');
INSERT INTO picto(url) VALUES ('00068.png');
INSERT INTO picto(url) VALUES ('00069.png');
INSERT INTO picto(url) VALUES ('00070.png');
INSERT INTO picto(url) VALUES ('00071.png');
INSERT INTO picto(url) VALUES ('00072.png');
INSERT INTO picto(url) VALUES ('00073.png');
INSERT INTO picto(url) VALUES ('00074.png');
INSERT INTO picto(url) VALUES ('00075.png');
INSERT INTO picto(url) VALUES ('00076.png');
INSERT INTO picto(url) VALUES ('00077.png');
INSERT INTO picto(url) VALUES ('00078.png');
INSERT INTO picto(url) VALUES ('00079.png');
INSERT INTO picto(url) VALUES ('00080.png');
INSERT INTO picto(url) VALUES ('00081.png');
INSERT INTO picto(url) VALUES ('00082.png');
INSERT INTO picto(url) VALUES ('00083.png');
INSERT INTO picto(url) VALUES ('00084.png');
INSERT INTO picto(url) VALUES ('00085.png');
INSERT INTO picto(url) VALUES ('00086.png');
INSERT INTO picto(url) VALUES ('00087.png');
INSERT INTO picto(url) VALUES ('00088.png');
INSERT INTO picto(url) VALUES ('00089.png');
INSERT INTO picto(url) VALUES ('00090.png');
INSERT INTO picto(url) VALUES ('00091.png');
INSERT INTO picto(url) VALUES ('00092.png');
INSERT INTO picto(url) VALUES ('00093.png');
INSERT INTO picto(url) VALUES ('00094.png');
INSERT INTO picto(url) VALUES ('00095.png');
INSERT INTO picto(url) VALUES ('00096.png');
INSERT INTO picto(url) VALUES ('00097.png');
INSERT INTO picto(url) VALUES ('00098.png');
INSERT INTO picto(url) VALUES ('00099.png');
INSERT INTO picto(url) VALUES ('00100.png');
INSERT INTO picto(url) VALUES ('00101.png');
INSERT INTO picto(url) VALUES ('00102.png');
INSERT INTO picto(url) VALUES ('00103.png');
INSERT INTO picto(url) VALUES ('00104.png');



INSERT INTO picto_motcle VALUES (1,23);
INSERT INTO picto_motcle VALUES (1,47);
INSERT INTO picto_motcle VALUES (1,61);
INSERT INTO picto_motcle VALUES (1,86);
INSERT INTO picto_motcle VALUES (2,94);
INSERT INTO picto_motcle VALUES (2,66);
INSERT INTO picto_motcle VALUES (2,65);
INSERT INTO picto_motcle VALUES (2,50);
INSERT INTO picto_motcle VALUES (2,47);
INSERT INTO picto_motcle VALUES (2,36);
INSERT INTO picto_motcle VALUES (2,18);
INSERT INTO picto_motcle VALUES (3,38);
INSERT INTO picto_motcle VALUES (3,39);
INSERT INTO picto_motcle VALUES (3,40);
INSERT INTO picto_motcle VALUES (4,15);
INSERT INTO picto_motcle VALUES (4,16);
INSERT INTO picto_motcle VALUES (4,23);
INSERT INTO picto_motcle VALUES (4,51);
INSERT INTO picto_motcle VALUES (4,53);
INSERT INTO picto_motcle VALUES (4,61);
INSERT INTO picto_motcle VALUES (4,64);
INSERT INTO picto_motcle VALUES (4,83);
INSERT INTO picto_motcle VALUES (4,86);
INSERT INTO picto_motcle VALUES (5,14);
INSERT INTO picto_motcle VALUES (6,14);
INSERT INTO picto_motcle VALUES (7,15);
INSERT INTO picto_motcle VALUES (7,16);
INSERT INTO picto_motcle VALUES (7,51);
INSERT INTO picto_motcle VALUES (7,64);
INSERT INTO picto_motcle VALUES (7,83);