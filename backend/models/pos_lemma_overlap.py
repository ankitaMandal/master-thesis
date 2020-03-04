#method to derive POS-Lemmas of answers
def get_pos_lemmas(df):
    from textblob_de.lemmatizers import PatternParserLemmatizer
    _lemmatizer = PatternParserLemmatizer()
    setPosLemmas = []
    for index, row in df.iterrows():
        setPosLemmas.append(set(_lemmatizer.lemmatize(row['Antwort'])))
    return setPosLemmas




