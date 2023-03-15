const point = (x, y) => {
    return { x, y }
}
//зочем...

const points = [
    point(1, 2),
    point(2, -1),
    point(4, -2),
    point(6, -6),
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

function createZeroMatrix(size) {
    return new Array(size).fill(0).map(row => new Array(size).fill(0));
}

function defineNewtonPoly(points) {
    const n = points.length - 1;
    const matrix = createZeroMatrix(n) //для разделенных разностей
    let vectX = [];
    let vectY = [];
    points.forEach(point => {
        vectX.push(point.x);
        vectY.push(point.y);
    });
    for (let i = 0; i < n; i++) {
        matrix[i][0] = (vectY[i + 1] - vectY[i]) / (vectX[i + 1] - vectX[i])
    }
    let num = 0;
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < n - i; j++) {
            // matrix[j][i] = num;
            // num++
            matrix[j][i] = (matrix[j + 1][i - 1] -  matrix[j][i - 1]) /  (vectX[i] - vectX[j])
            console.log(`(${matrix[j + 1][i - 1]}-${matrix[j][i - 1]})/(${vectX[i]}-${vectX[j]})`)
            console.log(matrix)

        }
    }
    // for (let i = 0; i < n; i++) {
    //     //matrix[i][0] = (vectY[i + 1] - vectY[i]) / (vectX[i + 1] - vectX[i])
    //     for (let j = 1; j < n - i - 1; j++) {
    //         matrix[i][j] = (matrix[i + 1][j - 1] - matrix[i][j - 1]) / (vectX[i + 2] - vectX[i])
    //         console.log(vectX)
    //         console.log(`(${matrix[i + 1][j - 1]}-${matrix[i][j - 1]})/(${vectX[i + 2]}-${vectX[i]})`)
    //         console.log(matrix)
    //     }
    // }
    console.log(matrix)
    //тут я поняла, что у нас равноотстоящие узлы...
    //но не стала переделывать

    let newtonPoly = vectY[0];
    for (let i = 0; i < n; i++) {
        let member = matrix[0][i];
        for (let j = 1; j < i + 1; j++) {
            //member *= (x - vectX[i])
            //прописать умножение многочленов
        }
        newtonPoly += member;
        //member = 0;
    }

}

defineNewtonPoly(points)