// ####### Global variables ############################################################################

// images references for the logo of falc, in different sizes.
import "../../assets/icon-16.png";
import "../../assets/icon-32.png";
import "../../assets/icon-80.png";


let Reset = document.getElementById("Reset"); // To manage the button reset in HTML
let table = document.getElementById("Output"); // To manage the Table element in HTML

// global list of keywords that were found
// convenient because it eases the addition of new keywords, or the deletion of all elements in the list
// even if these actions are made in totally distinct functions.
let liste = {};

// ###### global document, Office, Word ######################################################################

Office.onReady((info) => {
    if (info.host === Office.HostType.Word) {
        // Determine if the user's version of Office supports all the Office.js APIs that are used in the tutorial.
        if (!Office.context.requirements.isSetSupported("WordApi", "1.3")) {
            Console.log("Sorry. The tutorial add-in uses Word.js APIs that are not available in your version of Office.");
        }

        //what to do when clicking different buttons
        document.getElementById("Start").onclick = StartProgram;
        document.getElementById("Submit").onclick = UseTexte;

        // default settings
        document.getElementById("sideload-msg").style.display = "none";
        document.getElementById("app-body").style.display = "flex";
    }
});


// ###### Main Methods ######################################################################################################

// When Reset clicked, the html table is set to its original form
// We unhighlight all keywords of the list
// The list of keywords stored is set to empty
Reset.addEventListener("click", () => {
    /*table.innerHTML = `<tr><th>Liste de mots clés :</th></tr>
                        <tr><td> </td></tr>`;*/
    table.innerHTML = ` <nav class="accordion arrows" id="Output">
                <h1 class="box">
                    <label for="acc-close" class="box-title">Keywords : </label>
                </h1>
                <input type="radio" name="accordion" id="acc-close" />
            </nav>`
    UnHighlight_All_Key_Word(liste);
    liste = {};

});

/*** 
 * It allows the user to search for one specific keyword of his choice.
 * If the word is not in the list yet, it is added to it
 * And we look for a picture corresponding to add it in the HTML table 
 * */
function UseTexte() {
    // Getting the string typed by the user
    const wordFALC = document.getElementById("txtFalc").value.toString();
    if ((wordFALC in liste) == false) {
        JStoPY(wordFALC);
        sleep2(100).then(() => {
            PYtoJS();
        })
    } else {
        console.log
    }    
}

/***
 * The main function of the add-in. It uses the text selected by the user.
 * It makes a request to the API, gets back a list of keyword.
 * Then it tries to find related pictures and add them to the HTML table
 * */
function StartProgram() {
    Word.run(function (context) {
        var paragraphs = context.document.getSelection().paragraphs;
        paragraphs.load();
        let value = "";
        return context
            .sync()
            .then(function () {

                // Converting the "Words" paragraphs to one unique string
                for (let i = 0; i < paragraphs.items.length; i++) {
                    value += paragraphs.items[i].text;
                }
                if (value != "" && value != null) {
                    var elements = document.querySelectorAll('.waitingAPI');
                    show(elements,"flex");
                    JStoPY(value);
                    sleep2(100).then(() => {
                        PYtoJS();
                    });
                }
            })
            .then(context.sync);
    });
}

/***
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 * */
function InsertImageHtml(src) {
    var imgHTML = "<img " + "    src='" + src + "'" + " width=50 height=50" + " alt ='apps for Office image1' />       ";
    Office.context.document.setSelectedDataAsync(imgHTML, { coercionType: "html" }, function (asyncResult) {
        if (asyncResult.status == "failed") {
            write("Error: " + asyncResult.error.message);
        }
    });
}

// ###### Highlight Methods ################################################################################################################

// fonction pour test surligner
/***
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 * */
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

// fonction pour surligner un mot clé mis dans l'appel de la fonction
/***
 * General function that will highlight a word given in the text, with a special color
 * Can be used for coloring in yellow or, coloring in white (unhighlight)
 * @param  {string} kw [a word to highlight]
 * @param  {string} colors [the hexa code of a color, to use it for highlight]
 * @return {sync}      [synchronisation of the doc and the add-in]
 * */
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

/***
 * fonction pour surligner tous les mots clés d'une liste dans un document word
 * @param  {string[]} liste [the global variable "Liste"]
 * */
