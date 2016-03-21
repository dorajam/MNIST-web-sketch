 window.onload = function() {
        var myCanvas = document.getElementById("myCanvas");
        var isDown = false;
        var ctx = myCanvas.getContext("2d");
        var canvasX, canvasY;
        if(myCanvas){
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
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
                console.log(ctx.getImageData(50, 50, 100, 100).data);
        }