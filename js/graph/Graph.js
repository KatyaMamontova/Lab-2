class Graph {
    constructor(WINDOW, width = 600, height = 600) {

        this.WINDOW = WINDOW ? WINDOW : {
            LEFT: -5,
            BOTTOM: -5,
            WIDTH: 10,
            HEIGHT: 10
        }

        this.canvas = document.createElement('canvas');
        document.querySelector('body').appendChild(this.canvas);

        this.canvas.width = width? width : 600;
        this.canvas.height = height? height : 600;
        this.context = this.canvas.getContext('2d');
    }

    xs = x => (x - this.WINDOW.LEFT) / this.WINDOW.WIDTH * this.canvas.width
    ys = y => (this.canvas.height - (y - this.WINDOW.BOTTOM) / this.WINDOW.HEIGHT * this.canvas.height)

    clear() {
        this.context.fillStyle = 'rgb(252, 252, 252)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(x1, y1, x2, y2, color) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
    }

    text(x, y, text) {
        this.context.strokeStyle = 'grey';
        this.context.font = '11px Courier';
        this.context.strokeText(text, this.xs(x), this.ys(y));
    }

    printOXY() {
        const x = this.WINDOW.LEFT;
        const y = this.WINDOW.BOTTOM;
        for (let i = 0; i < x + this.WINDOW.WIDTH; i++) {
            this.line(i, y + this.WINDOW.HEIGHT, i, y, 'gainsboro', 1);
            this.text(i + 0.01, 0.3, i);
        }
        for (let i = -1; i > x; i -= 1) {
            this.line(i, y + this.WINDOW.HEIGHT, i, y, 'gainsboro', 1);
            this.text(i, 0.3, i);
        }
        for (let i = 1; i < y + this.WINDOW.HEIGHT; i++) {
            this.line(x, i, x + this.WINDOW.WIDTH, i, 'gainsboro', 1);
            this.text(0.02, i + 0.1, i);
        }
        for (let i = -1; i > y; i -= 1) {
            this.line(x, i, x + this.WINDOW.WIDTH, i, 'gainsboro', 1);
            this.text(0.02, i + 0.1, i);
        }

        this.line(0, 0, 0, y + this.WINDOW.HEIGHT, 'black', 1);    //ось у
        this.line(0, y, 0, 0, 'black', 1);
        this.line(0, 0, x + this.WINDOW.WIDTH, 0, 'black', 1);     //ось х
        this.line(x, 0, 0, 0, 'black', 1);
    }

    printFunction(f, color = 'black', x1 = this.WINDOW.LEFT, x2 = this.WINDOW.LEFT + this.WINDOW.WIDTH) {
        const dx = this.WINDOW.WIDTH / 300;
        if (x1 > x2) {
            const t = x1;
            x1 = x2;
            x2 = t;
        }
        while (x1 < x2) {
            this.line(x1, f(x1), x1 + dx, f(x1 + dx), color);
            x1 += dx;
        }
    }
}
