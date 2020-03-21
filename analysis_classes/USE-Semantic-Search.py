import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
import nltk
import re
import pandas as pd
import scipy.spatial
from stop_words import get_stop_words
stop_words = get_stop_words('de')
# tensroflow hub module for Universal sentence Encoder
# module_url = "https://tfhub.dev/google/universal-sentence-encoder-multilingual-large/2" #@param ["https://tfhub.dev/google/universal-sentence-encoder/2", "https://tfhub.dev/google/universal-sentence-encoder-large/3"]
module_url = "https://tfhub.dev/google/universal-sentence-encoder/2" #@param ["https://tfhub.dev/google/universal-sentence-encoder/2", "https://tfhub.dev/google/universal-sentence-encoder-large/3"]
embed = hub.Module(module_url)
# embed = hub.KerasLayer(module_url)
def get_features(texts):
    if type(texts) is str:
        texts = [texts]
    with tf.Session() as sess:
        sess.run([tf.global_variables_initializer(), tf.tables_initializer()])
        return sess.run(embed(texts))


def remove_stopwords(stop_words, tokens):
    res = []
    for token in tokens:
        if not token in stop_words:
            res.append(token)
    return res


def process_text(text):
    text = text.encode('ascii', errors='ignore').decode()
    text = text.lower()
    text = re.sub(r'http\S+', ' ', text)
    text = re.sub(r'#+', ' ', text)
    text = re.sub(r'@[A-Za-z0-9]+', ' ', text)
    text = re.sub(r"([A-Za-z]+)'s", r"\1 is", text)
    # text = re.sub(r"\'s", " ", text)
    text = re.sub(r"\'ve", " have ", text)
    text = re.sub(r"won't", "will not ", text)
    text = re.sub(r"isn't", "is not ", text)
    text = re.sub(r"can't", "can not ", text)
    text = re.sub(r"n't", " not ", text)
    text = re.sub(r"i'm", "i am ", text)
    text = re.sub(r"\'re", " are ", text)
    text = re.sub(r"\'d", " would ", text)
    text = re.sub(r"\'ll", " will ", text)
    text = re.sub('\W', ' ', text)
    text = re.sub(r'\d+', ' ', text)
    text = re.sub('\s+', ' ', text)
    text = text.strip()
    return text


def lemmatize(tokens):
    lemmatizer = nltk.stem.WordNetLemmatizer()
    lemma_list = []
    for token in tokens:
        lemma = lemmatizer.lemmatize(token, 'v')
        if lemma == token:
            lemma = lemmatizer.lemmatize(token)
        lemma_list.append(lemma)
    # return [ lemmatizer.lemmatize(token, 'v') for token in tokens ]
    return lemma_list


def process_all(text):
    text = process_text(text)
    return ' '.join(remove_stopwords(stop_words, text.split()))

def cosine_similarity(v1, v2):
    mag1 = np.linalg.norm(v1)
    mag2 = np.linalg.norm(v2)
    if (not mag1) or (not mag2):
        return 0
    return np.dot(v1, v2) / (mag1 * mag2)

def semantic_search(query, data, vectors):
    query = process_text(query)
    print("Extracting features...")
    query_vec = get_features(query)[0].ravel()
    res = []
    for i, d in enumerate(data):
        qvec = vectors[i].ravel()
        sim = cosine_similarity(query_vec, qvec)
        res.append((sim, d[:100], i))
    return sorted(res, key=lambda x : x[0], reverse=True)
data = pd.read_excel('data.xlsx', encoding='UTF-8')
df = pd.DataFrame()
df = df.append(data)
data_processed = list(map(process_text, df['Antwort']))
BASE_VECTORS = get_features(df['Antwort'])
results = semantic_search("zu viel Zucker essen", data_processed, BASE_VECTORS)
closest_n =50
for value in results[0:closest_n]:
        print(value)