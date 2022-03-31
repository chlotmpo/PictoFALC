# -*- coding: utf-8 -*-
"""
Created on Mon Nov 22 13:07:57 2021

@author: bruno
"""

import pyodbc
import yake
from keybert import KeyBERT
from googletrans import Translator
from flask import Flask, request, jsonify, after_this_request
from thefuzz import fuzz

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
    #print(information.decode())
    return "nice"


def IAToJS():
    print("sélection des kw dans le txt")

    txtFALC = information.decode().replace('\\u000b', '')
    if len(txtFALC.split()) == 1:
        txtFALC=txtFALC[1:-1]
        kwdict = Query_DB([txtFALC])
    else:
        kw = keywords_extraction(txtFALC)
        kwdict = Query_DB(kw)
    return kwdict


# pip install googletrans==3.1.0a0
# pip install googletrans==4.0.0rc1
# pip install keybert
# pip install git+https://github.com/LIAAD/yake


# Ouvrir le fichier texte
def open_text(filename):
    f = open(filename)
    text = f.read()
    f.close()
    return text

# Traduire le texte


# Azure translator
import requests, uuid, json
# Add your subscription key and endpoint
subscription_key = "xxxxxxxxx"
endpoint = "https://api.cognitive.microsofttranslator.com"
# Add your location, also known as region. The default is global.
# This is required if using a Cognitive Services resource.
location = "xxxxxxx"
path = '/translate'
constructed_url = endpoint + path
headers = {
    'Ocp-Apim-Subscription-Key': subscription_key,
    'Ocp-Apim-Subscription-Region': location,
    'Content-type': 'application/json',
    'X-ClientTraceId': str(uuid.uuid4())
}




# Traduire le texte


def translate_text_to_en(text):
    trans = Translator()
    transText = trans.translate(text, dest='en')
    return transText

def translate_text_to_en_azure(text):
    params = {
    'api-version': '3.0',
    'from': 'fr',
    'to': 'en'}
    # You can pass more than one object in body.
    body = [{
        'text': text
    }]
    request = requests.post(constructed_url, params=params, headers=headers, json=body)
    response = request.json()
    print(response)
    transText = json.dumps(response[0]["translations"][0]["text"], 
                           sort_keys=True, ensure_ascii=False, indent=4, 
                           separators=(',', ': '))
    return transText

# Calcul du nombre de mots à extraire


def number_extract_words(text):
    #nb_words = len(text.text.split(" "))
    nb_words = len(text.split(" "))
    nb_extract_words = int(nb_words/10)+1
    if (nb_extract_words >= 15):
        nb_extract_words = 15
    return nb_extract_words

# modèle KeyBert
# Retourne la liste des mots clés


def keybert_application(text, nb_extract_words):
    kw_model = KeyBERT()
    # for google translate, use text.text
    keywords_bert = kw_model.extract_keywords(
        text, top_n=nb_extract_words, keyphrase_ngram_range=(1, 1))
    #print(keywords_bert)
    #print("bert number:", len(keywords_bert))
    return keywords_bert

# modèle Yake


def yake_application(text, nb_extract_words):
    model = yake.KeywordExtractor(
        lan="en", n=1, dedupLim=0.7, top=nb_extract_words)
    keywords_yake = model.extract_keywords(text)
    #print(keywords_yake)
    #print("yake number" , len(keywords_yake))
    return keywords_yake

# fusionne les mots clés venant de KeyBert et Yake
# enlève les doublons


def fusion_keywords_lists(l1, l2, nb):
    l1 = [el[0].lower() for el in l1]
    l2 = [el[0].lower() for el in l2 if el[0].lower() not in l1]
    n = nb//2
    l1 = l1[:n]
    l2 = l2[:n]
    fusion_list = list(set(l1 + l2))  # pour retirer les mots en double
    return fusion_list


def translate_list_to_fr(list_words):
    trans2 = Translator()
    translate_list = []
    for group in list_words:
        temp = trans2.translate(group, src='en',  dest='fr')
        translate_list.append(temp.text)
    return translate_list

def translate_list_to_fr_azure(list_words):
    translate_list = []
    params = {
    'api-version': '3.0',
    'from': 'en',
    'to': 'fr'}
    # You can pass more than one object in body.
    
    for group in list_words:
        body = [{'text': group}]
        request = requests.post(constructed_url, params=params, headers=headers, json=body)
        response = request.json()
        transText = json.dumps(response[0]["translations"][0]["text"], 
                           sort_keys=True, ensure_ascii=False, indent=4, 
                           separators=(',', ': '))
        translate_list.append(transText)
    return translate_list


