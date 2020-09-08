import requests

def search_concept(concept_string):
    # https://athena.ohdsi.org/search-terms/terms?query=asddasd&boosts&page=1

    url = 'https://athena.ohdsi.org/api/v1/concepts'
    params = {'pageSize' : 20, 'query' : concept_string, 'boosts' : '', 'page': 1, 'domain' : 'Condition'}
    response = requests.get(url,params)
    contents = response.json()['content']
    search_concept_list =[{'conceptId' : content['id'], 'conceptName' : content['name']} for content in contents]
    return search_concept_list


if __name__ == "__main__":

    search_concept('type 2 diabetes')
