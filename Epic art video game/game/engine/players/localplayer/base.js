import { keys } from "../../essentials/keyupdater.js";
import { canvas, ctx, renderOffset, renderScale } from "../../main.js";
import { RenderObject, renderObjects } from "../../rendering/renderobject.js";
import { pt_terrain_block_collection } from "../../terrain/terrainBlock.js";

export class pt_localplayer extends RenderObject {
    constructor(x, y) {
        super();

        this.x = x;
        this.y = y;

        this.velX = 0;
        this.velY = 0;

        this.isOnGround = false;

        this.width = 25;
        this.height = 50;

        this.forceRenderInCamera = true;
    }

    draw() {

        ctx.beginPath();

        ctx.strokeStyle = "red";
        ctx.strokeRect(this.x, this.y, this.width, this.height);

    }
    update(secondsPassed) {

        secondsPassed = isNaN(secondsPassed) ? 0 : secondsPassed;

        const terrainBlocks = pt_terrain_block_collection.GetStorageItems();

        // this.velY += 5 * secondsPassed;

        for (let i = 0; i < terrainBlocks.length; i++) {

            const block = terrainBlocks[i];

            if (block.x > this.x - 100 && block.x < this.x + 100) {
                block.border = true;
            } else {
                block.border = false;
            }

            if (block.collision) {

                if (this.x > block.x && this.x < block.x + 30 && this.y > block.y - this.height && this.y < block.y + 30) {

                    this.isOnGround = true;
                    this.velY = 0;
                    this.y = block.y - this.height;

                }

            }

        }

        if (keys.d) this.velX = 50 * secondsPassed;
        if (keys.a) this.velX = -50 * secondsPassed;
        if (keys.space && this.isOnGround) {
            this.velY = -60 * secondsPassed
            this.isOnGround = false;
        };

        if (this.velX > 0) {
            this.velX -= 2 * secondsPassed;
        }
        if (this.velX < 0) {
            this.velX += 2 * secondsPassed;
        }

        renderOffset.x = -(this.x - (canvas.width / 2) + (this.width * 2)) * (renderScale.x * 1);
        renderOffset.y = -(this.y - (canvas.height / 2)) * (renderScale.y * 1);


        this.x += this.velX;
        this.y += this.velY;

        this.draw();
    }
}