import numpy as np
from skimage.measure import block_reduce
from numpy import array
from scipy import misc, ndimage
# ------------------ PRACTICE ----------------------
a = misc.imread("outfile.jpg")
print a.shape
# lx, ly = a.shape
# rotate_image = rotate_image[lx / 4: - lx / 4, ly / 4: - ly / 4]
rotate_image = ndimage.rotate(a, -20, reshape = False)
print a.shape
print rotate_image
misc.imsave('outfile.jpg', rotate_image)

# ------------------ ACTUAL DATA ----------------------
# see the one in the networks folder