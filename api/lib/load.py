import numpy as np
import pickle

def load_data(pklfile):
    f = open(pklfile, "rb")
    mydata = pickle.load(f)
    return mydata

def build_id2concept(concept2id):
    id2concept = dict()
    unique_concepts = list(concept2id.keys())

    for concept in unique_concepts:
        id2concept[concept2id[concept]] = concept
    return id2concept

mce_matrix_line = np.load("data/mce_matrix_line.npy")
concept2id_line = load_data("data/concept2id_line.pkl")
id2concept_line = build_id2concept(concept2id_line)

mce_matrix_n2v = np.load("data/mce_matrix_n2v.npy")
concept2id_n2v = load_data("data/concept2id_n2v.pkl")
id2concept_n2v = build_id2concept(concept2id_n2v)

mce_matrix_svd = np.load("data/mce_matrix_svd.npy")
concept2id_svd = load_data("data/concept2id_svd.pkl")
id2concept_svd = build_id2concept(concept2id_svd)

mce_matrix_glove = np.load("data/mce_matrix_glove.npy")
concept2id_glove = load_data("data/concept2id_glove.pkl")
id2concept_glove = build_id2concept(concept2id_glove)

mce_matrix_skipgram = np.load("data/mce_matrix_skipgram.npy")
concept2id_skipgram = load_data("data/concept2id_skipgram.pkl")
id2concept_skipgram = build_id2concept(concept2id_skipgram)

