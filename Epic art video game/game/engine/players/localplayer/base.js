import { pt_particle_image } from "../../effects/particle.js";
import { pt_animator } from "../../essentials/animator.js";
import { RenderingOptions } from "../../essentials/debug.js";
import { keys } from "../../essentials/keyupdater.js";
import { pd, randomBetween } from "../../essentials/math.js";
import { canvas, ctx, mouse, playerCoords, renderOffset, renderScale, secondsPassed, Terrain } from "../../main.js";
import { RenderObject, renderObjects } from "../../rendering/renderobject.js";
import { pt_block, pt_chunks } from "../../terrain/block.js";

export const localPlayers = [];

window["localPlayers"] = localPlayers;

export class pt_localplayer extends RenderObject {
    constructor(x, y) {
        super();

        this.x = x;
        this.y = y;

        this.mouse = {
            x: x,
            y: y,
            active: false,
            castingRange: 20
        }

        this.lazer = {
            damage: 250,
        }

        this.velX = 0;
        this.velY = 0;

        this.collisionRange = 5;

        this.animator;

        this.isOnGround = false;

        this.gravity = true;

        this.width = 25;
        this.height = 50;

        this.childType = "player:localPlayer";

        this.forceRenderInCamera = true;

        localPlayers.push(this);
    }

    /**
     * Sets frame animator.
     * @param {pt_animator} animator
     */
    SetFrameAnimator(animator) {

        if (!(animator instanceof pt_animator)) throw new Error("Given parameter is not a Animator instance.");

        this.animator = animator;

    }

    updateAnimator(secondsPassed) {

        const walkingRight = this.animator.animations["walking-right"],
            walkingLeft = this.animator.animations["walking-left"],
            standing = this.animator.animations["standing"];

        ctx.beginPath();
        ctx.save();

        if (this.mouse.active) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#57e9ff";
        }

        if (this.velX > 1) {


            ctx.drawImage(walkingRight[this.animator.frame], this.x, this.y, this.width, this.height);

            if (this.animator.frame < walkingRight.length - 1) {
                this.animator.frame += 1;
            } else {
                this.animator.frame = 0;
            }

        } else if (this.velX < 0) {
            ctx.drawImage(walkingLeft[this.animator.frame], this.x, this.y, this.width, this.height);

            if (this.animator.frame < walkingRight.length - 1) {
                this.animator.frame += 1;
            } else {
                this.animator.frame = 0;
            }
        } else {
            ctx.drawImage(standing[0], this.x, this.y, this.width, this.height);
            this.animator.frame = 0;

        }


        ctx.closePath();
        ctx.restore();
    }

    draw(secondsPassed) {

        const fixedMouseX = (mouse.x - renderOffset.x) / renderScale.x,
            fixedMouseY = (mouse.y - renderOffset.y) / renderScale.y;

        if (typeof this.animator !== "undefined" && this.animator instanceof pt_animator) this.updateAnimator(secondsPassed);

        if (RenderingOptions.ShowBoxBoundary) {
            ctx.beginPath();

            ctx.strokeStyle = "red";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }

        if (this.mouse.active) {
            ctx.save();
            ctx.beginPath();

            ctx.lineWidth = 2;
            ctx.lineCap = "round";

            ctx.moveTo(this.x + this.width / 2, this.y + this.height / 4);
            ctx.lineTo(fixedMouseX, fixedMouseY);

            ctx.shadowBlur = randomBetween(1, 20);
            ctx.shadowColor = "#57e9ff";

            ctx.strokeStyle = "#57e9ff";
            ctx.stroke();

            ctx.closePath();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            const grd = ctx.createRadialGradient(fixedMouseX, fixedMouseY, 5, fixedMouseX, fixedMouseY, 10);

            grd.addColorStop(0, "#57e9ff");
            grd.addColorStop(randomBetween(5, 10) / 10, "transparent")
            grd.addColorStop(1, "transparent")

            ctx.arc(fixedMouseX, fixedMouseY, 10, 0, 2 * Math.PI);

            ctx.fillStyle = grd;

            ctx.fill();
            ctx.restore();
        }

    }

    shootLazer(secondsPassed) {



        const fixedMouseX = (mouse.x - renderOffset.x) / renderScale.x,
            fixedMouseY = (mouse.y - renderOffset.y) / renderScale.y;

        const xCoord = Math.round(this.x / 30),
            yCoord = Math.round(this.y / 30);


        if (mouse.isPressing) {

            if (Math.round(fixedMouseX / 30) > xCoord - this.mouse.castingRange && Math.round(fixedMouseX / 30) < xCoord + this.mouse.castingRange) {

                this.mouse.active = true;

                for (let i = xCoord - this.mouse.castingRange; i < xCoord + this.mouse.castingRange; i++) {

                    const chunk = pt_chunks[i];

                    if (typeof chunk !== "undefined") {
                        for (let y = 0; y < yCoord + this.mouse.castingRange; y++) {

                            /**@type {pt_block} */
                            const block = chunk[y];

                            if (typeof block !== "undefined") {

                                if (fixedMouseX > block.x && fixedMouseX < block.x + block.width && fixedMouseY > block.y && fixedMouseY < block.y + block.height) {


                                    if (block.destructable) {

                                        if (block.health > 0) {
                                            block.health -= this.lazer.damage * secondsPassed;
                                        } else {

                                            new pt_particle_image(block.texture, block.x, block.y, this);

                                            block.kill(this.x, this.y, this.mouse.castingRange);

                                        }

                                    }

                                }
                            }

                        }
                    }

                }
            } else {
                this.mouse.active = false;
            }

        } else {
            this.mouse.active = false;
        }
    }

    update(secondsPassed) {

        secondsPassed = isNaN(secondsPassed) ? 0 : secondsPassed;

        const xCoord = Math.round(this.x / 30),
            yCoord = Math.round(this.y / 30);

        if (this.gravity) this.velY += 1;


        for (let i = xCoord - 10; i < xCoord + 10; i++) {

            const chunk = pt_chunks[i]; 

            if (typeof chunk !== "undefined") {

                for (let y = 0; y < chunk.length; y++) {

                    /**@type {pt_block} */
                    const block = chunk[y];

                    if (typeof block !== "undefined") {
                        // block.opacity = 0;

                        if (this.gravity) {

                            const collision = block.GetCollision(this),
                                collisionState = block.ResolveCollision(this);

                            if (collision && block.collision) {

                                if (collisionState.right) {
                                    this.x = block.x - this.width;
                                    this.velX = 0;

                                }
                                if (collisionState.left) {
                                    this.x = block.x + this.width;
                                    this.velX = 0;
                                }

                                if (!collisionState.right && !collisionState.left) {
                                    this.velY = 0;
                                    this.y = block.y - this.height;
                                }
                            }

                        } else {
                            if (block.x > this.x - 100 && block.x < this.x + 100 && block.y > this.y - 100 && block.y < this.y + 100) {
                                if (block.collision) block.opacity = -.1;
                            }
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

        //this.velY = Math.round(this.velY);
        //this.velX = Math.round(this.velX);

        this.x += Math.round(this.velX * 5) * secondsPassed;
        this.y += Math.round(this.velY * 5) * secondsPassed;

        this.shootLazer(secondsPassed);
        this.draw(secondsPassed);
    }
}