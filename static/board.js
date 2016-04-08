 // Dora Jambor
 // March 2016
 //JS file for neural sketch board

 window.onload = function() {
        $("#accuracyY").hide();
        $("#accuracyN").hide();
        $("#show_more").hide();
        $(".color_outputs").hide();
        var myCanvas = document.getElementById("myCanvas");
        if(myCanvas){
                var isDown = false;
                var ctx = myCanvas.getContext("2d");
                var canvasX, canvasY;
                ctx.lineWidth = 35;

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
// resets canvas
function clearcanvas() {
    var myCanvas = document.getElementById('myCanvas'),
        ctx = myCanvas.getContext("2d");
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        $("#accuracyY").hide();
        $("#accuracyN").hide();
        document.getElementById("result").innerHTML = '';
        $("#show_more").hide()
        $(".color_outputs").hide();
        i = 0
}

// Sends pixel data to server for the NN
function send() {
        $("#accuracyY").show();
        $("#accuracyN").show();
        document.getElementById("show_more").innerHTML = "";
        i = 0
        $(".color_outputs").hide();
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
                        var res = data.split(",");
                        var adjust1 = [res[0][1]];
                        var adjust2 = [res[9][1]];
                        res = res.slice(1,-1);
                        res = adjust1.concat(res, adjust2)
                        for(var j =0; j < res.length; j++) {
                                res[j] = parseInt(res[j]);
                        }
                document.getElementById("result").innerHTML = res[0];
                document.getElementById("output10").innerHTML = res[0];
                document.getElementById("output9").innerHTML = res[1];
                document.getElementById("output8").innerHTML = res[2];
                document.getElementById("output7").innerHTML = res[3];
                document.getElementById("output6").innerHTML = res[4];
                document.getElementById("output5").innerHTML = res[5];
                document.getElementById("output4").innerHTML = res[6];
                document.getElementById("output3").innerHTML = res[7];
                document.getElementById("output2").innerHTML = res[8];
                document.getElementById("output1").innerHTML = res[9];
                }
        });
}

function feedback() {
        var dummy = '<input type="text" placeholder="?">\r\n';
        document.getElementById("result").innerHTML = dummy;
        document.getElementById("show_more").innerHTML = "send";
        $("#show_more").show();
}
var i = 0
function send_feedback() {
        document.getElementById("show_more").innerHTML = "show guesses";
        i += 1
        if(i%2==0) {
                $(".color_outputs").show();
        }
        
}


