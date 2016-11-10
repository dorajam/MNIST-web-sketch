# MNIST-web-sketch
## Recognises handwritten digits by utilizing a classical neural network

The neural network used for the sketch is a basic 784 x 30 x 10 network, trained on the 50.000 handwritten digits from the MNIST dataset (http://yann.lecun.com/exdb/mnist/).
The performance of the network is optimized by L2 regularization and squashed weights initialization. This makes the network be 96% accurate.

<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/13997178/14068661/70f4c974-f458-11e5-8ad9-ff92fbb3858f.gif" alt="Demo">
</p>

**DONE**
- [x] Draw a digit
- [x] Run the canvas image on network -> make a guess
- [x] Ask for feedback (get correct digit)
- [x] See the list of guesses according to their probabilities

**Ideas to improve on:**
  1. Sensitivity to the position/size of digit    
        - as the network is trained on the preprocessed MNIST digits, the inputted drawing won't necessarily look the same as the training data   
        - this makes the network see other digits based on the position/size of your drawing   
           
  2. Better data manipulation techniques   
        - see the manipulated data file for my attempt to modify the MNIST data and re-train my network.   
        - accuracy went down to 50% when data manipulation was carried out in both training and validation   
        - to figure out: what ratio of manipulated/original data should be used   
           
  3. Store the feedback image + label in database
  4. Re-train network by the inputted digits (automatically?)
