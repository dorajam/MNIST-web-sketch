 // Dora Jambor
 // March 2016
 //JS file for sketch board

 window.onload = function() {
        var myCanvas = document.getElementById("myCanvas");
        if(myCanvas){
                var isDown = false;
                var ctx = myCanvas.getContext("2d");
                var canvasX, canvasY;
                // for creating a manipulated canvax inside, use:
                // ctx.fillStyle = 'white';
                // ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
                ctx.lineWidth = 10;

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
        input_data = ctx.getImageData(0, 0, 400, 400).data
        var pixels = []
        for(var i = 0; i < input_data.length; i=i+4) {
                pixels.push(input_data[i])
        }
        console.log(pixels.length)
        // var W = H = 400;
        // var W2 = H2 = 28;
        // var batchW = Math.floor(W/W2);
        // var batchH = Math.floor(H/H2);
        // var result = []
        // var subresult = 0;
        // for(var j = 0; j < H*W; j = j+batchW) {
        //         for(var i = 0; i < W; i = i +batchW) {
        //                 for(var jj = j; jj < j + batchH; j++) {
        //                         for(var ii =i; ii < i + batchW; i++) {
        //                                 subresult += pixels[ii]
        //                         }
        //                 }
        //                 var avr = subresult / ((jj + 1)(ii + 1))
        //                 result.push()
        //         }
        // }
                
        // }
        $.ajax({
                method: "POST",
                url: "/sketch",
                processData: false,
                contentType: "application/json",
                data: JSON.stringify(pixels),
                success: function(data) {
                console.log(data)
                }
        });


        // processData: false,
        // url: "/sketch",
        // success: function(data) {
        //     console.log(data)
        // },
        // 'type':'POST',
        // 'data': $.pos.input_data
        // });

}