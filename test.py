import numpy as np
from skimage.measure import block_reduce
from numpy import array
from scipy import misc, ndimage


# arr = [1,2,3,4,5,6,4,5,1,1,2,3]
# a = array(arr).reshape(3,3)
a = misc.imread("outfile.jpg")
print a.shape
# print a, a.shape
# a = block_reduce(a, block_size=(2,2), func=np.mean)
# print a, a.shape
lx, ly = a.shape
rotate_image = ndimage.rotate(a, -10)
rotate_image = rotate_image[lx / 4: - lx / 4, ly / 4: - ly / 4]
print rotate_image
misc.imsave('outfile.jpg', rotate_image)