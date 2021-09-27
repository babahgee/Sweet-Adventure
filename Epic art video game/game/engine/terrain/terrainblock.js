import { pt_collection } from "../essentials/collection.js";
import { generateUniqueID } from "../essentials/generateUniqueID.js";
import { ctx, renderOffset, renderScale } from "../main.js";
import { RenderObject } from "../rendering/renderobject.js";

export const pt_terrain_block_collection = new pt_collection("terrainblocks");

export class pt_terrain_block extends RenderObject {
    /**
     * Creates a new terrain block
     * @param {any} texture
     * @param {any} x
     * @param {any} y
     * @param {any} width
     * @param {any} height
     */
    constructor(texture, x, y, width, height) {

        super();

        this.blockID = generateUniqueID(18);

        this.x = typeof x == "number" ? x : 0;
        this.y = typeof y == "number" ? y : 0;

        this.border = false;

        this.collision = true;

        this.width = typeof width == "number" ? width : blockSize;
        this.height = typeof height == "number" ? height : blockSize;

        this.resources = [];

        this.texture = (typeof texture !== "undefined" && texture instanceof Image) ? texture : null;

        this.opacity = 0;
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

        ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);

        if (this.border) {

            ctx.strokeStyle = "#fff";
            ctx.strokeRect(this.x, this.y, 30, 30);

        }

        ctx.restore();
    }
    update() {

        if (this.opacity < 1) {
            this.opacity += 0.1;
        }

        this.draw();

    }
}