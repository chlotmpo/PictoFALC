<img src="https://www.multi-hardware.com/wp-content/uploads/2020/05/produits-Microsoft.png" alt="alt text" width="175" height="whatever" align="left">
<img src="https://www.cpamcgt06.fr/wp-content/uploads/2020/04/Unknown-1.png" alt="alt text" width="160" height="whatever" align="right">


<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Logo_ESILV.svg/2560px-Logo_ESILV.svg.png" width="220" />
</p>

<p align="center">
  <img src="https://github.com/chlotmpo/Auto_FALC/blob/main/Illustrations_README/logo.png?raw=true " width="500" />
</p>  

## Introduction

Microsoft France et l’UCANSS souhaitent disposer d’un outil permettant de générer facilement des documents imagés en utilisant la méthode FALC (Facile A Lire et à Comprendre) et afin d’en faciliter la lecture pour des personnes analphabètes ou avec des troubles mentaux. La méthode FALC a été développé par l’association UNAPEI et représente un ensemble de règles ayant pour but de rendre un langage classique en langage compréhensible par tous. 

Ce projet proposé par Microsoft France a été réalisé par 5 étudiants ingénieurs en M1 « Data et Intelligence Artificielle » à l’ESILV (Ecole Supérieure d’Ingénieurs Léonard de Vinci), pour une durée de 6 mois d’octobre 2021 à mars 2022. Ces 5 étudiants sont Nicolas CARVAL, Bruno PINCET, Laurine SALLE, Louis TEMPE et Chloé TEMPO. 

L’idée est de s’appuyer sur de l’IA pour analyser une phrase, en isoler les mots clés et à utiliser une bibliothèque de pictogramme pour proposer au rédacteur un outil simple et ergonomique pour illustrer des documents FALC. Un texte FALC est encore plus compréhensible lorsqu’il est illustré par des dessins, pictogrammes ou photos. Cependant, il est aujourd’hui encore trop difficile pour ses concepteurs de trouver rapidement des illustrations adaptées. 

PictoFALC consiste donc à faciliter l’illustration du FALC grâce à une IA codée en python, en utilisant des puissants algorithmes tels que BERT et YAKE, et propose automatiquement des pictogrammes adaptés à un texte écrit en FALC, pour faciliter le travail des utilisateurs.  Un add-in codé en JavaScript intégré directement à Word a été créé et permet d’analyser le texte écrit en FALC, récupère tous les mots clés et propose des pictogrammes correspondants pour illustrer. La personne qui travaille sur la traduction d’un texte FALC peut alors choisir et placer les pictogrammes qui lui conviennent directement dans le document. C’est un gain de temps et une aide considérable sur la recherche d’illustrations. 

Pour le futur, PictoFALC a vocation d’être repris par les équipes de Microsoft pour être encore plus complété et être mis en production sur l’application Microsoft Word. L’objectif final est donc de déployer au maximum cette solution pour apporter de l’aide à tous les rédacteurs de documents FALC et leur permettre d’illustrer n’importe quelle phrase et mots-clés de leurs documents. 
Un grand merci à Microsoft France, et à Philippe TROTIN pour son accompagnement tout au long du projet, à l’UNCASS, et à l’ESILV et Béréngère BRANCHET pour l’encadrement de ce projet annuel. 

---
## Sommaire

1. [Avancement/Démonstration](#Avancement)
2. [Installation](#Installation)
3. [Guide d'utilisation](#Utilisation)
4. [Crédit](#Crédit)

---

## Avancement :

- Démonstration :

https://youtu.be/L_98X2fv_iY
https://github.com/chlotmpo/PictoFALC/blob/e46d9245e99baba118d8a448bc2072c992f3ad25/Videos/Demo_PictoFALC.mp4

- Schéma Structurel :
<a href="url"><img src="https://github.com/chlotmpo/Auto_FALC/blob/main/Illustrations_README/structure.png?raw=true" align="center" width=100% height=100% ></a>
[Back To The Top](#Sommaire)

---
## Installation

1. Créer **un compte Github**.

2. **Cloner le repository** `https://github.com/chlotmpo/Auto_FALC`

3. Installer **un python IDE** si vous n'en possédez pas déjà un.

4. Assurez-vous d'avoir **les librairies python** suivantes d'installées pour que l'IA fonctionne.
* pyodbc
* yake
* KeyBERT
* flask
* thefuzz

Sinon exécutez les commandes suivantes ( sur Anaconda IDE par exemple)
```sh
❯ pip install "librairie" 
```

4. **Exécuter le programme [../First Add-in/src/taskpane/pythonAPI.py](https://github.com/chlotmpo/Auto_FALC/blob/main/First%20Add-in/src/taskpane/pythonAPI.py)** dans votre IDE python
```sh
#Le message suivant doit apparaître
❯ Running on http://localhost:8989/ (Press CTRL+C to quit)
```
5. Installer [NodeJS](https://nodejs.org/en/)

6. Ouvrir l'invite de commande et exécuter le code suivant

```sh
❯ cd Auto_FALC/First Add-in/
> npm start
```
Vous devriez voir les informations suivantes :
<p align="center">
  <img src="https://github.com/chlotmpo/Auto_FALC/blob/main/Illustrations_README/lancement.PNG?raw=true" width="500" />
</p>

7. Une page Word va s'ouvrir automatiquement, l'Add-In est prêt à être utiliser

[Back To The Top](#Sommaire)

---
## Utilisation
* Ecrivez votre texte dans la page d'édition
* Sélectionnez à l'aide de votre curseur le texte à illustrer
* Appuyez sur le bouton **Start**
* Patientez quelques instant jusqu'à l'apparition de mots clés dans l'emplacement **Keywords:**
* Insérez les images que vous souhaitez en appuyant sur **Insert**

<p align="center">
  <img src="https://github.com/chlotmpo/Auto_FALC/blob/main/Illustrations_README/Insert.png?raw=true" width="300" />
</p>

[Back To The Top](#Sommaire)

---
## Crédit
- Carval Nicolas - [@NicolasCarval](https://github.com/NicolasCarval)
- Pincet Bruno - [@GitBrunoCode](https://github.com/GitBrunoCode)
- Tempo Chloé - [@chlotmpo](https://github.com/chlotmpo)
- Salle Laurine - [@912-SALLE-Laurine](https://github.com/912-SALLE-Laurine)
- Tempe Louis - [@ltempe](https://github.com/ltempe)



[Back To The Top](#Sommaire)
