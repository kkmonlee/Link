/**
 * Created by aa on 10 December 2016.
 */

with (Math) {
    for (i in c) {
        c[i[x = m = n = k = 0] + (i[6] || '')] = c[i]
    }

    for (W = a.width,
        H = a.height,
        f = ['#F52616', '#9317A8', '#188FEC', '#4BCB50', '#FF8800'],
        d = min(W, H) / 7,
        L = W / 2 - d * 3 + d / 2,
        R = H / 2 - d * 3,
        g = [],
        h = [],
        onmousedown = function() {
            k = 1
        }; x < 6; x++) {
        for (y = 0; y < 6; y++) {
            g.push({
                o: f[random() * 5 | 0],
                Y: R + y * d,
                x: L + x * d,
                y: R + y * d,
                r: y,
                c: x
            })
        }
    }

    onmouseup = ontouchend = function() {
        // Ignore single colours being entered in score
        if (!h[1]) {
            h = []
        }

        for (i in h) {
            p = h[i];
            if (p.r >= 0) {
                m++;
                p.r -= n + 1;
                p.y = R + p.r * d;
                p.o = f[random() * 5 | 0]
            }
        }

        n = k = 0;
        h = []
    };

    onmousemove = ontouchmove = function (e) {
        // touch input
        if (e.pageX) {
            X = e.pageX;
            Y = e.pageY
        } else {
            X = e.touches[0].pageX;
            k = Y = e.touches[0].pageY
        }

        if (k) {
            for (i in g) {
                p = g[i];

                // Skip if dot is not on the same colour or is not next to it
                if (h[0] &&
                    (h[0].o != p.o |
                        abs(
                            abs(h[0].r - p.r) - abs(h[0].c - p.c)
                        ) != 1)) {
                    continue
                }

                if (
                    abs(X - p.x) < d / 2 &&
                        abs(Y - p.y) < d / 2
                ) {
                    if (!~h.indexOf(p)) {
                        h.unshift(p);
                        n = max(p.r, n)
                    } else if (h[1] == p) {
                        h.shift()
                    }
                }
            }
        }
    };

    setInterval(function() {
        // clear canvas
        c.ce(0, 0, W, H);
        c.lineWidth = d / 6;
        c.lineJoin = 'round';

        // physics
        for (i in g) {
            p = g[i];

            // if p doesn't have a neighbour below, push it down
            r = 0;
            for (j in g) {
                q = g[j];
                if (p.r + 1 == q.r && p.c == q.c) {
                    r = 1
                }
            }

            if (!r && p.r != 5) {
                p.r++;
                p.Y = R + p.r * d
            }

            // animation for p to push down
            if (p.y != p.Y) {
                D = p.y > p.Y ? -1 : 1;
                p.y += p.T * D;
                p.T *= p.s && !p.t ? 0.5 : 1.5;

                if (~D && p.y >= p.Y) {
                    p.y = p.Y
                } else if (!~D && p.y <= p.Y) {
                    p.y = p.Y
                }

                if (!p.s && !p.t && p.y == p.Y) {
                    p.s = 1;
                    p.Y -= d / 3;
                    p.T = d / 5
                } else if (p.s && !p.t && p.y == p.Y) {
                    p.t = 1;
                    p.T = d / 15;
                    p.Y += d / 3
                }
            } else {
                p.T = d / 15;
                p.t = p.s = 0
            }

            // paint canvas
            c.strokeStyle = p.o;
            if (~h.indexOf(p)) {
                c.sR(p.x - d / 3, p.y - d / 3, d / 1.5, d / 1.5)
            }
            c.sR(p.x - d / 4, p.y - d / 4, d / 2, d / 2)
        }

        // m
        c.font = d / 3 + 'px s';
        c.fx('Z ' + m, L, R + d * 6);

        // draw selection lines
        if (h[0]) {
            c.strokeStyle = h[0].o;
            c.ba();
            c.m(X, Y);
            for (i in h) {
                p = h[i];
                c.l(p.x, p.y)
            }
            c.s()
        }
    }, 33)
}


/**
 * TODO: make render function with dots.length
 * TODO: make mouseDown/mouseUp functions
 * TODO: make function to check the nearby color
 * TODO: make function to join the dots up
 * TODO: think that should be it for the core framework
 */
