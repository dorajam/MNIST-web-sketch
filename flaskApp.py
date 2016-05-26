from flask import Flask, request, send_file, redirect
import json
import os
import sys
import numpy as np
from numpy import array
from numpyEncoder import *
import librosa

import network

INPUT_NEURONS = 128 * 44
HIDDEN_LAYER1 = 50
OUTPUT_NEURONS = 2

net = network.Network([INPUT_NEURONS,HIDDEN_LAYER1, OUTPUT_NEURONS])

# create Flask server
app = Flask(__name__, static_path = '/static')

@app.route("/boo", methods=["POST", "GET"])
def process_wav():
    data = request.get_json()

    seconds_to_get = 1re
    S = []

    for i in range(seconds_to_get):
        sample, sr = librosa.load(data, duration=1.0, offset=i)
        if sample.shape == (22050,):
            C = librosa.feature.melspectrogram(y=sample, sr=sample.shape[0], S=None, n_fft=512)
            C = C.reshape((128*44,1))
            S.append(C)
        else:
            raise Exception("Sample rate is messy")

    d = open("recording.json", "w")
    json.dump(S, d, cls=NumpyEncoder)
    d.close()

    f = open("recording.json", "r")
    data = json.load(f, object_hook=json_numpy_obj_hook)
    d.close()

    f = open("weights.json", "r")
    weights = json.load(f, object_hook=json_numpy_obj_hook)

    h = open("biases.json", "r")
    biases = json.load(h, object_hook=json_numpy_obj_hook)

    # ------------------------------------ FORWARDPROPAGATE ----------------------------------------
    test_results = np.argmax(net.bingo(data,biases,weights))

    return test_results

# @app.route("/")
# def root():
#     return redirect('static/sketch.html')

if __name__ == "__main__":
    app.run(debug=True)