# prend la liste des mots clés et groupe les mots qui se ressemblent en sous liste
# il y a des sous listes identiques
def group_keywords(list_words):
    list_words = [[word] for word in list_words]
    for word_a in list_words:
      for word_b in list_words: 
        if word_a[0] != word_b[0]:
          ratio = fuzz.partial_ratio(word_a[0], word_b[0])
          if ratio > 75: # seuil à partir duquel on considère que 2 mots se ressemblent
            word_a.append(word_b[0])
    return list_words

# enlève les sous-listes en double dans la liste des listes de groupes de mots clés
def remove_same_groups(list_words):
    temp_list = []
    for list1 in list_words: 
      isinlist = False
      for list2 in temp_list:
        for word in list2:
          if list1[0] == word:
            isinlist = True
      if isinlist == False:
        temp_list.append(list1)
    list_words = temp_list
    return list_words

def convert_to_list(list_words):
    return_list = []
    for small_list in list_words:
        return_list.append(min(small_list, key = len))
    return return_list

#from nltk.stem import PorterStemmer
#from nltk.stem import LancasterStemmer
import treetaggerwrapper
from autocorrect import Speller

def word_lemmatisation(list_words):
    tagger = treetaggerwrapper.TreeTagger(TAGLANG='fr')
    lemmes = [] #initialisation d'une liste dans laquelle on y déposera les mots lemmatisés
    for word in list_words:
        tag = tagger.tag_text(word, tagonly = True) #methode qui "tag" le texte
        content = tag[0].split('\t') #la sortie est une liste bien qu'il n'y ait qu'un seul élément ici On split en raison du format de sortie du tag (voir cellules au dessus pour format)
        lemmes.append(content[2]) #ajout du mot lemmatisé dans la liste correspondante
    return lemmes

def auto_correction(list_words):
    spell = Speller(lang = 'fr')
    new_list = []
    for word in list_words:
        new_list.append(spell(word))
    return new_list

def auto_correction_en(list_words):
    spell = Speller(lang = 'en')
    new_list = []
    for word in list_words:
        new_list.append(spell(word))
    return new_list
        

# Fonction principale
def keywords_extraction(french_text):
    english_text = translate_text_to_en_azure(french_text)
    print(french_text)
    nb_extract_words = number_extract_words(english_text)
    print(nb_extract_words)
    keybert_extracted_words = keybert_application(
        english_text, nb_extract_words)
    yake_extracted_words = yake_application(english_text, nb_extract_words)
    extracted_words = fusion_keywords_lists(
        keybert_extracted_words, yake_extracted_words, nb_extract_words)
    liste_finale = auto_correction_en(extracted_words)
    print("\nbefore", extracted_words)
    liste_finale = translate_list_to_fr_azure(extracted_words)
    liste_finale = [el[1:-1] for el in liste_finale]
    print("\nafter", liste_finale)
    
    
    # Nouvelles intégrations
    liste_finale = group_keywords(liste_finale)
    liste_finale = remove_same_groups(liste_finale)
    liste_finale = convert_to_list(liste_finale)
    
    #porter = PorterStemmer()
    #for i in range(len(liste_finale)):
         #liste_finale[i] = porter.stem(liste_finale[i])
         
    liste_finale = word_lemmatisation(liste_finale)
    liste_finale = auto_correction(liste_finale)
    print("\nfinal", liste_finale)
    print(len(liste_finale))
    return liste_finale

###################################################################


server = 'xxxxxxxxxxxxx'
database = 'xxxxx'
username = 'xxxxxxxxxx'
password = '{xxxxxxxx}'
driver = '{ODBC Driver 17 for SQL Server}'


def Query_DB(kw_list):
    image_list = {}
    for i in kw_list:
        image_list[i] = Query_KW(i)
        if len(image_list[i]) == 0:
            image_list[i] = "https://pleinjour.fr/wp-content/plugins/lightbox/images/No-image-found.jpg"
        if type(image_list[i])==str:
            image_list[i]=image_list[i].split()
            
    return image_list


def Query_KW(kw):
    image_kw = []
    with pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD=' + password) as conn:
        with conn.cursor() as cursor:
            cursor.execute(""" Select url from picto_motcle pm
                               join motcle mc on pm.id_mc=mc.id_mc
                               join picto pc on pc.id_pic=pm.id_pic
                               where mot='%s';""" % kw)
            row = cursor.fetchone()
            while row:
                []
                image_kw.append(
                    "https://falcimages.blob.core.windows.net/falccontainer/"+str(row[0]))
                #print (str(row[0]) + " " + str(row[1]))
                row = cursor.fetchone()
    return image_kw


if __name__ == '__main__':
    app.run(host='localhost', port=8989)
