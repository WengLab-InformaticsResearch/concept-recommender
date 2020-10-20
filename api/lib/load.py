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
summed_vec_line = np.zeros(mce_matrix_line.shape[1])

# print(concept2id['201826'])
