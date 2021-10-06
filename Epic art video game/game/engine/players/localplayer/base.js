import { keys } from "../../essentials/keyupdater.js";
import { canvas, ctx, playerCoords, renderOffset, renderScale, Terrain } from "../../main.js";
import { RenderObject, renderObjects } from "../../rendering/renderobject.js";
import { pt_block, pt_chunks } from "../../terrain/block.js";

export const localPlayers = [];

window["localPlayers"] = localPlayers;

export class pt_localplayer extends RenderObject {
    constructor(x, y) {
        super();

        this.x = x;
        this.y = y;

        this.velX = 0;
        this.velY = 0;

        this.collisionRange = 5;

        this.isOnGround = false;

        this.gravity = false;

        this.width = 25;
        this.height = 50;

        this.childType = "player:localPlayer";

        this.forceRenderInCamera = true;

        localPlayers.push(this);
    }

    draw() {

        ctx.beginPath();

        ctx.strokeStyle = "red";
        ctx.strokeRect(this.x, this.y, this.width, this.height);

    }

    update(secondsPassed) {

        secondsPassed = isNaN(secondsPassed) ? 0 : secondsPassed;

        const chunks = Terrain.Chunks,
            xCoord = Math.round(this.x / 30),
            yCoord = Math.round(this.y / 30);

        if (this.gravity) this.velY += 5 * secondsPassed;


        for (let i = xCoord - 100; i < xCoord + 100; i++) {

            const chunk = pt_chunks[i]; 

            if (typeof chunk !== "undefined") {

                for (let y = 0; y < chunk.length; y++) {

                    /**@type {pt_block} */
                    const block = chunk[y];

                    if (this.gravity) {
                        const collisionStates = block.ResolveCollision(this);

                        if (collisionStates.top) {
                            this.velY = 0;
                            this.y = block.y - this.height;
                        }
                    } else {
                        if (block.x > this.x - 100 && block.x < this.x + 100 && block.y > this.y - 100 && block.y < this.y + 100) {
                            if (block.collision) block.opacity = -.1;
                        }
                    }

                }

            }

        }


        if (keys.d) this.velX = 50 * secondsPassed;
        if (keys.a) this.velX = -50 * secondsPassed;
        if (keys.w) this.velY = -80 * secondsPassed;
        if (keys.s) this.velY = 80 * secondsPassed;

        if (!this.gravity) {
            if (this.velY > 0) {
                this.velY -= 2 * secondsPassed;
            }
            if (this.velY < 0) {
                this.velY += 2 * secondsPassed;
            }
        }

        if (this.velX > 0) {
            this.velX -= 2 * secondsPassed;
        }
        if (this.velX < 0) {
            this.velX += 2 * secondsPassed;
        }

        playerCoords.x = xCoord;
        playerCoords.y = yCoord;

        renderOffset.x = -(this.x - (canvas.width / 2) + (this.width * 2)) * (renderScale.x * 1);
        renderOffset.y = -(this.y - (canvas.height / 2)) * (renderScale.y * 1);


        this.x += Math.round(this.velX);
        this.y += Math.round(this.velY);

        this.draw();
    }
}