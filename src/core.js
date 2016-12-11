var canvas;
/**
 * Created by aa on 10 December 2016.
 */

context = c;
W = a.width;
H = a.height;
dotSize = Math.min(W, H) / 7;
xs = W / 2 - dotSize * 3 + dotSize / 2;
ys = H / 2 - dotSize * 3;

colors = ['#F52616', '#9317A8', '#188FEC', '#4BCB50', '#FF8800'];

selected = [];
isSelecting = false;;
mouseX = 0;
mouseY = 0;
squareColor = null;

score = 0;
var time = 60;

setInterval(function () {
    time -= 1;
    time = Math.max(time, 0);

    if (time == 0) {
        selected = [];
        isSelecting = false;
        squareColor = null
    }
}, 1000);

choice = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

dots = [];
var color;
for (var x = 0; x < 6; x++) {
    for (var y = 0; y < 6; y++) {
        color = choice(colors);
        dots.push({
            color: color,
            ty: ys + y * dotSize,
            x: xs + x * dotSize,
            y: ys + y * dotSize,
            r: y,
            c: x
        })
    }
}

render = function () {
    context.clearRect(0, 0, W, H);

    for (var i = dots.length - 1; i >= 0; i--) {
        var a = dots[i];
        var hasBelow = false;

        for (var j = 0; j < dots.length; j++) {
            var b = dots[j];
            if (isBelow(a, b)) {
                hasBelow = true;
                break;
            }
        }
        if (!hasBelow && a.r != 5) {
            a.r += 1;
            a.ty = ys + a.r * dotSize;
        }

        if (a.y != a.ty) {
            dir = a.y > a.ty ? -1 : 1;
            a.y += a.tt * dir;
            a.tt *= a.bdown && !a.bup ? 0.5 : 1.5;

            if (dir == 1 && a.y > a.ty) {
                a.y = a.ty;
            } else if (dir == -1 && a.y <= a.ty) {
                a.y = a.ty;
                if (a.bdown) {
                    a.bdown = true;
                }
            }

            if (!a.bdown && !a.bup && a.y == a.ty) {
                a.bdown = true;
                a.ty -= dotSize / 3;
                a.tt = dotSize / 5;
            } else if (a.bdown && !a.bup && a.y == a.ty) {
                a.bup = true;
                a.tt = dotSize / 15;
                a.ty += dotSize / 3;
            }
        } else {
            a.tt = dotSize / 15;
            a.bdown = false;
            a.bup = false;
        }
    }

    for (var i = 0; i < dots.length; i++) {
        dot = dots[i];
        if (contains(selected, dot) || dot.color == squareColor) {
            context.fillStyle = dot.color
            context.fillRect(dot.x - dotSize / 3, dot.y - dotSize / 3, dotSize / 1.5, dotSize / 1.5);
        }

        context.fillStyle = dot.color;
        context.fillRect(dot.x - dotSize / 4, dot.y - dotSize / 4, dotSize / 2, dotSize / 2);
    }

    if (selected.length && isSelecting) {
        context.strokeStyle = selected[0].color;
        context.lineJoin = 'round';
        context.lineWidth = dotSize / 6;
        context.beginPath();

        context.moveTo(mouseX, mouseY);

        for (var i = 0; i < selected.length; i++) {
            var dot = selected[i];
            context.lineTo(dot.x, dot.y);
        }
        context.stroke();
    }

    context.font = dotSize / 3 + 'px sans'
    context.fillStyle = '#000';
    context.fillText('Score: ' + score, xs + dotSize * 3, ys + dotSize * 6);
    context.fillText('Time: ' + time, xs, ys + dotSize * 6);

};

isBelow = function (a, b) {
    return a.r + 1 == b.r && a.c == b.c;
};

collideDot = function (x, y, dot) {
    return x > dot.x - dotSize / 2 &&
            x < dot.x + dotSize / 2 &&
            y > dot.y - dotSize / 2 &&
            y < dot.y + dotSize / 2;
};

contains = function (arr, x) {
    return arr.indexOf(x) != -1;
};

isNeighbour = function (a, b) {
    return a.r + 1 == b.r && a.c == b.c ||
            a.r - 1 == b.r && a.c == b.c ||
            a.c + 1 == b.c && a.r == b.r ||
            a.c - 1 == b.c && a.r == b.r;
};

window.onMouseDown = window.onTouchStart = function (e) {
    if (time == 0) return;
    isSelecting = true;
};

window.onMouseUp = window.onTouchEnd = function (e) {
    isSelecting = false;
    if (selected.length < 2) {
        return selected = [];
    }

    if (squareColor) {
        for (var i = 0; i < dots.length; i++) {
            var dot = dots[i];
            if (dot.color == squareColor) {
                selected.push(dot);
            }
        }
    }

    var highestRow = 0;
    for (var i = 0; i < selected.length; i++) {
        var dot = selected[i];
        highestRow = Math.max(dot.r, highestRow);
    }

    for (var i = 0; i < selected.length; i++) {
        var dot = selected[i];
        do {
            var color = choice(colors);
        } while (color == squareColor);

        if (dot.r >= 0) {
            score += 1;
            dot.r -= highestRow + 1;
            dot.y = ys + dot.r * dotSize;
            dot.ty = ys + dot.r * dotSize;
            dot.color = color;
        }
    }

    squareColor = null;
    selected = [];
};

window.onMouseMove = window.onTouchMove = function (e) {
    if (e.clientX) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    } else {
        var t = e.changedTouches;
        mouseX = t[0].pageX;
        mouseY = t[0].pageY;
        isSelecting = true;
    }

    if (isSelecting && time != 0) {
        for (var i = 0; i < dots.length; i++) {
            var dot = dots[i];
            var notSame = selected.length && selected[0].color != dot.color;

            if (notSame || selected.length && !isNeighbour(dot, selected[0])) {
                continue;
            }

            if (collideDot(mouseX, mouseY, dot)) {
                if (!contains(selected, dot)) {
                    selected.unshift(dot);
                } else if (selected[1] == dot) {
                    selected.shift();
                } else {
                    selected.unshift(dot);
                    squareColor = dot.color;
                }
            }
        }
    }
};

setInterval(render, 33);

/**
 * TODO: make render function with dots.length
 * TODO: make mouseDown/mouseUp functions
 * TODO: make function to check the nearby color
 * TODO: make function to join the dots up
 * TODO: think that should be it for the core framework
 */
