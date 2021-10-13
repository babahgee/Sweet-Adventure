import { randomBetween } from "../essentials/math.js";
import { ctx, renderOffset } from "../main.js";
import { RenderObject } from "../rendering/renderobject.js";
import { effects } from "./main.js";

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

        this.velX = randomBetween(-5, 5);
        this.velY = randomBetween(-5, 5);

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

        // ctx.rotate(Math.PI * 52)
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
            this.size -= .5;
        } else {
            this.kill();
        }

        this.velY += .5;

        this.x += this.velX;
        this.y += this.velY;

        this.draw();
    }
}