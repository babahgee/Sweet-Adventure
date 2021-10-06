import { generateUniqueID } from "../essentials/generateUniqueID.js";
import { canvas, ctx, renderOffset, renderScale } from "../main.js";


/**@type {Array} */
export const renderObjects = [];

export class RenderObject {
    constructor(object) {

        this.id = generateUniqueID(24);
        this.creationTimestamp = Date.now();

        this.childObject = object;

        this.forceRenderInCamera = false;

        this.events = {};

        renderObjects.push(this);
    }
    /**
     * Sets an event listener on this object.
     * @param {"destroy" | "create"} event
     * @param {Function} callback
     */
    On(event, callback) {
        switch (event) {
            case "destroy":

                if (typeof callback !== "function") {
                    throw new Error("No callback function has been given.");

                    return;
                }

                this.events["destroy"] = callback;

                break;
        }
    }

    get center() {
        return {
            x: this.x + this.width * .5,
            y: this.y + this.height * .5
        }
    }

    get bottom() {
        return this.y + this.height;
    }
    get top() {
        return this.y;
    }
    get left() {
        return this.x;
    }
    get right() {
        return this.x + this.width;
    }

    /**
     * Get collision state.
     * @param {RenderObject} obj
     */
    GetCollision(obj) {

        if (typeof obj == "undefined" || typeof obj.x == "undefined" || typeof obj.y == "undefined") return;

        if (this.top > obj.bottom || this.right < obj.left || this.bottom < obj.top || this.left > obj.right) {
            return false;
        }

        return true;

    }

    /**
     * Resolves collision state.
     * @param {RenderObject} obj
     */
    ResolveCollision(obj) {

        if (typeof obj == "undefined" || typeof obj.x == "undefined" || typeof obj.y == "undefined") return;

        const vectorX = this.center.x - obj.center.x,
            vectorY = this.center.y - obj.center.y;

        const states = {
            top: false,
            left: false,
            bottom: false,
            right: false
        };

        if (vectorY * vectorY > vectorX * vectorX) {

            if (vectorY > 0) {
                states.bottom = true;
                states.top = false;
            } else {
                states.top = true;
                states.bottom = false;
            }

        } else {
            
            if (vectorX > 0) {

                states.right = true;
                states.left = false;

            } else {
                states.right = false;
                states.left = true;
            }

        }

        return states;
    }

    /**Destroys render object. */
    Destroy() {

        let i = 0;

        while (i < renderObjects.length) {

            const object = renderObjects[i];

            if (object.id.id == this.id.id) {

                if (typeof this.events["destroy"] == "function") this.events["destroy"](this);

                console.log(true);

                renderObjects.splice(i, 1);
            }

            i += 1;
        }

    }

    UpdateMain(secondsPassed) {

        if (!this.forceRenderInCamera) {
            if (typeof this.x == "number" && typeof this.y == "number") {


                if (this.x > -((renderOffset.x + canvas.width) / renderScale.x) &&
                    this.x < -((renderOffset.x - canvas.width) / renderScale.x) &&
                    this.y > -((renderOffset.y + canvas.height) / renderScale.y) &&
                    this.y < -((renderOffset.y - (canvas.height * 2))) / renderScale.y) {

                    if (typeof this.update == "function")
                        this.update(secondsPassed);

                } else {

                    if (typeof this.opacity == "number") this.opacity = 0;

                }

                return;
            }
        } else {
            if (typeof this.update == "function")
                this.update(secondsPassed);
        }


    }
}