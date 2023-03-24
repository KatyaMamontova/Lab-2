const point = (x, y) => {
    return { x, y }
}
//зочем...

/* const points = [
    point(1, 2),
    point(2, -1),
    point(4, -2),
    point(6, -6),
]
 */
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

function createZeroMatrix(size) {
    return new Array(size).fill(0).map(row => new Array(size).fill(0));
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
    let num = 1;
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

//console.log(defineNewtonPoly())
console.log(defineYbyNewtonPoly(0.3))
console.log(points[2])
