const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const image = new Image();
image.src = "img/sharingan.png";

class ObjectFalling {

    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
    }

    draw() {

        // sombra roja estilo sharingan
        ctx.shadowColor = "red";
        ctx.shadowBlur = 10;

        ctx.drawImage(
            image,
            this.x,
            this.y,
            this.size,
            this.size
        );

        ctx.shadowBlur = 0;
    }

    move(counter) {

        let extra = 0;

        if (counter > 15) {
            extra = 4;
        } else if (counter > 10) {
            extra = 2;
        }

        this.y += this.speed + extra;

        // si sale abajo vuelve arriba
        if (this.y > canvas.height) {
            this.y = -40;
            this.x = Math.random() * canvas.width;
        }

    }

}

class Game {

    constructor() {

        this.objects = [];
        this.counter = 0;

        for (let i = 0; i < 10; i++) {

            this.objects.push(
                new ObjectFalling(
                    Math.random() * canvas.width,
                    Math.random() * -500,
                    45,
                    1 + Math.random() * 3
                )
            );

        }

        this.handleClick();

    }

    draw() {

        // limpia canvas pero deja ver el fondo de la página
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.objects.forEach(obj => {
            obj.draw();
        });

    }

    update() {

        this.objects.forEach(obj => {
            obj.move(this.counter);
        });

    }

    handleClick() {

        canvas.addEventListener("click", (e) => {

            const mouseX = e.offsetX;
            const mouseY = e.offsetY;

            this.objects.forEach((obj, index) => {

                const centerX = obj.x + obj.size / 2;
                const centerY = obj.y + obj.size / 2;

                const dx = mouseX - centerX;
                const dy = mouseY - centerY;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < obj.size / 2) {

                    this.objects.splice(index, 1);

                    this.counter++;

                    document.getElementById("contador").innerText =
                        "Eliminadas: " + this.counter;

                    this.objects.push(
                        new ObjectFalling(
                            Math.random() * canvas.width,
                            -50,
                            45,
                            1 + Math.random() * 3
                        )
                    );

                }

            });

        });

    }

    run() {

        const loop = () => {

            this.update();
            this.draw();

            requestAnimationFrame(loop);

        };

        loop();

    }

}

const game = new Game();
game.run();