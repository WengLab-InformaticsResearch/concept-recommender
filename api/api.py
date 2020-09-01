import time
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/getRecommend')
def get_recommend_concept():
    recommend_concept_list = []
    recommend_concept_list.append({
        'concept_id' : 1, 
        'concept_domain' : 'condition',
        'concept_name' : 'mock concept 1',
        'similarity_score' : 0.9,
        'concept rank' : 1
    })
    return jsonify(recommend_concept_list)