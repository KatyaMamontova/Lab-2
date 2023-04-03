class ParabolicSpline extends Method {
    constructor(points) {
        super(points);
        //проверить сплайн
        /* const points = [
            point(1, 2),
            point(2, 3),
            point(3, 5),
            point(4, 3),
            point(5, 4),
            point(6, 6)
        ] */
        //console.log('ParabolicSpline ', points)
        console.log('ParabolicSpline, this.vectX ', this.vectX)
    }

    defineParabolicSpline(x) {
        console.log('defineParabolicSpline ', this.vectX)
        let vectX = this.vectX;
        let vectY = this.vectY;
        let a, b, c;
        a = [];
        b = [];
        c = [];
        b[0] = 0;

        //TODO а нельзя эти циклы объединить?
        for (let i = 0; i < this.n - 1; i++) {
            c[i] = this.vectY[i];
            b[i + 1] = 2 * (vectY[i + 1] - vectY[i]) / (vectX[i + 1] - vectX[i]) - b[i];
            a[i] = (b[i + 1] - b[i]) / (2 * (vectX[i + 1] - vectX[i]));
        }

        for (let i = 0; i < this.n - 1; i++) {
            if (x > vectX[i] && x < vectX[i + 1]) {
                return a[i] * Math.pow((x - vectX[i]), 2) + b[i] * (x - vectX[i]) + c[i];
            }
        }
    }
}
