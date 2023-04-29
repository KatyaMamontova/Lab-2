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

    const WINDOW = {
        LEFT: -1,
        BOTTOM: -5,
        WIDTH: 4,
        HEIGHT: 40
    }

    const parabolicSpline = new ParabolicSpline(points);
    const newtonPoly = new NewtonPolynom(points);
    const rmsFitFunc = new BestRmsFitFunction(points);

    {
        const graph = new Graph(WINDOW);

        graph.clear();
        graph.printOXY();
        points.forEach(point => graph.point(point.x, point.y))

        const defineYbyNewtonPoly = newtonPoly.defineYbyNewtonPoly.bind(newtonPoly);
        graph.printFunction(defineYbyNewtonPoly, 'grey');

        const defineParabolicSpline = parabolicSpline.defineParabolicSpline.bind(parabolicSpline);
        graph.printFunction(defineParabolicSpline);

        const defineBestRmsFitFunc = rmsFitFunc.defineBestRmsFitFunc.bind(rmsFitFunc);
        graph.printFunction(defineBestRmsFitFunc, 'orange');
    }

    {
        const table = document.querySelector('table');
        let strX = points.reduce((str, point) => str + `<td>${point.x}</td>`, '')
        let strY = points.reduce((str, point) => str + `<td>${Math.round(point.y * 100) / 100}</td>`, '')
        document.getElementById('pointsOutput').appendChild(table);
        document.getElementById('coordX').innerHTML += strX
        document.getElementById('coordY').innerHTML += strY
        document.querySelectorAll('td').forEach(elem => {
            elem.style.border = '1px solid'
        })
    }

    document.getElementById('newtonPolyOutput').innerHTML += newtonPoly.polynomInStr();

    document.getElementById('getY').addEventListener('click', () => {
        let x = document.getElementById('xInput').value - 0;
        document.getElementById('yOutput').innerHTML = newtonPoly.defineYbyNewtonPoly(x);
    })
}