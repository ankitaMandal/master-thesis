import pandas as pd
import numpy as np
import textdistance
import nltk
# textdistance.Hamming.hamming('test', 'text')
# # 1
# textdistance.hamming.distance('test', 'text')
# # 1
# textdistance.hamming.similarity('test', 'text')
# # 3
# textdistance.hamming.normalized_distance('test', 'text')
# # 0.25
#
# textdistance.hamming.normalized_similarity('test', 'text')
# 0.75
# print(textdistance.jaro_winkler("this test", "test this") )
# textdistance.Hamming(qval=2).distance('test', 'text')
data = pd.read_csv('TestdafFT01.txt', sep='\t',encoding='UTF-8')
df = pd.DataFrame()
df = df.append(data)
from fuzzywuzzy import fuzz
# lexicalVariance = int(input("Please enter lexical variance threshhold:\n"))
pattern = input("Please enter search pattern:\n")
distance =[]
df['lexicalfuzz']=-1
for index, row in df.iterrows():
    distance.append(1/(nltk.edit_distance(row['Antwort'],pattern)))
df['lexicalfuzz'] = distance
final_df = df.sort_values('lexicalfuzz',ascending=False)
# final_df = final_df[(final_df['lexicalfuzz'] > (lexicalVariance))]
final_df.to_csv('editDistance.tsv', index=False,sep='\t')
