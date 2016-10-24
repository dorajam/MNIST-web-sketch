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

