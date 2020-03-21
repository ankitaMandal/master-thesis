import spacy
import nltk
from more_itertools import locate
from spellchecker import SpellChecker
import pandas as pd
import jellyfish
nlp = spacy.load("de_core_news_sm")
data = pd.read_csv('TestdafFT01.txt', sep='\t',encoding='UTF-8')
df = pd.DataFrame()
df = df.append(data)
df.dropna()
spell = SpellChecker(language=u'de', case_sensitive=False)
containsUnknownWords = []
# Query sentences:
semanticSimilarityThreshold = float(input("Please enter morphological variance threshhold:\n"))
pattern = input("Please enter search pattern:\n")
query = nlp(pattern)
query_lemma_and_tokens = []
query_pos_lemma = []
for token in query:
  query_lemma_and_tokens.append([token.pos_ + '_' + token.lemma_,token])
  query_pos_lemma.append(token.pos_+'_'+token.lemma_)

df['morph_overlap'] = -1
print('query_tokens',query_lemma_and_tokens)
print('query_pos_lemma',query_pos_lemma)
results = []
for index, row in df.iterrows():
    # print(_lemmatizer.lemmatize(row['Antwort']))
    doc = nlp(row['Antwort'])
    ans_lemma_and_tokens = []
    ans_pos_lemma = []
    for token in doc:
        ans_lemma_and_tokens.append([token.pos_ + '_' + token.lemma_,token])
        ans_pos_lemma.append(token.pos_ + '_' + token.lemma_)

    overlap = set(ans_pos_lemma) & set(query_pos_lemma)
    print('overlap',overlap)
    # universe = set(listA) | set(listB)
    result = float(len(overlap)) / len(set(query_pos_lemma))
    if(len(overlap)>0):
        similarity = 0


        print('ans_tokens', ans_lemma_and_tokens)
        print('query_tokens', query_lemma_and_tokens)
        for item in overlap:
            indexPosListAns = [i for i, lst in enumerate(ans_lemma_and_tokens) if lst[0] in item]
            indexPosListQuery = [i for i, lst in enumerate(query_lemma_and_tokens) if lst[0] in item]
            print(indexPosListAns)
            print(indexPosListQuery)
            for idx_ans, idx_query in zip(indexPosListAns, indexPosListQuery):
                str1 = ans_lemma_and_tokens[idx_ans][1]
                str2 = query_lemma_and_tokens[idx_query][1]
                sound1=(jellyfish.metaphone(str(str1)))
                sound2=(jellyfish.metaphone(str(str2)))
                if(sound1==sound2):
                    similarity +=1




        # for idx in indices:
        #     similarity += ans_tokens[idx].similarity(query_tokens[idx])
        result += similarity

    results.append(result)
    print('result',result)
    # df.set_value(index, 'morph_overlap', result)
df['morph_overlap']=results
df=df.sort_values(by='morph_overlap', ascending=False)
# # print('Top Matches:')
# for index, row in df.iterrows():
#     if(result>=morphologicalVariance):
#         print(row['Antwort'],row['gesamt'])
df.to_csv('POSLemma-Metaphone.tsv', index=False,sep='\t')

