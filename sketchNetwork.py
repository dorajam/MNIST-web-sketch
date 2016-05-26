# Dora Jambor
# MNIST digit recognition 
# following Michael Nielsen's book on Neural Network and Deep Learning

'''Neural network adjusted by L2 regulaizaton against overfitting-> weight decay. 
with weight squashing to make the activation function smoother for achieving larger learning.'''

import numpy as np
import random
import math
import sys  
import time
import json
import base64
from numpyEncoder import *
from scipy import misc, ndimage

class Network:            
    def __init__(self, sizes):
        self.layers = len(sizes)
        self.sizes = sizes                                                              # list of neurons on each layer
        self.squashed_weights_init(sizes)
        self.result_new = []

    def squashed_weights_init(self, sizes):
        self.weights = [np.random.randn(y,x)/np.sqrt(x) for x,y in zip(sizes[:-1], sizes[1:])]
        self.biases = [np.random.randn(y,1) for y in sizes[1:]]

    def rand_weights_init(self,sizes):
        self.weights = [np.random.randn(y,x) for x,y in zip(sizes[:-1], sizes[1:])]
        self.biases = [np.random.randn(y,1) for y in sizes[1:]]


    def feedForward(self, a):
        '''Calculates the activation vector from all inputs from previous layer.'''
        for b, w in zip(self.biases, self.weights):                                      # you loop through each neuron on each layer
            a = sigmoid(np.dot(w, a) + b)                                                # to calculate activation vector in the last layer
        return a                                                                         # z = w . x + b, a is the last output vector

    def bingo(self, a, biases, weights):
        '''
        Runs the network with the trained weights and biases and returns a guess.
        '''
        for b, w in zip(biases, weights):
            a = sigmoid(np.dot(w, a) + b)
        return a  

    def gradientDescent(self, trainingSet, batch_size, learningRate, epochs, lmbda, test_data=None):
        '''
        You have some data from the trainingSet with (x,y) tuples with x
        being the training input and y being the desired output ->classification.
        You can use stochastic gradient descent with smaller batch sizes.
        '''
        # ----------- if you want to manipulate data ------------ 
        # extra = trainingSet[:5000]
        # print 'Length of training data initially: ', len(trainingSet)
        # data1 = trainingSet + [(ndimage.rotate(x, -10, reshape =False),y) for x,y in extra]
        # data2 = data1 + [(ndimage.rotate(x, 10, reshape =False),y) for x,y in extra]
        # trainingSet = data2 + [(ndimage.rotate(x, 0),y) for x,y in extra]
        # print 'Length of manipulated training data: ', len(trainingSet)

        # # manipulate validation set
        # extratest = test_data[:1000]
        # print 'Length of test data initially: ', len(test_data)
        # test_data1 = test_data + [(ndimage.rotate(x, -10, reshape =False),y) for x,y in extratest]
        # test_data2 = test_data1 + [(ndimage.rotate(x, 10, reshape =False),y) for x,y in extratest]
        # test_data = test_data2 + [(ndimage.rotate(x, 0),y) for x,y in extratest]
        # # should be 40K images
        # print 'Length of manipulated test data: ',len(test_data)
        # --------------------------------------------------------- 

        if test_data: n_test = len(test_data)
        trainingSize = len(trainingSet)
        self.result_new = []

        # repeat this until finding 'reliable' accuracy between desired and real outcomes
        for i in xrange(epochs):
            print "Starting epochs"
            start = time.time()
            random.shuffle(trainingSet)
            # create smaller samples to do your computations on                                                   
            batches = [trainingSet[k:k + batch_size] for k in xrange(0, trainingSize, batch_size)]
            # update each image in each batch
            for batch in batches:
                self.update(batch, learningRate, lmbda, trainingSet)
            # take the 10K images that were reserved for validation and check accuracy
            print "Validating..."
            self.result_new.append(self.validate(test_data))
            if test_data:
                print "Epoch {0}: {1} / {2}".format(
                    i, self.result_new[-1], n_test), 'Percentage', format(self.result_new[-1]/float(n_test)*100, '.2f')
            else:
                print "Epoch {0} complete".format(i)
            timer = time.time() - start
            print "Estimated time: ", timer

        # f = open("weightsL2W.json", "w")
        # json.dump(self.weights, f, cls=NumpyEncoder)
        # f.close()

        # b = open("biasesL2W.json", "w")
        # json.dump(self.biases, b, cls=NumpyEncoder)
        # b.close()
        # return self.result_new

    def update(self, batch, learningRate, lmbda, trainingSet):
        '''
        Backpropagate will return derivates of the cost function w.r.t. b 
        and w.r.t. w for each neuron, which will then be used to calculate 
        the new biases and weights matrices. 
        biases = biases - learningRate * deltaB
        '''
        n = len(trainingSet)
        # loop through each picture in the given batch: x is input, y is desired output
        for x,y in batch:
            # backpropagate to get (C/b)' and (C/w)' - two vectors
            deltaBiases, deltaWeights = self.backprop(x,y)

            # calculate new biases and weights
            self.biases = [b - learningRate * db/len(batch) for b,db in zip(self.biases, deltaBiases)]
            self.weights = [(1 - learningRate * lmbda/n) * w - learningRate * dw/len(batch) for w,dw in zip(self.weights, deltaWeights)]

    def backprop(self, x, y):
        ''' Takes (x,y) where x is the pixel from the training image, y is the desired outcome
        and returns a tuple of two vectors of the same shape as biases and weights.
        '''
        delta_b = [np.zeros(b.shape) for b in self.biases]                             # Set up numpy vector to store bias deltas
        delta_w = [np.zeros(w.shape) for w in self.weights]                            # Set up numpy vector to store weight deltas

        a = x                         # x is the pixel input from the training image (at the input layer)
        z_vectors = []
        all_activations = [x]         # store all input vectors

        # First step: FEEDFORWARD
        for b, w in zip(self.biases, self.weights):
            z = np.dot(w, a) + b      # this is the weighted input
            z_vectors.append(z)       # store all z vectors - last vector is computed right before last layer
            a = sigmoid(z)            # calculate the activation function in the last layer
            all_activations.append(a) # store all act. vectors in this list
        
        # First equation -> calculate delta at final layer from the cost function
        delta = (all_activations[-1] - y) * sigmoid_prime(z_vectors[-1])
        delta_b[-1] = delta
        delta_w[-1] = np.dot(delta, all_activations[-2].transpose())

        # Second step: OUTPUT ERROR
        for l in range(2, self.layers):
            z = z_vectors[-l]
            sp = sigmoid_prime(z)
            delta = np.dot(self.weights[-l+1].transpose(), delta) * sp                  # backprop to calculate error (delta) at layer - 1
            delta_b[-l] = delta
            delta_w[-l] = np.dot(delta, all_activations[-l-1].transpose())
        return delta_b, delta_w

    def validate(self, test_data):
        ''' Go through the data you set aside for validation, 
        take all outcomes (x vector) for each picture and get the INDEX of the highest 
        outcome -> the outcome that fired the most. 
        Then check how many images youll get the correct result for.
        '''
        test_results = [(np.argmax(self.feedForward(x)),y) for x, y in test_data]
        # draw(test_data, test_result)                                                    # draw images in command line
        return sum(int(x == y) for x, y in test_results)                                # check for accuracy

def draw(test_data, test_result):
        i = 0
        for j in range(len(test_data)):
            for num in np.nditer(test_data[j][0]):
                if i%28 == 0:
                    print "\n",
                i += 1
                if num < 0.1:
                    sys.stdout.write(' ')
                else:
                    sys.stdout.write('x')
            print "\nMy output:", test_results[j][0]
            print "The desired class is:", test_data[j][1]

def sigmoid(z):
        return 1.0/(1.0+np.exp(-z))

def sigmoid_prime(z):
    ''' Returns the derivative of sigmoid(z = w.x + b) w.r.t. z'''
    return sigmoid(z)*(1-sigmoid(z))




