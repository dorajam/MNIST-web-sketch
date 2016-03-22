function downsample(pixels, W, H, W2, H2) {
	// var myCanvas = document.getElementById("myCanvas");
 //    ctx = myCanvas.getContext("2d");
	// input_data = ctx.getImageData(0, 0, 400, 400).data
	var batchW = Math.floor(W/W2);
	var batchH = Math.floor(H/H2);
	var result = []
	var subresult = 0;
	// for(var i = 0; i < W*H; i = i + batchW) {
	// 	for(var ii = 0; ii < batchW; ii = i++) {
	// 		subresult += pixels[i]
	// 	result.push(subresult/(subresult.length))
	// 	}
	// }
	// var sub =[]
	// for(var i =0; i <= result.length - W2; i++) {
	// 	sub += (results[i] + result[i+W2])/2
	// }
	// console.log(result)


	for(var j = 0; j < H*W; j = j+batchW) {
		for(var i = 0; i < W; i = i +batchW) {
			for(var jj = 0; jj < j + batchH; j++) {
				for(var ii = 0; ii < i + batchW; i++) {
					subresult += pixels[ii]
				}
			}
			var avr = subresult / ((jj + 1)(ii + 1))
			result.push()
		}
	}

}

function average(arr, index) {

}