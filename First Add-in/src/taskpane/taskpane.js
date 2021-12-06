


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
            Console.log("Sorry. The tutorial add-in uses Word.js APIs that are not available in your version of Office.");
        }
        document.getElementById("Start").onclick = StartProgram;

        document.getElementById("Submit").onclick = UseTexte;
        document.getElementById("Fetch").onclick = PYtoJS;
        document.getElementById("Sub").onclick = JStoPY("hola");

        document.getElementById("sideload-msg").style.display = "none";
        document.getElementById("app-body").style.display = "flex";
    }
});

//let KeyWord = document.getElementById("Key");
let Reset = document.getElementById("Reset");
let table = document.getElementById("Output");

let liste = [];
let images = {
    mange: "https://www.sclera.be/resources/pictos/administratie.png",
    bois: "https://www.sclera.be/resources/pictos/agenda.png",
    repas: "https://www.sclera.be/resources/pictos/tandenborstel.png",
};

Reset.addEventListener("click", () => {
    table.innerHTML = `<tr><th>Liste de mots clés :</th></tr>
                        <tr><td>...</td></tr>`;
    UnHighlight_All_Key_Word(liste);
    liste = [];
});


function UseTexte() {

    const wordFALC = document.getElementById("txtFalc").value.toString();
    if (liste.includes(wordFALC) == false) {
        liste.push(wordFALC);
        Highlight_Key_Word(wordFALC, "#FFFF00");
        let img = RechercheImg([wordFALC]);

        var DOM_img = document.createElement("img");
        DOM_img.src = img[0];
        DOM_img.style.width = "75px";
        DOM_img.style.height = "75px";
        let button = document.createElement("button");
        button.innerHTML = "insert";
        button.className = "bouton2";
        button.onclick = function () {
            InsertImageHtml(img[0]);
        };
        let output = document.getElementById("Output");
        output.insertAdjacentHTML("beforeend", liste[liste.length - 1]);
        //
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const td2 = document.createElement("td");
        td.appendChild(DOM_img);
        td2.appendChild(button);
        tr.appendChild(td);
        tr.appendChild(td2);

        output.appendChild(tr);
    }
}

function StartProgram() {
    Word.run(function (context) {
        var paragraphs = context.document.getSelection().paragraphs;
        paragraphs.load();
        let value = "";
        return context
            .sync()
            .then(function () {
                for (let i = 0; i < paragraphs.items.length; i++) {
                    value += paragraphs.items[i].text;
                }
                /*
                let a = RechercheMots(value);
                if (liste == null) {
                    liste = a;
                } else {
                    liste = liste.concat(a);
                }
                liste = [...new Set(liste)];
                */
                JStoPY(value);
                liste = PYtoJS();
                if (value != "") {
                    // ancien code en fin de fichier
                    Highlight_All_Key_Word(liste);
                    let img = RechercheImg(liste);
                    table.innerHTML = `<tr><th>Liste de mots clés :</th></tr>`;
                    for (let i = 0; i < liste.length; i++) {
                        var DOM_img = document.createElement("img");
                        DOM_img.src = img[i];
                        DOM_img.alt = "No image were found...";
                        DOM_img.style.width = "75px";
                        DOM_img.style.height = "75px";
                        let button = document.createElement("button");
                        button.innerHTML = "Insert";
                        button.className = "bouton2";
                        button.onclick = function () {
                            InsertImageHtml(img[i]);
                        };
                        let output = document.getElementById("Output");
                        output.insertAdjacentHTML("beforeend", liste[i]);
                        const tr = document.createElement("tr");
                        const td = document.createElement("td");
                        const td2 = document.createElement("td");
                        td.appendChild(DOM_img);
                        td2.appendChild(button);
                        tr.appendChild(td);
                        tr.appendChild(td2);

                        output.appendChild(tr);
                    }
                }
            })
            .then(context.sync);
    });
}

function RechercheMots(value) {
    let comparaison = ["mange", "bois", "repas", "test"];
    let temp = [];
    for (let i = 0; i < comparaison.length; i++) {
        if (value.includes(comparaison[i])) {
            temp.push(comparaison[i]);
        }
    }
    return temp;
}
function RechercheImg(value) {
    let img = [];
    for (let i = 0; i < value.length; i++) {
        if (value[i] in images) {
            img.push(images[value[i]]);
        } else {
            img.push("https://pleinjour.fr/wp-content/plugins/lightbox/images/No-image-found.jpg");
        }
    }
    return img;
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
                matchWholeWord: false,
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
function Highlight_All_Key_Word(liste) {
    // Liste des mots clés renvoyée par l'IA
    //const IA_Key_Word = AlgoIA();
    const IA_Key_Word = liste;
    for (let index = 0; index < IA_Key_Word.length; index++) {
        Highlight_Key_Word(IA_Key_Word[index], "#FFFF00");
    }
}

// fonction pour désurligner tous les mots clés d'une liste dans un document word
function UnHighlight_All_Key_Word(liste) {
    // Liste des mots clés renvoyée par l'IA
    //const IA_Key_Word = AlgoIA();
    const IA_Key_Word = liste;
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
        img.alt = "unable to access img";
        img.width = 100;
        img.height = 100;
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
    var imgHTML = "<img " + "    src='" + src + "'" + " width=50 height=50" + " alt ='apps for Office image1' />       ";
    Office.context.document.setSelectedDataAsync(imgHTML, { coercionType: "html" }, function (asyncResult) {
        if (asyncResult.status == "failed") {
            write("Error: " + asyncResult.error.message);
        }
    });
}

function PYtoJS() {
    let url = "http://localhost:8989/PYtoJS";
    return new Promise(function (resolve, reject) {
        fetch(url).then(response =>
            response.json().then(data => ({
                data: data,
            })
            ).then(response => {
                document.getElementById("Fetch").innerHTML = response.data
            }));
    })
}

function JStoPY(text) {
    const url = 'http://localhost:8989/JStoPY'
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('post', url);
        req.send(JSON.stringify(text))
    })
}