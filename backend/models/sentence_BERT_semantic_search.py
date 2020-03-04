def get_corpus_embeddings(df):
    from sentence_transformers import SentenceTransformer
    embedder = SentenceTransformer('distiluse-base-multilingual-cased')
    corpus = df['Antwort']
    corpus_embeddings = embedder.encode(corpus)
    return corpus_embeddings



