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
    /**Destroys render object. */
    Destroy() {

        let i = 0;

        while (i < renderObjects.length) {

            const object = renderObjects[i];

            if (object.id == this.id) {

                if (typeof this.events["destroy"] == "function") this.events["destroy"](this);

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