import pandas as pd
import jellyfish
import nltk
data = pd.read_csv('TestdafFT01.txt', sep='\t',encoding='UTF-8')
df = pd.DataFrame()
df = df.append(data)
pattern = input("Please enter search pattern:\n")
distance =[]
df['jwdist']=-1
for index, row in df.iterrows():
    dist = jellyfish.damerau_levenshtein_distance(row['Antwort'],pattern)
    if( dist > 0 ):
        distance.append(1/dist)
    else:
        distance.append(0)
df['jwdist'] = distance
final_df = df.sort_values('jwdist',ascending=False)
# final_df = final_df[(final_df['lexicalfuzz'] > (lexicalVariance))]
final_df.to_csv('damereu_levensthein_dist.tsv', index=False,sep='\t')
