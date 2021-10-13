import { Debug } from "./debug.js";
import { pt_spritesheet_cutter } from "./spritesheetCutter.js";

export class pt_animator {
    /**
     * Animates spritesheets
     * @param {pt_spritesheet_cutter} spriteSheetCutter
     */
    constructor(spriteSheetCutter) {

        if (!(spriteSheetCutter instanceof pt_spritesheet_cutter)) throw new Error("No spritesheet cutter instance has been given as parameter.");

        this.sheets = spriteSheetCutter.cutSprites;

        this.frame = 0;

        this.overwrite = false;

        this.animations = {};
    }
    SetAnimationRange(animationName, start, end) {

        if (typeof animationName !== "string" || typeof start !== "number" || typeof end !== "number") throw new Error("Cannot execute method. Parameters are unexpected.");

        if (typeof this.animations[animationName] !== "undefined" && !this.overwrite) {

            Debug.Log("animator", `Animation '${animationName}' does already exist. To overwrite this animation, set the property 'overwrite' of this instance to true.`, "color: yellow;");

            return;
        }

        this.animations[animationName] = [];

        for (let i = start; i < end; i++) {
            this.animations[animationName].push(this.sheets[i]);
        }
    }
}