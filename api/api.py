import time
import pickle
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS
from lib.search import search_concept
from lib.recommend import recommend_concept
from lib.load import mce_matrix_line,concept2id_line,id2concept_line,summed_vec_line

app = Flask(__name__)
CORS(app)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/getRecommend',methods=['POST'])
def get_recommend_concept():
    concept_list = [str(seed['conceptId']) for seed in request.json['seed_list']]
    methods = request.json['methods']

    k = 10
    if methods == 'line':
        recommend_concept_list = recommend_concept(concept_list, k, summed_vec_line, mce_matrix_line, id2concept_line, concept2id_line)

    elif methods == 'node2vec':
        recommend_concept_list = recommend_concept(concept_list, k, summed_vec_n2v, mce_matrix_n2v, id2concept_n2v, concept2id_n2v)

    elif methods == 'svd':
        recommend_concept_list = recommend_concept(concept_list,k,summed_vec_line,mce_matrix_line,id2concept_line,concept2id_line)

    elif methods == 'glove':
        recommend_concept_list = recommend_concept(concept_list,k,summed_vec_line,mce_matrix_line,id2concept_line,concept2id_line)

    elif methods == 'skipgram':
        recommend_concept_list = recommend_concept(concept_list,k,summed_vec_line,mce_matrix_line,id2concept_line,concept2id_line)
    # recommend_concept_list = [
    #     {'conceptId' : 5, 'conceptName' : 'mock concept 5'},
    #     {'conceptId' : 6, 'conceptName' : 'mock concept 6'},
    #     {'conceptId' : 7, 'conceptName' : 'mock concept 7'},
    #     {'conceptId' : 8, 'conceptName' : 'mock concept 8'}]
    return jsonify(recommend_concept_list)

@app.route('/getSearch',methods=['POST'])
def get_search_concept():
    search_text = request.json['search_text']
    search_concept_list = search_concept(search_text)
    # search_concept_list =[
    #     {'conceptId' : 1, 'conceptName' : 'mock concept 1'},
    #     {'conceptId' : 2, 'conceptName' : 'mock concept 2'},
    #     {'conceptId' : 3, 'conceptName' : 'mock concept 3'},
    #     {'conceptId' : 4, 'conceptName' : 'mock concept 4'}]
    return jsonify(search_concept_list)