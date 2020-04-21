#method to derive POS-Lemmas of answers
def get_pos_lemmas(df):
    from textblob_de.lemmatizers import PatternParserLemmatizer
    _lemmatizer = PatternParserLemmatizer()
    setPosLemmas = []
    for index, row in df.iterrows():
        setPosLemmas.append(set(_lemmatizer.lemmatize(row['Antwort'])))
    return setPosLemmas

def sort_results(df,search_str):
    import spacy
    from sklearn import preprocessing
    from spellchecker import SpellChecker
    import pandas as pd
    import jellyfish
    nlp = spacy.load("de_core_news_sm")
    spell = SpellChecker(language=u'de', case_sensitive=False)
    query = nlp(search_str)
    query_lemma_and_tokens = []
    query_pos_lemma = []
    for token in query:
        query_lemma_and_tokens.append([token.pos_ + '_' + token.lemma_, token])
        query_pos_lemma.append(token.pos_ + '_' + token.lemma_)

    df['_overlap'] = -1
    results = []
    for index, row in df.iterrows():
        doc = nlp(row['Antwort'])
        ans_lemma_and_tokens = []
        ans_pos_lemma = []
        for token in doc:
            ans_lemma_and_tokens.append([token.pos_ + '_' + token.lemma_, token])
            ans_pos_lemma.append(token.pos_ + '_' + token.lemma_)

        overlap = set(ans_pos_lemma) & set(query_pos_lemma)
        # universe = set(listA) | set(listB)
        result = float(len(overlap)) / len(set(query_pos_lemma))
        if (len(overlap) > 0):
            similarity = 0


            for item in overlap:
                indexPosListAns = [i for i, lst in enumerate(ans_lemma_and_tokens) if lst[0] in item]
                indexPosListQuery = [i for i, lst in enumerate(query_lemma_and_tokens) if lst[0] in item]
                for idx_ans, idx_query in zip(indexPosListAns, indexPosListQuery):
                    str1 = ans_lemma_and_tokens[idx_ans][1]
                    str2 = query_lemma_and_tokens[idx_query][1]
                    similarity += jellyfish.jaro_distance(str(str1), str(str2))

            # for idx in indices:
            #     similarity += ans_tokens[idx].similarity(query_tokens[idx])
            result += similarity

        results.append(result)

        # df.set_value(index, '_overlap', result)
    df['_overlap'] = results
    df["_overlap"] = df["_overlap"] / df["_overlap"].max()
    sorted_df = df.sort_values('_overlap', ascending=False)
    sorted_df = sorted_df[sorted_df['Teilnehmer'].notna()]
    sorted_df = sorted_df[sorted_df['label'] == 0.0]
    sorted_df.to_csv('sorted_poslemma.csv', encoding='utf-8', sep="\t")
    return sorted_df


