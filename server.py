from flask import Flask, request, send_file, render_template
import json
import os
import sys
import socket

import numpy as np
from numpy import array
from skimage.measure import block_reduce
import sketchNetwork as net
from numpyEncoder import *
import matplotlib.pyplot as plt
import scipy


CANVAS_WIDTH = 400
CANVAS_HEIGHT = 400
NET_DIM = 29
HIDDEN_LAYERS = 30
OUTPUTS = 10

# instantiate neural network
net = net.Network([NET_DIM*NET_DIM, HIDDEN_LAYERS, OUTPUTS])
# create Flask server
app = Flask(__name__, static_path = '/static')

@app.route("/sketch", methods=["POST", "GET"])
def sketch():
    data = request.get_json()

    # reshape into 400x400 matrix
    a = array(data).reshape(400,400)
    # downsample into 29x29
    a = block_reduce(a, block_size=(14,14), func=np.mean)
    # get rid of last row and last col -> 28x28
    a = a[:-1,:-1]
    scipy.misc.imsave('outfile.jpg', a)
    a = a.reshape((784,1))
    # draw the image in ascii
    i = 0
    for j in range(a.shape[0]):
        for num in np.nditer(a[j]):
            if i%28 == 0:
                print "\n",
            i += 1
            if num < 0.1:
                sys.stdout.write(' ')
            else:
                sys.stdout.write('x')

    # forward propagate to get the guess by the network
    f = open("weightsL2W.json", "r")
    weights = json.load(f, object_hook=json_numpy_obj_hook)
    h = open("biasesL2W.json", "r")
    biases = json.load(h, object_hook=json_numpy_obj_hook)
    res = net.bingo(a, biases, weights)

    # larger spikes for potential values
    res = softmax(res)

    # get the probabilities of other guesses
    res_list = []
    for i in range(len(res)):
            index = np.argmax(res)
            res[index] = 0
            res_list.append(index)
    print res_list
    print 'the guess is: ', res_list[0]

    # make neurel net, pass in data
    return str(res_list)

@app.route("/")
def root():
    return render_template('index.html')

def softmax(x):
    """Compute softmax values for each sets of scores in x."""
    e_x = np.exp(x - np.max(x))
    return e_x / e_x.sum()


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True, passthrough_errors=False)


