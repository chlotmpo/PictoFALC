# -*- coding: utf-8 -*-
"""
Created on Mon Nov 22 13:07:57 2021

@author: bruno
"""
from flask import Flask, request, jsonify, after_this_request

app = Flask(__name__)


@app.route('/PYtoJS', methods=['GET'])
def hello():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    jsonResp = IAToJS()
    print(jsonResp)
    return jsonify(jsonResp)

@app.route('/JStoPY', methods=['GET', 'POST'])
def thisRoute():
    global information
    information = request.data
    print(information.decode('latin1'))
    return "nice"

def IAToJS():
    print("sélection des kw dans le txt")
    txtFALC= information.decode('latin1')
    kw=keywords_extraction(txtFALC)
    return kw

    
# pip install googletrans==3.1.0a0
# pip install googletrans==4.0.0rc1
from googletrans import Translator
# pip install keybert
from keybert import KeyBERT
# pip install git+https://github.com/LIAAD/yake
import yake

# Ouvrir le fichier texte
def open_text(filename):
    f = open(filename)
    text = f.read()
    f.close()
    return text

# Traduire le texte
def translate_text_to_en(text):
    trans = Translator()
    transText = trans.translate(text, dest = 'en')
    return transText

# Calcul du nombre de mots à extraire
def number_extract_words(text):
    nb_words = len(text.text.split(" "))
    nb_extract_words = int(nb_words/10)
    return nb_extract_words

# modèle KeyBert
# Retourne la liste des mots clés
def keybert_application(text, nb_extract_words):
    kw_model = KeyBERT()
    keywords_bert = kw_model.extract_keywords(text.text, top_n = nb_extract_words)
    return keywords_bert

# modèle Yake
def yake_application(text, nb_extract_words):
    model = yake.KeywordExtractor(lan = "en", n = 2, dedupLim = 0.9, top = nb_extract_words)
    keywords_yake = model.extract_keywords(text.text)
    return keywords_yake

# fusionne les mots clés venant de KeyBert et Yake 
# enlève les doublons
def fusion_keywords_lists(l1, l2):
    l1 = [el[0].lower() for el in l1]
    l2 = [el[0].lower() for el in l2]
    fusion_list = list(set(l1 + l2)) # pour retirer les mots en double
    return fusion_list
    
def translate_list_to_fr(list_words):
    trans2 = Translator()
    translate_list = []

    for group in list_words:
        temp = []
        for word in group:
            print("here2")
            transWord = trans2.translate(word,  dest = 'fr')
            temp.append(transWord.text)
        translate_list.append(temp)
    return translate_list


# Fonction principale
def keywords_extraction(french_text):
    
    english_text = translate_text_to_en(french_text)
    #print(english_text.text)
    nb_extract_words = number_extract_words(english_text)
    
    keybert_extracted_words = keybert_application(english_text, nb_extract_words)
    yake_extracted_words = yake_application(english_text, nb_extract_words)
    
    extracted_words = fusion_keywords_lists(keybert_extracted_words, yake_extracted_words)
    print("fin de l'IA", extracted_words)
    
    return extracted_words



if __name__ == '__main__':
    app.run(host='localhost', port=8989)
    
    
