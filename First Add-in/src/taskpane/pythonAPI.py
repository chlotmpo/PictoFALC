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
    print(information.decode('ASCII'))
    return "nice"

def IAToJS():
    print("sélection des kw dans le txt")
    #txtFALC= information.decode('ASCII')
    #insérer le code de l'IA ici
    kw=["kw1","kw2","kw3"]
    return kw




if __name__ == '__main__':
    app.run(host='localhost', port=8989)
    
    
    

