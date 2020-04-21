import contextlib
import os
def sort_results(df,search_str):
    import jellyfish
    # with contextlib.suppress(FileNotFoundError):
    #     os.remove('sorted_jaro.csv')
    distance = []
    df['_jarodist'] = -1
    for index, row in df.iterrows():
        dist = jellyfish.jaro_distance(row['Antwort'], search_str)
        if (dist > 0):
            distance.append(dist)
        else:
            distance.append(0)
    df['_jarodist'] = distance
    sorted_df = df.sort_values('_jarodist', ascending=False)
    sorted_df = sorted_df[sorted_df['Teilnehmer'].notna()]
    sorted_df = sorted_df[sorted_df['label'] == 0.0]
    sorted_df.to_csv('sorted_jaro.csv', encoding='utf-8', sep="\t")
    return sorted_df
