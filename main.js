const point = (x, y) => {
    x,
        y
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

function createZeroMatrix(size) {
    return new Array(size).fill(0).map(row => new Array(size).fill(0));
}

function defineNewtonPoly(points) {
    const n = points.length;
    const matrix = createZeroMatrix(n) //для разделенных разностей
    let vectX, vectY = [];
    points.forEach(point => {
        vectX.push(point.x);
        vectY.push(point.y);
    });
    for (let i = 0; i < n; i++) {
        matrix[i][0] = (vectY[i + 1] - vectY[i]) / (vectX[i + 1] - vectX[i])
        for (let j = 1; j < i + 1; j++) {
            //не уверена насчет i + 1 - это чтобы матрица получилась треугольная
            matrix[i][j] = (matrix[i][j - 1] - matrix[i + 1][j - 1]) / (vectX[i] - vectX[0])
        }
    }
    //тут я поняла, что у нас равноотстоящие узлы...
    //но не стала переделывать

    let newtonPoly = vectY[0];
    for(let i = 0; i < n; i++) {
        let member = matrix[0][i];
        for (let j = 1; j < i + 1; j++) {
            //member *= (x - vectX[i])
            //прописать умножение многочленов
        }
        newtonPoly += member;
        //member = 0;
    }

}