 window.onload = function() {
        var myCanvas = document.getElementById("myCanvas");
        if(myCanvas){
                var isDown = false;
                var ctx = myCanvas.getContext("2d");
                var canvasX, canvasY;
                // for creating a manipulated canvax inside, use:
                // ctx.fillStyle = 'white';
                // ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
                ctx.lineWidth = 5;

                $(myCanvas)
                .mousedown(function(e){
                isDown = true;
                ctx.beginPath();
                canvasX = e.pageX - myCanvas.offsetLeft;
                canvasY = e.pageY - myCanvas.offsetTop;
                ctx.moveTo(canvasX, canvasY);
                })
                .mousemove(function(e){
                        if(isDown != false) {
                                canvasX = e.pageX - myCanvas.offsetLeft;
                                canvasY = e.pageY - myCanvas.offsetTop;
                                ctx.lineTo(canvasX, canvasY);
                                ctx.strokeStyle = "#2f291e";
                                ctx.stroke();                               
                                }
                        })
                .mouseup(function(e){
                        isDown = false;
                        ctx.closePath(); 
                });
        } 
};

        
        // var dt = myCanvas.toDataURL('image/jpeg');
        // this.href = dt;
        // };
        // var button = document.getElementById('save');
        // if(button){
        //         button.addEventListener('click', download, false);
        
// button.addEventListener('click', download, false);       

function send() {
        var myCanvas = document.getElementById("myCanvas");
        ctx = myCanvas.getContext("2d");
        console.log(ctx.getImageData(0, 0, 400, 400).data);
        input_data = ctx.getImageData(0, 0, 400, 400).data
        console.log(input_data.length)
        var pixels = []
        for(var i = 0; i < input_data.length; i=i+4) {
                pixels.push(input_data[i])
        }
        console.log(pixels.length)
        // localStorage.setItem('data_input.json', JSON.stringify(pixels))
        // var myCanvas = document.getElementById("myCanvas");
        // ctx = myCanvas.getContext("2d");
        // input_data = ctx.getImageData(0, 0, 400, 400).data
        // var W = H = 400
        // var W2 = H2 = 28
        // var batchW = Math.floor(W/W2);
        // var batchH = Math.floor(H/H2);
        // var result = []
        // var subresult = 0;
        // for(var i = 0; i < W*H; i = i + batchW) {
        //         for(var ii = 0; ii < batchW; ii = i++) {
        //                 subresult += pixels[i]
        //         }
        //         result.push(subresult/(subresult.length))
        // }
        // console.log(result)
        // var sub =[]
        // for(var i =0; i <= result.length - W2; i++) {
        //         sub += (result[i] + result[i+W2])/2
        
                
        }
        $.ajax({url: "/sketch", success: function(data) {console.log(data)}})

}

// function resample_hermite(myCanvas, W, H, W2, H2){
//         var time1 = Date.now();
//         W2 = Math.round(W2);
//         H2 = Math.round(H2);
//         var img = myCanvas.getContext("2d").getImageData(0, 0, W, H);
//         var img2 = myCanvas.getContext("2d").getImageData(0, 0, W2, H2);
//         var data = img.data;
//         var data2 = img2.data;
//         var ratio_w = W / W2;
//         var ratio_h = H / H2;
//         var ratio_w_half = Math.ceil(ratio_w/2);
//         var ratio_h_half = Math.ceil(ratio_h/2);
        
//         for(var j = 0; j < H2; j++){
//                 for(var i = 0; i < W2; i++){
//                         var x2 = (i + j*W2) * 4;
//                         var weight = 0;
//                         var weights = 0;
//                         var weights_alpha = 0;
//                         var gx_r = gx_g = gx_b = gx_a = 0;
//                         var center_y = (j + 0.5) * ratio_h;
//                         for(var yy = Math.floor(j * ratio_h); yy < (j + 1) * ratio_h; yy++){
//                                 var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
//                                 var center_x = (i + 0.5) * ratio_w;
//                                 var w0 = dy*dy //pre-calc part of w
//                                 for(var xx = Math.floor(i * ratio_w); xx < (i + 1) * ratio_w; xx++){
//                                         var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
//                                         var w = Math.sqrt(w0 + dx*dx);
//                                         if(w >= -1 && w <= 1){
//                                                 //hermite filter
//                                                 weight = 2 * w*w*w - 3*w*w + 1;
//                                                 if(weight > 0){
//                                                         dx = 4*(xx + yy*W);
//                                                         //alpha
//                                                         gx_a += weight * data[dx + 3];
//                                                         weights_alpha += weight;
//                                                         //colors
//                                                         if(data[dx + 3] < 255)
//                                                                 weight = weight * data[dx + 3] / 250;
//                                                         gx_r += weight * data[dx];
//                                                         gx_g += weight * data[dx + 1];
//                                                         gx_b += weight * data[dx + 2];
//                                                         weights += weight;
//                                                         }
//                                                 }
//                                         }               
//                                 }
//                         data2[x2]     = gx_r / weights;
//                         data2[x2 + 1] = gx_g / weights;
//                         data2[x2 + 2] = gx_b / weights;
//                         data2[x2 + 3] = gx_a / weights_alpha;
//                         }
//                 }
//     //     console.log("hermite = "+(Math.round(Date.now() - time1)/1000)+" s");
//     //     myCanvas.getContext("2d").clearRect(0, 0, Math.max(W, W2), Math.max(H, H2));
//     // myCanvas.width = W2;
//     // myCanvas.height = H2;
//     //     myCanvas.getContext("2d").putImageData(img2, 0, 0);
//     myCanvas.getContext("2d").clearRect(0,0,Math.max(W,W2),Math.max(H,H2));
//     myCanvas.width = W2;
//     myCanvas.height = H2;
//     myCanvas.getContext("2d").putImageData(img2, 0, 0);

// }