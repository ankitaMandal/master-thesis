import torch
print(torch.__version__)
map_location=torch.device('cpu')
from sentence_transformers import SentenceTransformer
import scipy.spatial
import pandas as pd

data = pd.read_csv('TestdafFT01.txt', sep='\t',encoding='UTF-8')
df = pd.DataFrame()
df = df.append(data)
# embedder = SentenceTransformer('bert-base-nli-mean-tokens')
embedder = SentenceTransformer('distiluse-base-multilingual-cased')
df['embeddings']=-1
corpus = df['Antwort']
corpus_score=df['gesamt']
corpus_embeddings = embedder.encode(corpus)
df['embeddings'] = corpus_embeddings
#print(corpus_embeddings[0])
# Query sentences:
queries = ['keine Noten geben']
df[queries[0]+'_dist']=-1
query_embeddings = embedder.encode(queries)


# Find the closest 20 sentences of the corpus for each query sentence based on cosine similarity
closest_n =df.shape[0]
for query, query_embedding in zip(queries, query_embeddings):
    distances = scipy.spatial.distance.cdist([query_embedding], corpus_embeddings, "cosine")[0]
    results = zip(range(len(distances)), distances)
    results = sorted(results, key=lambda x: x[1])

    # print("\n\n======================\n\n")
    # print("Query:", query)
    # print("\nTop 20 most similar sentences in corpus:")

    for idx, distance in results[0:closest_n]:
        print(corpus[idx].strip(), "(Score: %.4f)" % (1-distance),"Class Label at index  %s"% corpus_score[idx],"at index %s" % idx)
        df.loc[idx, queries[0]+'_dist'] = float(1-distance)
df=df.sort_values(queries[0]+'_dist', ascending=False)
df.to_csv('sentenceBERT-top_matches.tsv',sep='\t')
