var id = setInterval(draw, 1);
var pos = 0;

function draw() {
    var canvas = document.getElementById("drawing");

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(0, 50);
        if (pos <= 600) {
            ctx.lineTo(pos++, 50);
        }

        ctx.stroke();
    }
}
