
# pip install googletrans==3.1.0a0
# pip install googletrans==4.0.0rc1
from googletrans import Translator
# pip install keybert
from keybert import KeyBERT
# pip install git+https://github.com/LIAAD/yake
import yake
# pip install thefuzz
from thefuzz import fuzz

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
    
# prend la liste des mots clés et groupe les mots qui se ressemblent en sous liste
# il y a des sous listes identiques
def group_keywords(list_words):
    list_words = [[word] for word in list_words]
    for word_a in list_words:
      for word_b in list_words: 
        if word_a[0] != word_b[0]:
          ratio = fuzz.partial_ratio(word_a[0], word_b[0])
          if ratio > 65: # seuil à partir duquel on considère que 2 mots se ressemblent
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
    #print(extracted_words)
    
    # ON POURRAIT S'ARRETER LA!! Ici on a la liste de tous les mots clés en anglais
    # pb et objectif : il y a des mots similaires qu'on aimerait regrouper ensemble
    
    # On transforme la liste de mots en liste de groupes de mots qui se ressemblent
    extracted_words = group_keywords(extracted_words)
    #print(extracted_words)
    
    # On enlève les groupes en double
    extracted_words = remove_same_groups(extracted_words)
    print(extracted_words)
    
    # on traduit les mots en français
    tr_extracted_words = translate_list_to_fr(extracted_words)
    #print(tr_extracted_words)
    
    return tr_extracted_words
    
    
french_text = open_text("texte.txt")
tr_extracted_words = keywords_extraction(french_text)
print(tr_extracted_words)

# test translate
'''
translator = Translator()
translation = translator.translate("Bonjour", src='fr', dest = 'en')
print(translation)
'''


