# -*- coding: utf-8 -*-
"""
Created on Mon Jan 16 22:59:24 2023

@author: Jonathan
"""

import joblib as joblib
loaded_model = joblib.load('jobModel.pickle')
def predict(input_data):
    input_data_vectorized = vectorizer.transform([input_data])
    prediction = loaded_model.predict(input_data_vectorized)
    return prediction
from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict_route():
    input_data = request.get_json()['input']
    prediction = predict(input_data)
    print(prediction)
    return jsonify({'prediction': prediction[0]})
if __name__ == '__main__':
     app.run(port=8000)