class Method {

    constructor(points = []) {

        this.vectMaths = new VectorOperations();
        this.matrMaths = new MatrixOperations();
        //this.round = num => Math.round(num * 100) / 100;

        this.points = points;
        this.vectX = [];
        this.vectY = [];

        this.points.forEach(point => {
            this.vectX.push(point.x);
            this.vectY.push(point.y);
        });

        this.n = points.length;
        /* console.log('Method ', points)
        console.log('Method ', this.vectX) */
    }

    /* setVectorsXY(points) {
        points.forEach(point => {
            this.vectX.push(point.x);
            this.vectY.push(point.y);
        });
    } */

}