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
        // Assign event handlers and other initialization logic.
        document.getElementById("Submit").onclick = UseTexte;
        document.getElementById("Try").onclick = Replace_by_Maj;
        document.getElementById("sideload-msg").style.display = "none";
        document.getElementById("app-body").style.display = "flex";
    }
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
        return context.sync().then(function () {
            for (let i = 0; i < paragraphs.items.length; i++) {
                paragraphs.items[i].insertText(paragraphs.items[i].text.toUpperCase(),
                    "Replace");
            }
            
        }).then(context.sync);
    });
}
