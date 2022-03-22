<img src="https://www.multi-hardware.com/wp-content/uploads/2020/05/produits-Microsoft.png" alt="alt text" width="175" height="whatever" align="left">
<img src="https://www.cpamcgt06.fr/wp-content/uploads/2020/04/Unknown-1.png" alt="alt text" width="160" height="whatever" align="right">


<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Logo_ESILV.svg/2560px-Logo_ESILV.svg.png" width="220" />
</p>

<p align="center">
  <img src="https://github.com/chlotmpo/Auto_FALC/blob/main/Illustrations_README/logo.png?raw=true " width="500" />
</p>  

## Introduction

Le projet **Auto FALC** a été proposé par **Microsoft France** et l’**UCANSS** et est réalisé par une équipe composée de 5 étudiants ingénieurs en M1 “Data & IA” à l’ESILV. Il consiste à concevoir un outil permettant de générer automatiquement une illustration de texte FALC.   

Il est donc important de définir ce que signifie le terme **« FALC »**. Généralement, les personnes en situation de handicap intellectuel rencontrent des difficultés à lire des textes du fait de leur complexité, et de leur mise en forme non intuitive. Le Facile à lire et à comprendre (ou FALC) est là pour répondre à ce problème.  

Le FALC a été créé en 2009, à travers un projet européen intitulé « Pathways », il s’agit d’un ensemble de règles d’écriture de documents (qui portent à la fois sur le fond du texte, et sur sa forme), permettant aux personnes en situation de handicap intellectuel de mieux comprendre et lire des documents.    

Par ailleurs, un texte FALC est encore plus compréhensible lorsqu’il est **illustré** par des dessins, pictogrammes ou photos. Cependant, il est aujourd’hui encore trop difficile pour ses concepteurs de trouver rapidement des illustrations adaptées. ***La rédaction demeure trop contraignante. **  

L’objectif du projet consiste donc à faciliter l’illustration du FALC grâce à l’**IA**, en proposant automatiquement des pictogrammes adaptés à un texte écrit en FALC et ainsi faciliter le travail des illustrateurs.  

Afin de réaliser cette objectif, notre équipe a décidé de s’orienter vers la réalisation d’un **Add-In Word**, facile à installer, qui **analysera le texte** écrit en FALC, et proposera **automatiquement des pictogrammes**. La personne qui travaille sur la traduction d’un texte en FALC pourra alors choisir, et placer les pictogrammes qui lui conviennent et cela lui permettra de gagner un temps considérable sur la recherche des illustrations. 

---
## Sommaire

1. [Avancement/Démonstration](#Avancement)
2. [Installation](#Installation)
3. [Guide d'utilisation](#Utilisation)
4. [Crédit](#Crédit)

---

## Avancement :

- Démonstration :

https://user-images.githubusercontent.com/84092005/149626335-8022148c-84d3-434f-a8cf-b7383101c647.mp4

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
❯ pip install "librairie_name" 
```

4. **Exécuter le programme [../First Add-in/src/taskpane/pythonAPI.py]()** dans votre IDE python
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
* Insérez les images que vous souhaitez en appuyant sur **Insérer**

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
