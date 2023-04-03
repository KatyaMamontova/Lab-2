const point = (x, y) => {
    return { x, y }
}

let m = 10;
let k = 9;
let N = 28;

const points = [
    point(0.1, 0.2 * N),
    point(0.2, 0.3 * m),
    point(0.3, 0.5 * k),
    point(0.4, 0.6 * N),
    point(0.5, 0.7 * m),
    point(0.6, k),
    point(0.7, 0.8 * N),
    point(0.8, 1.2 * k),
    point(0.9, 1.3 * m),
    point(1.0, N),
]

//проверить среднеквадратичное приближение
/* const points = [
    point(-1, Math.exp(-1)),
    point(-0.5, Math.exp(-0.5)),
    point(0, Math.exp(0)),
    point(0.5, Math.exp(0.5)),
    point(1, Math.exp(1))
] */

const parabolicSpline = new ParabolicSpline(points)
const newtonPoly = new NewtonPolynom(points)
//const rmsFitFunc = new BestRmsFitFunction(points, (x, i) => Math.pow(x, i), 3)
const rmsFitFunc = new BestRmsFitFunction(points)

//вывод графика 
//TODO в отдельный класс?
const WINDOW = {
    LEFT: -2,
    BOTTOM: -10,
    WIDTH: 4,
    HEIGHT: 40
}

window.onload = () => {
    const canvas = document.createElement('canvas');
    document.querySelector('body').appendChild(canvas);

    canvas.width = 600;
    canvas.height = 600;
    context = canvas.getContext('2d');


    const xs = x => (x - WINDOW.LEFT) / WINDOW.WIDTH * canvas.width
    const ys = y => (canvas.height - (y - WINDOW.BOTTOM) / WINDOW.HEIGHT * canvas.height)

    function clear() {
        context.fillStyle = 'rgb(252, 252, 252)';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function line(x1, y1, x2, y2, color = 'black') {
        context.beginPath();
        this.context.strokeStyle = color;
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.stroke();
    }

    function text(x, y, text) {
        context.strokeStyle = 'grey';
        //context.lineWidth = 1;
        context.font = '11px Courier';
        context.strokeText(text, xs(x), ys(y));
    }


    function printOXY() {
        const x = WINDOW.LEFT;
        const y = WINDOW.BOTTOM;
        for (let i = 0; i < x + WINDOW.WIDTH; i++) {
            line(i, y + WINDOW.HEIGHT, i, y, 'gainsboro', 1);
            text(i + 0.01, 0.3, i);
        }
        for (let i = -1; i > x; i -= 1) {
            line(i, y + WINDOW.HEIGHT, i, y, 'gainsboro', 1);
            text(i, 0.3, i);
        }
        for (let i = 1; i < y + WINDOW.HEIGHT; i++) {
            line(x, i, x + WINDOW.WIDTH, i, 'gainsboro', 1);
            text(0.02, i + 0.1, i);
        }
        for (let i = -1; i > y; i -= 1) {
            line(x, i, x + WINDOW.WIDTH, i, 'gainsboro', 1);
            text(0.02, i + 0.1, i);
        }

        line(0, 0, 0, y + WINDOW.HEIGHT, 'black', 1);    //ось у
        line(0, y, 0, 0, 'black', 1);
        line(0, 0, x + WINDOW.WIDTH, 0, 'black', 1);     //ось х
        line(x, 0, 0, 0, 'black', 1);
    }

    function printFunction(f, x1 = WINDOW.LEFT, x2 = WINDOW.LEFT + WINDOW.WIDTH) {
        const dx = WINDOW.WIDTH / 300;
        if (x1 > x2) {
            const t = x1;
            x1 = x2;
            x2 = t;
        }
        while (x1 < x2) {
            line(x1, f(x1), x1 + dx, f(x1 + dx));
            x1 += dx;
        }
    }

    clear();
    printOXY();
    //TODO не работает:
    //printFunction(parabolicSpline.defineParabolicSpline);

    //console.log(newtonPoly.defineYbyNewtonPoly(0.3))
}