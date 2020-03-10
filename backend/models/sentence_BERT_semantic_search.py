import pickle
import sys
from sentence_transformers import SentenceTransformer
embedder = SentenceTransformer('distiluse-base-multilingual-cased')

def get_corpus_embeddings(df):
    corpus = df['Antwort']
    corpus_embeddings = embedder.encode(corpus)
    print('iiiiii', file=sys.stdout)
    with open ('testdaf.pkl', 'wb') as file:
        pickle.dump(corpus_embeddings, file)
    return corpus_embeddings

def sort_results(df,search_str,semanticsimilarityThreshhold):
    import scipy.spatial
    # corpus_embeddings
    with open('testdaf.pkl', 'rb') as pickle_file:
        corpus_embeddings = pickle.load(pickle_file)
    corpus = df['Antwort']
    corpus_score = df['gesamt']
    queries = [search_str]
    sortedcol = search_str.replace(' ', '_') + '_dist'
    df[sortedcol] = -1
    query_embeddings = embedder.encode(queries)
    closest_n = df.shape[0]
    for query, query_embedding in zip(queries, query_embeddings):
        distances = scipy.spatial.distance.cdist([query_embedding], corpus_embeddings, "cosine")[0]
        results = zip(range(len(distances)), distances)
        results = sorted(results, key=lambda x: x[1])

        for idx, distance in results[0:closest_n]:
            print(corpus[idx].strip(), "(Score: %.4f)" % (1 - distance), "Class Label at index  %s" % corpus_score[idx],
                  "at index %s" % idx)
            df.loc[idx, sortedcol] = float(1 - distance)
    sorted_df = df.sort_values(sortedcol, ascending=False)
    sorted_df.to_csv('sorted_df.csv', encoding='utf-8',sep="\t")
    return sorted_df






