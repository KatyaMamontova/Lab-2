class NewtonPolynom extends Method {

    //TODO я не уверена, как прописывать
    //конструктор с параметрами для наследуемых классов
    constructor(points) {
        super(points);
        //проверить многочлен
        /* const points = [
            point(1, 2),
            point(2, -1),
            point(4, -2),
            point(6, -6),
        ]
         */
    }

    defineDividedDifferences() {

        const matrix = this.matrMaths.createZeroMatrix(this.n)
        for (let i = 0; i < this.n; i++) {               //столбец
            for (let j = 0; j < this.n - i; j++) {       //строка
                if (i === 0) {
                    matrix[j][i] = this.vectY[j]
                } else {
                    matrix[j][i] = (matrix[j + 1][i - 1] - matrix[j][i - 1]) / (this.vectX[i + j] - this.vectX[j])
                }
            }
        }

        return matrix;
        //тут я поняла, что у нас равноотстоящие узлы...
        //но не стала переделывать
    }

    defineYbyNewtonPoly(x) {
        let divDiffMatrix = this.defineDividedDifferences(this.points)
        let xPolies = x - this.vectX[0];
        let y = this.vectY[0];
        for (let i = 1; i < this.n; i++) {
            y += divDiffMatrix[0][i] * xPolies
            xPolies *= x - this.vectX[i]
        }
        return y;
    }
}