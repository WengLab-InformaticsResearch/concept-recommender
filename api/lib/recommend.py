import numpy as np
from lib.search import search_concept_name_by_id
from lib.load import mce_matrix_line,concept2id_line,id2concept_line,summed_vec_line


def normalize_vec(vec):
    return vec / np.linalg.norm(vec, ord=1)

def elemwise_cossim(vec, matrix):
    noms = np.matmul(vec, matrix.transpose())
    denoms = np.sqrt(np.sum(np.multiply(matrix, matrix), axis=1)) * np.sqrt(np.sum(np.multiply(vec, vec)))
    sim_array = noms / denoms
    
    #print("nan in cosine similarity array is converted to 0")
    sim_array = np.nan_to_num(sim_array)
    return sim_array


def recommend_concept(seed_concept_list,k,summed_vec,mce_matrix,id2concept,concept2id):
    concept_list = []
    i_in_dict = 0
    for concept in seed_concept_list:
        if concept in concept2id.keys():
            summed_vec = summed_vec + mce_matrix[concept2id[concept]]
            i_in_dict += 1
    if i_in_dict > 0: # at least one seed concept in the dict.
        summed_vec = normalize_vec(summed_vec)

        index_rank = elemwise_cossim(summed_vec, mce_matrix)
        nn_index = index_rank.argsort()[-k:] # retrieve top 20 concepts

        nn_concepts = []
        for idx, _ in enumerate(nn_index):
            nn_concepts.append(id2concept[nn_index[-(1+idx)]])

        concept_list =[{'conceptId' : int(concept_id), 'conceptName' : search_concept_name_by_id(int(concept_id))} for concept_id in nn_concepts]
    return concept_list


# recommend_concept(201826,20,summed_vec,mce_matrix,id2concept,concept2id)