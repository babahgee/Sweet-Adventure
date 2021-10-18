import { pt_particle_texture } from "../effects/particle.js";
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

        this.maxHealth = 100;

        this.health = this.maxHealth;

        this.border = false;

        this.collision = true;

        this.destructable = true;

        this.shadow = false;

        this.pixelParticleData = (typeof texture !== "undefined" && typeof texture.pixelData !== "undefined") ? texture.pixelData : null;

        this.shadowOpacity = .9;

        this.width = typeof width == "number" ? width : 30;
        this.height = typeof height == "number" ? height : 30;

        // this.resources = [];

        this.texture = (typeof texture !== "undefined" && texture.image instanceof Image) ? texture.image : null;

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
        
        ctx.beginPath();

        //ctx.rect(this.x, this.y, this.width, this.height);
        //ctx.fillStyle = `rgba(0, 0, 0, ${this.shadowOpacity})`;
        //ctx.fill();

        ctx.closePath();

        ctx.restore();

        // Health wrapper
        if (this.health !== 100) {
            ctx.save();

            ctx.beginPath();

            ctx.fillStyle = "#1d1d1d";
            ctx.fillRect(this.x + (this.width / 2), this.y - 5, this.width / 2, 3);

            ctx.fillStyle = "lime";
            ctx.fillRect(this.x + (this.width / 2), this.y - 5, this.width / 100 * this.health / 2, 3);


            ctx.closePath();


            ctx.restore();
     
        }
    }
    kill(x, y, castingRange) {

        const xCoord = Math.round(x / 30),
            yCoord = Math.round(y / 30);
        for (let x = xCoord - castingRange; x < xCoord + castingRange; x++) {

            const chunk = pt_chunks[x];

            if (typeof chunk !== "undefined") {
                for (let y = 0; y < chunk.length; y++) {

                    const block = chunk[y];

                    // if (block.y == this.y - this.height) block.shadow = true;

                    if (block.id == this.id) {

                        if (this.pixelParticleData !== null) {
                            for (let i = 0; i < 20; i++) {

                                new pt_particle_texture(this.pixelParticleData, this.x, this.y);
                            }
                        }


                        chunk.splice(y, 1);
                        //this.Destroy();

                    }

                }
            }

        }

        this.SlowDestroy();
    }

    update(secondsPassed) {

        if (this.opacity < 1) {
            this.opacity += 0.1;
        }

        this.draw();

    }
}