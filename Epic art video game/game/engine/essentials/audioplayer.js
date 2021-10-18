import { Debug } from "./debug.js";
import { generateUniqueID } from "./generateUniqueID.js";

export const pt_mainaudiointerfaces = [];

export class pt_mainaudiointerface {
    constructor(name) {

        this.name = name;

        this.id = generateUniqueID(18);
        this.timestamp = Date.now();
        this.type = "audio:main_interface";

        this._volume = 1;

        this.audioNodes = [];

        pt_mainaudiointerfaces.push(this);
    }

    // ===================== Setters =====================

    /**
     * Set volume to main audio interface.
     * @param {any} value
     */
    set volume(value) {
        if (typeof value !== "number") throw new Error("Cannot set value to volume since given argument is not a number.");

        this._volume = value;

        for (let node in this.audioNodes) {

            // node.volume

        }
    }
}

export class pt_stereoaudionode {
    /**
     * Creates a new stereo audio node.
     * @param {HTMLAudioElement} src
     */
    constructor(src) {

        this.src = src;

        this.id = generateUniqueID(18);
        this.timestamp = Date.now();

        /**@type {AudioContext} */
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.source = this.ctx.createMediaElementSource(src);

        this.panNode = this.ctx.createStereoPanner();

        this.source.connect(this.panNode);
        this.panNode.connect(this.ctx.destination);
    }
    /**
     * Adds node main interface.
     * @param {pt_mainaudiointerface} iface
     */
    AddToMainInterface(iface) {

        if (typeof iface !== "undefined") {

            if (iface instanceof pt_mainaudiointerface) {

                pt_mainaudiointerface.push(this);

                return pt_mainaudiointerface;

            } else {
                throw new Error("The given argument is not a MainAudioInterface instance.");
            }

        }

    }
    /**
     * Plays audio node.
     * @param {number | undefined} timestamp
     */
    Play(timestamp) {

        if (typeof timestamp == "number") {
            this.ctx.currentTime = timestamp;
        }

        this.src.play();

        return this;
    }

    // ===================== Setters =====================

    /**
     * Sets pan value.
     * @param {number} value
     */
    set pan(value) {

        if (typeof value !== "number") throw new Error("Cannot set value to pan since given argument is not a number.");

        if (!(value >= -1 && value <= 1)) {

            Debug.Log("StereoAudioNode", "Cannot set pan value since value is less than -1 or larger than 1", "color: yellow");

            return this;
        }

        this.panNode.pan.setValueAtTime(value, this.ctx.currentTime);

        return this;
    }
}