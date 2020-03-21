import pandas as pd
import difflib
data = pd.read_csv('TestdafFT01.txt', sep='\t',encoding='UTF-8')
df = pd.DataFrame()
df = df.append(data)
pattern = input("Please enter search pattern:\n")
distance =[]
df['dist']=-1
for index, row in df.iterrows():
    dist = difflib.SequenceMatcher(None,row['Antwort'],pattern).ratio()
    if( dist > 0 ):
        distance.append(dist)
    else:
        distance.append(0)
df['dist'] = distance
final_df = df.sort_values('dist',ascending=False)
# final_df = final_df[(final_df['lexicalfuzz'] > (lexicalVariance))]
final_df.to_csv('sequence_based.tsv', index=False,sep='\t')
