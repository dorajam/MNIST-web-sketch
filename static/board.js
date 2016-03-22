 // Dora Jambor
 // March 2016
 //JS file for sketch board

 window.onload = function() {
        var myCanvas = document.getElementById("myCanvas");
        if(myCanvas){
                var isDown = false;
                var ctx = myCanvas.getContext("2d");
                var canvasX, canvasY;
                ctx.lineWidth = 40;

                // draw on canvas
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
                                ctx.strokeStyle = "#000000";
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
        var res = []
        // console.log(input_data)
        for(var i = 0; i < input_data.length; i = i+4) {
                // convert RGBA to grey scale -> single value (0 0 0 255 is black and 0 0 0 0 is white)
                res  = 0.21*input_data[i] + 0.72*input_data[i+1] + 0.07*input_data[i+2]
                // if opacity is large it's black -> should return num close to 1 (to fire)
                if (input_data[i+3] > 200) {
                        res = 230.0
                }
                // res = 255 - res

                // scale to [0,1]
                res/= 255.0
                pixels.push(res)
                }

        $.ajax({
                method: "POST",
                url: "/sketch",
                processData: false,
                contentType: "application/json",
                data: JSON.stringify(pixels),
                success: function(data) {
                document.getElementById("result").innerHTML = data;
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