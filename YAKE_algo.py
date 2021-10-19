# -*- coding: utf-8 -*-
"""
Created on Tue Oct 12 10:59:53 2021

@author: Nicolas Carval
"""
#%% Installation

#pip install git
#pip install git+https://github.com/LIAAD/yake
import yake
#pip install googletrans==3.1.0a0
from googletrans import Translator  

#%% Functions

def Main():
    f = open("C:/Users/Nicolas Carval/Documents/A4-Semestre_7/texte.txt")
    text = f.read()
    f.close()
    en_text = translation(text)
    extraction(en_text)


def translation(text):
    translator = Translator()  
    translated_text = translator.translate(text, lang_src='fr', lang_tgt='en')  
    print(translated_text.text)
    return translated_text.text

def extraction(en_text):
    language = "en"
    max_ngram_size = 1
    deduplication_threshold = 0.2
    numOfKeywords = 10
    custom_kw_extractor = yake.KeywordExtractor(lan=language, n=max_ngram_size, dedupLim=deduplication_threshold, top=numOfKeywords, features=None)
    keywords = custom_kw_extractor.extract_keywords(en_text)
    for kw in keywords:
        print(kw)


#%% Main
        
Main()



