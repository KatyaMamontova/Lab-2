window.onload = () => {

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

    //проверить многочлен
   /*  const points = [
        point(1, 2),
        point(2, -1),
        point(4, -2),
        point(6, -6),
    ] */    

    //проверить сплайн
    /* const points = [
        point(1, 2),
        point(2, 3),
        point(3, 5),
        point(4, 3),
        point(5, 4),
        point(6, 6)
    ] */

    //проверить среднеквадратичное приближение
    /* const points = [
        point(-1, Math.exp(-1)),
        point(-0.5, Math.exp(-0.5)),
        point(0, Math.exp(0)),
        point(0.5, Math.exp(0.5)),
        point(1, Math.exp(1))
    ] */

    const WINDOW = {
        LEFT: -1,
        BOTTOM: -10,
        WIDTH: 4,
        HEIGHT: 40
    }
    
    const parabolicSpline = new ParabolicSpline(points);
    const newtonPoly = new NewtonPolynom(points);
    //const rmsFitFunc = new BestRmsFitFunction(points, (x, i) => Math.pow(x, i), 3)
    const rmsFitFunc = new BestRmsFitFunction(points);
    const graph = new Graph(WINDOW);

    graph.clear();
    graph.printOXY();

    const defineParabolicSpline = parabolicSpline.defineParabolicSpline.bind(parabolicSpline);
    graph.printFunction(defineParabolicSpline);

    const defineBestRmsFitFunc = rmsFitFunc.defineBestRmsFitFunc.bind(rmsFitFunc);
    graph.printFunction(defineBestRmsFitFunc, 'blue');

    //console.log(newtonPoly.defineYbyNewtonPoly(0.3))
}