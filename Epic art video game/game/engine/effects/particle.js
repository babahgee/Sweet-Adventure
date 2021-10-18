import { pd, randomBetween } from "../essentials/math.js";
import { ctx, renderOffset } from "../main.js";
import { RenderObject } from "../rendering/renderobject.js";
import { effects } from "./main.js";

export class pt_particle_image extends RenderObject {
    constructor(image, x, y, target) {
        super();

        this.image = image;

        this.x = x;
        this.y = y;

        this.target = target;

        this.size = randomBetween(5, 25);

        this.angleDirection = randomBetween(-10, 10);
        this.angle = 0;

        this.velocitySpeed = randomBetween(5, 20) * 10;

        this.velX = 0;
        this.velY = 0;

        this.opacity = 1;

        this.forceRenderInCamera = true;

        effects.push(this);
    }
    kill() {

        let i = 0;

        while (i < effects.length) {

            const effect = effects[i];

            if (effect.id.id == this.id.id) {
                effects.splice(i, 1);
            }

            i += 1;
        }

        this.SlowDestroy();

    }
    draw() {

        ctx.save();
        ctx.beginPath();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);

        ctx.drawImage(this.image, 0, 0, this.size, this.size);

        ctx.translate(-this.x, -this.y);
        ctx.restore();

    }
    update(secondsPassed) {

        this.angle += this.angleDirection * secondsPassed;

        this.velX = pd(this.x, this.y, this.target.x, this.target.y).directionX * this.velocitySpeed;
        this.velY = pd(this.x, this.y, this.target.x, this.target.y).directionY * this.velocitySpeed;

        if (this.x > this.target.x - this.size && this.x < this.target.x + this.size && this.y > this.target.y - this.size && this.y < this.target.y + this.size) {

            this.kill();

        }

        this.x += this.velX * secondsPassed;
        this.y += this.velY * secondsPassed;

        this.draw();
    }
}

export class pt_particle_texture extends RenderObject {
    /**
     * Creates a new particle texture.
     * @param {ImageData} imageData
     * @param {number} x
     * @param {number} y
     */
    constructor(imageData, x, y) {
        super();

        this.imageData = imageData;

        this.x = x;
        this.y = y;

        this.velX = randomBetween(-5, 5) * 5;
        this.velY = randomBetween(-5, 5) * 5;

        this.size = 15;

        this.opacity = 1;

        this.forceRenderInCamera = true;

        effects.push(this);
    }

    draw() {
        ctx.save();
        ctx.beginPath();

        ctx.fillStyle = "red";
        ctx.fill();

        ctx.putImageData(this.imageData, this.x + renderOffset.x, this.y + renderOffset.y, this.size, this.size, this.size, this.size);

        ctx.restore();

    }
    kill() {

        let i = 0;

        while (i < effects.length) {

            const effect = effects[i];

            if (effect.id.id == this.id.id) {
                effects.splice(i, 1);
            }

            i += 1;
        }

        this.SlowDestroy();

    }
    update(secondsPassed) {

        if (this.size > 0) {
            this.size -= 3 * secondsPassed;
        } else {
            this.kill();
        }

        this.velY += 2;

        this.x += this.velX * secondsPassed;
        this.y += this.velY * secondsPassed;

        this.draw();
    }
}
