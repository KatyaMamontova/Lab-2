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
            /* matrix[j][i] = num;
            num++ */
        }
    }
    //console.log(`${matrix[0]}\n${matrix[1]}\n${matrix[2]}\n${matrix[3]}`)

    return matrix;
    //тут я поняла, что у нас равноотстоящие узлы...
    //но не стала переделывать
}

function mult(a, b) {
    const calc = new UniversalCalculator;
    const members = [];
    if (a.poly.length < b.poly.length) {
        let glass = a;
        a = b;
        b = glass;
    }
    a.poly.forEach(elemA => {
        b.poly.forEach(elemB => {
            members.push(new Member(calc.mult(elemA.value, elemB.value), calc.add(elemA.power, elemB.power)));
        });
    });
    //приведение подобных слагаемых:
    const members2 = [];
    for (let j = members[0].power; j > -1; j--) {
        let power = [];         //коэффициенты подобных слагаемых
        for (let i = 0; i < members.length; i++) {
            if (members[i].power === j) {
                power.push(members[i].value);
            }
        }
        members2.push(new Member(power.reduce((sum, current) => sum + current, 0), j));
    }
    return new Polynomial(members2);
}

function defineNewtonPoly() {

    let divDiffMatrix = defineDividedDifferences(points)
    let xPolies = `(x - ${vectX[0]})`;
    //let xPolies = ``;
    let newtonPoly = `${vectY[0]}`;
    for (let i = 1; i < n; i++) {
        newtonPoly += ` + ${divDiffMatrix[0][i]}*${xPolies}`
        xPolies += `*(x-${vectX[i]})`
    }
    return newtonPoly;
    console.log(newtonPoly)
}

function defineYbyNewtonPoly(x) {
    return eval(defineNewtonPoly()) 
}

    console.log(defineNewtonPoly())
    console.log(defineYbyNewtonPoly(2))

