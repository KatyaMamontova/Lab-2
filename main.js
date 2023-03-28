const point = (x, y) => {
    return { x, y }
}
//зочем...

//проверить многочлен
/* const points = [
    point(1, 2),
    point(2, -1),
    point(4, -2),
    point(6, -6),
]
 */

//проверить сплайн
/* const points = [
    point(1, 2),
    point(2, 3),
    point(3, 5),
    point(4, 3),
    point(5, 4),
    point(6, 6)
] */


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

const round = num => Math.round(num * 100) / 100;

/* function createZeroMatrix(size) {
    return new Array(size).fill(0).map(row => new Array(size).fill(0));
} */

function createZeroVector(size) {
    return new Array(size).fill(0);
}

function createZeroMatrix(size) {
    return createZeroVector(size).map(row => createZeroVector(size));
}


const n = points.length;
const vectX = [];
const vectY = [];
points.forEach(point => {
    vectX.push(point.x);
    vectY.push(point.y);
});

function defineDividedDifferences(points) {

    const matrix = createZeroMatrix(n)
    for (let i = 0; i < n; i++) {               //столбец
        for (let j = 0; j < n - i; j++) {       //строка
            if (i === 0) {
                matrix[j][i] = vectY[j]
            } else {
                matrix[j][i] = (matrix[j + 1][i - 1] - matrix[j][i - 1]) / (vectX[i + j] - vectX[j])
            }
        }
    }

    return matrix;
    //тут я поняла, что у нас равноотстоящие узлы...
    //но не стала переделывать
}

function defineYbyNewtonPoly(x) {
    let divDiffMatrix = defineDividedDifferences(points)
    let xPolies = x - vectX[0];
    let y = vectY[0];
    for (let i = 1; i < n; i++) {
        y += divDiffMatrix[0][i] * xPolies
        xPolies *= x - vectX[i]
    }
    return y;
}

console.log(defineYbyNewtonPoly(0.3))
console.log(points[2])

///////////////////////
//параболический сплайн

//матеша

function defineParabolicSpline(x) {
    let a, b, c;
    a = [];
    b = [];
    c = [];
    b[0] = 0;

    for (let i = 0; i < n - 1; i++) {
        c[i] = vectY[i];
        b[i + 1] = 2 * (vectY[i + 1] - vectY[i]) / (vectX[i + 1] - vectX[i]) - b[i];
        a[i] = (b[i + 1] - b[i]) / (2 * (vectX[i + 1] - vectX[i]));
    }

    for (let i = 0; i < n - 1; i++) {
        if (x > vectX[i] && x < vectX[i + 1]) {
            return a[i] * Math.pow((x - vectX[i]), 2) + b[i] * (x - vectX[i]) + c[i];
        }
    }
}

//вывод графика
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
    printFunction(defineParabolicSpline);
}