import time
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