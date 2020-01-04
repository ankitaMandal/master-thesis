from flask import Flask, render_template, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)

import os
import pandas as pd
import json
import sys


app = Flask(__name__)

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
app.config['MONGO_DBNAME'] = 'LTLGraderAnswers'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/LTLGraderAnswers'
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

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
    pushToDb()
    return "success"

def pushToDb():
    df = pd.read_excel('./files/data.xlsx', encoding='UTF-8')  # loading uploaded excel file
    df.to_json('data.json')  # saving to json file
    jdf = open('data.json').read()  # loading the json file
    data = json.loads(jdf)  # reading json file
    print('This is standard output', file=sys.stdout)
    print(data)








if __name__ == '__main__':
	app.run(debug=True)