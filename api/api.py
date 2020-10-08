import time
import pickle
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/getRecommend',methods=['POST'])
def get_recommend_concept():
    arguments = request.json
    mce_matrix = np.load("./data/mce_matrix_line.npy")
    concept2id = load_data("./data/concept2id_line.pkl")
    id2concept = build_id2concept(concept2id)

    summed_vec = np.zeros(mce_matrix.shape[1])
    for concept in arguments:
        summed_vec += mce_matrix[concept2id[concept]]
    summed_vec = normalize_vec(summed_vec)

    index_rank = elemwise_cossim(summed_vec, mce_matrix)
    nn_index = index_rank.argsort()[-arguments.k:] # retrieve top 20 concepts

    nn_concepts = []
    for idx, _ in enumerate(nn_index):
        nn_concepts.append(id2concept[nn_index[-(1+idx)]])

    recommend_concept_list = [
        {'conceptId' : 5, 'conceptName' : 'mock concept 5'},
        {'conceptId' : 6, 'conceptName' : 'mock concept 6'},
        {'conceptId' : 7, 'conceptName' : 'mock concept 7'},
        {'conceptId' : 8, 'conceptName' : 'mock concept 8'}]
    return jsonify(recommend_concept_list)

@app.route('/getSearch',methods=['POST'])
def get_search_concept():
    search_text = request.json['search_text']
    search_concept_list =[
        {'conceptId' : 1, 'conceptName' : 'mock concept 1'},
        {'conceptId' : 2, 'conceptName' : 'mock concept 2'},
        {'conceptId' : 3, 'conceptName' : 'mock concept 3'},
        {'conceptId' : 4, 'conceptName' : 'mock concept 4'}]
    return jsonify(search_concept_list)

def load_data(pklfile):
    f = open(pklfile, "rb")
    mydata = pickle.load(f)
    return mydata

def normalize_vec(vec):
    return vec / np.linalg.norm(vec, ord=1)

def elemwise_cossim(vec, matrix):
    noms = np.matmul(vec, matrix.transpose())
    denoms = np.sqrt(np.sum(np.multiply(matrix, matrix), axis=1)) * np.sqrt(np.sum(np.multiply(vec, vec)))
    sim_array = noms / denoms
    
    #print("nan in cosine similarity array is converted to 0")
    sim_array = np.nan_to_num(sim_array)
    return sim_array

def build_id2concept(concept2id):
    id2concept = dict()
    unique_concepts = list(concept2id.keys())

    for concept in unique_concepts:
        id2concept[concept2id[concept]] = concept
    return id2concept