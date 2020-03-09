
def get_corpus_embeddings(df):
    import sys
    import pickle
    from sentence_transformers import SentenceTransformer
    embedder = SentenceTransformer('distiluse-base-multilingual-cased')
    corpus = df['Antwort']
    corpus_embeddings = embedder.encode(corpus)
    print('iiiiii', file=sys.stdout)
    with open ('testdaf.pkl', 'wb') as file:
        pickle.dump(corpus_embeddings, file)
    return corpus_embeddings

def sort_results(df,search_str,semanticsimilarityThreshhold):
    import scipy.spatial
    import pickle
    import sys
    from sentence_transformers import SentenceTransformer
    embedder = SentenceTransformer('distiluse-base-multilingual-cased')
    # corpus_embeddings
    with open('testdaf.pkl', 'rb') as pickle_file:
        corpus_embeddings = pickle.load(pickle_file)
    sortedcol = search_str.replace(' ', '_')+ '_dist'
    df[sortedcol] = -1
    closest_n=df.shape[0]
    print(df, file=sys.stdout)
    print('inn', file=sys.stdout)
    print(search_str, file=sys.stdout)
    query_embeddings = embedder.encode(search_str)
    distances = scipy.spatial.distance.cdist(query_embeddings, corpus_embeddings, "cosine")[0]
    results = zip(range(len(distances)), distances)
    results = sorted(results, key=lambda x: x[1])
    for idx, distance in results[0:closest_n]:
        df.loc[idx, sortedcol] = float(1 - distance)
    sorted_df = df.sort_values(sortedcol, ascending=False)
    print(sorted_df, file=sys.stdout)
    print('out', file=sys.stdout)
    # df=df[(df[sortedcol] > (float(semanticsimilarityThreshhold) / 100))]
    return sorted_df






