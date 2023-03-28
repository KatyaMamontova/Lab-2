//////////////////////////
//функция наилучшего
//среднеквадратичного
//приближения

//проверить среднеквадратичное приближение
const points = [
    point(-1, Math.exp(points[0].x)),
    point(-0.5, Math.exp(points[1].x)),
    point(0, Math.exp(points[2].x)),
    point(0.5, Math.exp(points[3].x)),
    point(1, Math.exp(points[4].x))
]

let m = 10;
let k = 9;
let N = 28;

/* const points = [
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
] */

const n = points.length;
const vectX = [];
const vectY = [];
points.forEach(point => {
    vectX.push(point.x);
    vectY.push(point.y);
});

function createZeroVector(size) {
    return new Array(size).fill(0);
}

function createZeroMatrix(size) {
    return createZeroVector(size).map(row => createZeroVector(size));
}

//const phi1 = x => 1 - x;
const phi = (x, i) => Math.pow(x, i) * (1 - x);
let len = 5;

function calculateProximityMeasure(phi) {
    let S = 0;
    for (let i = 0; i < len; i++) {
        //не уверена насчет i
        S += Math.pow(phi(vectX[i], i) - vectY[i])
    }
    return S;
}

function calculateCoefs(phi) {
    //const PHI = createZeroMatrix(len);
    const C = createZeroMatrix(len);
    for (let k = 0; k < len; k++) {               //столбец
        for (let l = 0; l < len - k; l++) {       //строка
            // matrix[l][k] = phi(x, k) * phi(x, l)
            for (let i = 0; i < n; i++) {
                C[l][k] += phi(vectX[i], k) * phi(vectX[i], l)
            }
        }
    }
    const b = [];
    for (let k = 0; k < len; k++) {
        for (let i = 0; i < n; i++) {
            b[k] += phi(vectX[i], k) * vectY[i]
        }
    }
    //теперб нужно решить систему....
}