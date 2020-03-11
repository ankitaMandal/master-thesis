from flask import Flask,jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
import os
import pandas as pd
import json
from bson.json_util import dumps
import sys
import models.sentence_BERT_semantic_search,models.pos_lemma_overlap

app = Flask(__name__)

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
app.config['MONGO_DBNAME'] = 'LTLGraderAnswers'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/LTLGraderAnswers'
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
semanticsimilarityThreshhold=0
search_str=""
df=pd.DataFrame()
corpus_embeddings =[]
CORS(app)

@app.route("/upload", methods=['POST'])
def upload():
    target = os.path.join(APP_ROOT, 'files\\')
    print(target, file=sys.stdout)
    print('This is standard output!!!!', file=sys.stdout)
    if not os.path.isdir(target):
        os.mkdir(target)
    for file in request.files.getlist("file"):
        print(file)
        filename = "data.xlsx"
        destination = "\\".join([target, filename])
        print(destination)
        file.save(destination)
    push_to_db()
    return "success"

def push_to_db():
    global df
    df['embeddings']=-1
    df = pd.read_excel('./files/data.xlsx', encoding='UTF-8')  # loading uploaded excel file
    corpus_embeddings = models.sentence_BERT_semantic_search.get_corpus_embeddings(df)
    df['pos_lemma']=models.pos_lemma_overlap.get_pos_lemmas(df)
    df['label'] = df.apply(lambda x: 0, axis=1)
    records = json.loads(df.T.to_json()).values() # saving to json file
    print('This is standard output', file=sys.stdout)
    result = mongo.db.answers.insert(records)

@app.route("/getcount", methods=['GET'])
def annotated_answer_count():
    countUnannotated = mongo.db.answers.count({'label': 0 })
    countAnnotated = mongo.db.answers.find({ 'label' : { "$ne": 0 } }).count()
    return jsonify(unannotated=countUnannotated,
            annotated=countAnnotated)

@app.route("/getanswers", methods=['GET'])
def getanswers():
    res = dumps(mongo.db.answers.find({'label':0}, {'Antwort':1,'Teilnehmer':1,'_id':0}))
    return res

@app.route("/getsortedanswers", methods=['GET'])
def getsortedanswers():
    df = pd.read_csv('sorted_df.csv', encoding='UTF-8',sep="\t")
    res = df.to_json(orient="records")
    return res


@app.route("/search", methods=['POST'])
def search_pattern():
    global search_str
    search_str=request.data.decode('utf-8')
    global df
    global semanticsimilarityThreshhold
    df = pd.DataFrame(list(mongo.db.answers.find({'label':0})))
    sorted_df=models.sentence_BERT_semantic_search.sort_results(df,search_str,semanticsimilarityThreshhold)
    return "success"

@app.route("/labelanswers", methods=['POST'])
def label_answers():
    req=json.loads(request.data.decode('utf-8'))
    for item in req:
        mongo.db.answers.update_one(
            {"Teilnehmer": item['Teilnehmer']},
            {"$set":
                 {"label": item['label']
                  }})
    return "success"

if __name__ == '__main__':
	app.run(debug=True)