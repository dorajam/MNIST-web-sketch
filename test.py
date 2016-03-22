import numpy as np
from skimage.measure import block_reduce
from numpy import array

arr = [1,2,3,4,5,6,4,5,1]
a = array(arr).reshape(3,3)
print a, a.shape
a = block_reduce(a, block_size=(2,2), func=np.mean)
print a, a.shape



