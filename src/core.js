/**
 * Created by aa on 10 December 2016.
 */

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context = canvas.getContext('2d');

dotSize = Math.min(canvas.width, canvas.height) / 7;
xs = canvas.width / 2 - dotSize * 3 + dotSize / 2;
ys = canvas.height / 2 - dotSize * 3;

colours = ['#F52616', '#9317A8', '#188FEC', '#4BCB50', '#FF8800'];

selected = [];
isSelecting = false;;
mouseX = 0;
mouseY = 0;
squareColour = null;

score = 0;
time = 60;

setInterval(function () {
    time -= 1;
    time = Math.max(time, 0);

    if (time == 0) {
        selected = [];
        isSelecting = false;
        squareColour = null
    }
}, 1000);

choice = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

dots = [];
var colour;
for (var x = 0; x < 6; x++) {
    for (var y = 0; y < 6; y++) {
        colour = choice(colours);
        dots.push({
            colour: colour,
            ty: ys + y * dotSize,
            x: xs + x * dotSize,
            y: ys + y * dotSize,
            r: y,
            c: x
        })
    }
}

/**
 * TODO: make render function with dots.length
 * TODO: make mouseDown/mouseUp functions
 * TODO: make function to check the nearby colour
 * TODO: make function to join the dots up
 * TODO: think that should be it for the core framework
 */