function Highlight_All_Key_Word(liste) {
    // Liste des mots clés renvoyée par l'IA
    
    const IA_Key_Word = Object.keys(liste);
    for (let index = 0; index < IA_Key_Word.length; index++) {
        Highlight_Key_Word(IA_Key_Word[index], "#FFFF00");
    }
}

/***
 * fonction pour désurligner tous les mots clés d'une liste dans un document word
 * @param  {string} liste [the global variable "Liste"]
 * */
function UnHighlight_All_Key_Word(liste) {
    // Liste des mots clés renvoyée par l'IA
    const IA_Key_Word = Object.keys(liste);
    for (let index = 0; index < IA_Key_Word.length; index++) {
        Highlight_Key_Word(IA_Key_Word[index], "#FFFFFF");
    }
}

// ###### API calls methods ############################################################################

/***
 * First method to use to interact with API
 * It will send the text we want to analyse to the API
 * And the API will work on it
 * @param  {string} texte [the text to analyse]
 * */
function JStoPY(texte) {
    const url = 'http://localhost:8989/JStoPY'
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('post', url);
        req.send(JSON.stringify(texte))
    })
}

/***
 * The second method to call to use the API
 * it will update the liste global var
 * and create required elements in HTML table
 * */
function PYtoJS() {
    let url = "http://localhost:8989/PYtoJS";
    return new Promise(function (resolve, reject) {
        fetch(url).then(response =>
            response.json().then(data => ({
                data: data,
            })            
            ).then(response => {
                for(const [key,value] of Object.entries(response.data))
                {
                    if ((key in liste) == false) {
                        liste[key] = value;
                    }
                }
                if (liste != null) { //checking if there was something selected by the user
                    Highlight_All_Key_Word(liste);
                    hide(document.querySelectorAll('.waitingAPI'));
                    // Updating the HTML table     
                    
                    table.innerHTML = ` <nav class="accordion arrows" id="Output">
                                            <h1 class="box">
                                                <label for="acc-close" class="box-title">Keywords : </label>
                                            </h1>
                                            <input type="radio" name="accordion" id="acc-close" />
                                        </nav>`

                    for (const [key, value] of Object.entries(liste)) {
                        for (let i = 0; i < value.length && i < 3; i++) {
                            // creation of the picture element
                            var DOM_img = document.createElement("img");
                            DOM_img.src = value[i];
                            DOM_img.alt = "No image were found...";
                            DOM_img.style.width = "50px";
                            DOM_img.style.height = "50px";
                            let button = document.createElement("button");
                            button.innerHTML = "Insert";
                            button.className = "bouton2";
                            button.onclick = function () {
                                InsertImageHtml(value[i]);
                            };                            
                            // Insertion of the picture element in the HTML table
                            let output = document.getElementById("Output");

                            let input = document.createElement("input");
                            input.type = "radio";
                            input.name = "accordion";
                            input.id = "cb" + key + i;

                            let div = document.createElement("div");
                            div.className = "box-content";

                            let div2 = document.createElement("div");
                            div2.appendChild(DOM_img);
                            div2.appendChild(button);

                            div.appendChild(div2)

                            let label = document.createElement("label");
                            label.className = "box-title";
                            label.htmlFor = input.id;
                            label.innerHTML = key;

                            let label2 = document.createElement("label");
                            label2.className = "box-close";
                            label2.htmlFor = "acc-close";

                            if (document.querySelector("[id=" + CSS.escape(key) + "]") == null) {
                                let newSection = document.createElement("section");
                                newSection.className = "box";
                                newSection.id = key
                                newSection.appendChild(label);
                                newSection.appendChild(label2);
                                newSection.appendChild(div);                                

                                output.appendChild(input);
                                output.appendChild(newSection);                                
                            } else {
                                let section = document.querySelector("[id=" + CSS.escape(key) + "]")
                                section.appendChild(div);
                            }
                        }
                    }                    
                }
            }));
    })
}

/***
 * wait x milliseconds before going next step
 * @param  {number} time [the number of millisec to wait]
 * @return {promise}      [return the promise related]
 * */
function sleep2(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

/*########## styling elements ################################################################"*/

function hide(elements) {
    elements = elements.length ? elements : [elements];
    for (var index = 0; index < elements.length; index++) {
        elements[index].style.display = 'none';
    }
}

function show(elements, specifiedDisplay) {
    elements = elements.length ? elements : [elements];
    for (var index = 0; index < elements.length; index++) {
        elements[index].style.display = specifiedDisplay || 'block';
    }
}
