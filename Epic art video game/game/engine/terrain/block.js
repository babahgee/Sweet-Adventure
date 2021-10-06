import { pt_collection } from "../essentials/collection.js";
import { generateUniqueID } from "../essentials/generateUniqueID.js";
import { ctx, mouse, renderDistance, renderOffset, renderScale, staticPlayer } from "../main.js";
import { RenderObject } from "../rendering/renderobject.js";

export let pt_terrain_block_collection = new pt_collection("terrainblocks");

export const pt_blocks = [];

export const pt_chunks = [];

window["g_pt_blocks"] = pt_blocks;
window["g_pt_chunks"] = pt_chunks;

export class pt_block extends RenderObject {
    /**
     * Creates a new terrain block
     * @param {any} texture
     * @param {any} x
     * @param {any} y
     * @param {any} width
     * @param {any} height
     */
    constructor(texture, x, y, width, height) {

        super(arguments);

        this.blockID = generateUniqueID(18);

        this.x = typeof x == "number" ? x : 0;
        this.y = typeof y == "number" ? y : 0;

        this.childType = "terrain:terrainblock";

        this.border = false;

        this.collision = true;

        this.shadow = false;

        this.width = typeof width == "number" ? width : 30;
        this.height = typeof height == "number" ? height : 30;

        // this.resources = [];

        this.texture = (typeof texture !== "undefined" && texture instanceof Image) ? texture : null;

        this.opacity = 0;

        pt_blocks.push(this);
    }

    setCollisionState(bool) {

        this.collision = typeof bool == "boolean" ? bool : false;

        return this;

    }
    draw() {

        if (this.texture == null) return;

        ctx.save();

        ctx.beginPath();

        ctx.globalAlpha = this.opacity;

        if (this.shadow) {
            ctx.shadowColor = "#383838";
            ctx.shadowOffsetY = 15;
            ctx.shadowBlur = 20;
        }

        ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);

        if (this.border) {

            ctx.strokeStyle = "#fff";
            ctx.strokeRect(this.x, this.y, 30, 30);

        }

        ctx.restore();
    }
    update(secondsPassed) {


        const fixedMouseX = (mouse.x - renderOffset.x) / renderScale.x,
            fixedMouseY = (mouse.y - renderOffset.y) / renderScale.y;

        if (fixedMouseX > this.x && fixedMouseX < this.x + this.width && fixedMouseY > this.y && fixedMouseY < this.y + this.height) {
            if (mouse.isPressing) {

                if (typeof staticPlayer !== "undefined") {

                    const xCoord = Math.round(staticPlayer.x / 30),
                        yCoord = Math.round(staticPlayer.y / 30);

                    for (let x = xCoord - renderDistance; x < xCoord + renderDistance; x++) {

                        const chunk = pt_chunks[x];

                        if (typeof chunk !== "undefined") {
                            for (let y = 0; y < chunk.length; y++) {

                                const block = chunk[y];

                                if (block.id == this.id) chunk.splice(y, 1);

                            }
                        }

                    }
                }

                this.Destroy();
            }

        } else {
            this.border = false;
        }

        if (this.opacity < 1) {
            this.opacity += 0.1;
        }

        this.draw();

    }
}