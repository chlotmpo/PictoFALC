/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// images references in the manifest
import "../../assets/icon-16.png";
import "../../assets/icon-32.png";
import "../../assets/icon-80.png";

/* global document, Office, Word */

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    // Determine if the user's version of Office supports all the Office.js APIs that are used in the tutorial.
    if (!Office.context.requirements.isSetSupported("WordApi", "1.3")) {
      Console.log("Sorry. The tutorial add-in uses Word.js APIs that are not available in your version of Office."); //c
    }
    
    document.getElementById("Try").onclick = Replace_by_Maj;
    document.getElementById("Highlight").onclick = Highlight;
    document.getElementById("HighlightKW").onclick = Highlight_All_Key_Word;
    document.getElementById("UnHighlightKW").onclick = UnHighlight_All_Key_Word;
    document.getElementById("DispIm").onclick = displayImageButton;

    document.getElementById("sideload-msg").style.display = "none";
      document.getElementById("app-body").style.display = "flex";
      
  }
});

let KeyWord = document.getElementById("Key");
let ResetKeyWord = document.getElementById("ResetKeyWord");
let table = document.getElementById("Output");
KeyWord.addEventListener("click", () => {

    let liste = ["Manger", "Boire", "Repas"];
    table.innerHTML = `<tr><th>Liste de mots clés :</th></tr>`
    for (let i = 0; i < liste.length; i++) {
        let template = `
        <tr>
            <td>${liste[i]}</td>
        </tr>`;
        table.innerHTML += template;
    }

});
ResetKeyWord.addEventListener("click", () => {
    table.innerHTML = `<tr><th>Liste de mots clés :</th></tr>
                        <tr><td>...</td></tr>`;
});

function UseTexte() {
  Word.run(function (context) {
    var docBody = context.document.body;
    const wordFALC = document.getElementById("txtFalc").value.toString();
    docBody.insertParagraph(wordFALC.replaceAll("\n", " ") + " => Transfert vers l'IA", "Start");
    return context.sync();
  }).catch(function (error) {
    console.log("Error: " + error);
    if (error instanceof OfficeExtension.Error) {
      console.log("Debug info: " + JSON.stringify(error.debugInfo));
    }
  });
}

function Replace_by_Maj() {
  Word.run(function (context) {
    var paragraphs = context.document.getSelection().paragraphs;
    paragraphs.load();
    return context
      .sync()
      .then(function () {
        for (let i = 0; i < paragraphs.items.length; i++) {
          paragraphs.items[i].insertText(paragraphs.items[i].text.toUpperCase(), "Replace");
        }
      })
      .then(context.sync);
  });
}

// fonction pour test surligner
function Highlight() {
  Word.run(function (context) {
    var paragraphs = context.document.getSelection().paragraphs;
    paragraphs.load();
    return context
      .sync()
      .then(function () {
        for (let i = 0; i < paragraphs.items.length; i++) {
          paragraphs.items[i].font.set({ highlightColor: "#FFFF00" });
        }
      })
      .then(context.sync);
  });
}

// fonction temporaire pour simuler que le renvoie d'une lite de mots clé par l'IA
function AlgoIA() {
  return ["test", "deux", "ordinateur"];
}

// fonction pour surligner un mot clé mis dans l'appel de la fonction
function Highlight_Key_Word(kw, colors) {
  const IA_Key_Word = kw;
  Word.run(function (context) {
    context.load(context.document.body, "text");
    return context.sync().then(function () {
      var searchResults = context.document.body.search(IA_Key_Word, {
        ignorePunct: true,
        matchCase: false,
        matchWholeWord: true,
      });

      context.load(searchResults, "font");

      return context.sync().then(function () {
        for (var i = 0; i < searchResults.items.length; i++) {
          searchResults.items[i].font.highlightColor = colors;
        }

        return context.sync();
      });
    });
  }).catch(function (error) {
    console.log("Error: " + JSON.stringify(error));
    if (error instanceof OfficeExtension.Error) {
      console.log("Debug info: " + JSON.stringify(error.debugInfo));
    }
  });
}

// fonction pour surligner tous les mots clés d'une liste dans un document word
function Highlight_All_Key_Word() {
  // Liste des mots clés renvoyée par l'IA
  const IA_Key_Word = AlgoIA();
  for (let index = 0; index < IA_Key_Word.length; index++) {
    Highlight_Key_Word(IA_Key_Word[index], "#FFFF00");
  }
}

// fonction pour désurligner tous les mots clés d'une liste dans un document word
function UnHighlight_All_Key_Word() {
  // Liste des mots clés renvoyée par l'IA
  const IA_Key_Word = AlgoIA();
  for (let index = 0; index < IA_Key_Word.length; index++) {
    Highlight_Key_Word(IA_Key_Word[index], "#FFFFFF");
  }
}

// function pour ajouter une image dans l'add-in partir d'un url

function LienIA() {
  return [
    "https://www.sclera.be/resources/pictos/administratie.png",
    "https://www.sclera.be/resources/pictos/agenda.png",
    "https://www.sclera.be/resources/pictos/tandenborstel.png",
    "https://www.sclera.be/resources/pictos/lepel.png",
  ];
}

// fonction pour afficher des images à partir d'une liste de lien avec le bouton pour les insérer
function displayImageButton() {
  const lien = LienIA();
  for (let index = 0; index < lien.length; index++) {
    var img = document.createElement("img");
    img.src = lien[index];
    var src = document.getElementById("zone_image");

    let btn2 = document.createElement("button");
    btn2.innerHTML = "Insérer";
    btn2.className = "bouton2";
    btn2.onclick = function () {
      InsertImageHtml(lien[index]);
    };
    src.appendChild(img);
    src.appendChild(btn2);
  }
}

function InsertImageHtml(src) {
  var imgHTML = "<img " + "    src='" + src + "'" + " alt ='apps for Office image1' />       ";
  Office.context.document.setSelectedDataAsync(imgHTML, { coercionType: "html" }, function (asyncResult) {
    if (asyncResult.status == "failed") {
      write("Error: " + asyncResult.error.message);
    }
  });
}
