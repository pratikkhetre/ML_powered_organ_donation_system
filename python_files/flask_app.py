import pickle
import numpy as np

from flask import Flask, request
app = Flask(__name__)

@app.route('/',methods = ['POST', 'GET'])
def index():
    return "Hii"

@app.route('/getOrganCluster',methods = ['POST', 'GET'])
def getOrganCluster():
   if request.method == 'POST':
        result = request.get_json()
        input = [np.array([result["scr"], result["egfr"], result["hba1c"]])]
        kmeans_mod = pickle.load(open("mysite/kmeans_model.pkl", 'rb'))
        predict = kmeans_mod.predict(input)
        return str(predict[0])

@app.route('/getDiseaseStatus',methods = ['POST', 'GET'])
def getDiseaseStatus():
   if request.method == 'POST':
        result = request.get_json()
        input = [[result["bloodCellCount"], result["diabetesMillitus"], result["hemoglobin"], result["pusCell"], result["albunimDisorderSeverity"], result["appet"]]]
        svm_model = pickle.load(open("mysite/svm_model.pkl", 'rb'))
        predict = svm_model.predict(input)
        return str(predict[0])