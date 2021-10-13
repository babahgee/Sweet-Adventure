import { generateUniqueID } from "./generateUniqueID.js";
import { Debug } from "./debug.js";

export class pt_spritesheet_cutter {
    /**
     * Spritesheet cutter.
     * @param {Image} sheet
     * @param {"horizontal" | "vertical"} dimension
     * @param {any} frames
     */
    constructor(sheet, dimension, frames) {
        this.sheet = sheet;
        this.dimension = dimension;
        this.frames = frames;

        this.width = sheet.width;
        this.height = sheet.height;

        this.cutSprites = [];

        if (!(sheet instanceof Image)) return;
    }
    async Cut() {

        Debug.Log("spritesheet cutter", "Preparing to cut spritesheets...", "color: yellow;");

        let taskStart = Date.now(),
            taskEnd,
            taskDifference;

        const sheets = [];

        let tempCanvas = document.createElement("canvas"),
            ctx = tempCanvas.getContext("2d");
            //outputCanvas = document.createElement("canvas"),
            //outputCanvasCtx = outputCanvas.getContext("2d");

        tempCanvas.width = this.width;
        tempCanvas.height = this.height;

        //outputCanvas.width = this.width;
        //outputCanvas.height = this.height;

        tempCanvas.className = "temp-canvas";
        // outputCanvas.className = "temp-canvas output";

        // outputCanvas.style.top = this.height + "px";

        document.body.appendChild(tempCanvas);
        // document.body.appendChild(outputCanvas);

        ctx.beginPath();
        ctx.drawImage(this.sheet, 0, 0);
        ctx.closePath();

        let frameX = 0,
            frameY = 0,
            frameWidth = this.width / this.frames,
            frameHeight = this.height / this.frames,
            loadedImages = 0;

        return new Promise((resolve, reject) => {

            const checkIfReady = () => {

                if (sheets.length == this.frames) {

                    this.cutSprites = sheets;

                    tempCanvas.remove();

                    tempCanvas = null;
                    ctx = null;

                    taskEnd = Date.now();
                    taskDifference = taskEnd - taskStart;

                    Debug.Log("spritesheet cutter", `Succesfully cut ${this.cutSprites.length + 1} sprites in ${taskDifference}ms.`, "color: lime;");

                    resolve(this);
                }

            }

            switch (this.dimension) {

                case "horizontal":

                    for (let i = 0; i < this.frames; i++) {

                        const imageData = ctx.getImageData(frameWidth * frameX, frameHeight * frameY, frameWidth, this.height);

                        let tempFrameCanvas = document.createElement("canvas"),
                            tempFrameCanvasCtx = tempFrameCanvas.getContext("2d");

                        //outputCanvasCtx.beginPath();

                        //outputCanvasCtx.putImageData(imageData, frameWidth * frameX, 0);

                        //outputCanvasCtx.closePath();


                        tempFrameCanvas.width = frameWidth;
                        tempFrameCanvas.height = this.height;

                        tempFrameCanvasCtx.putImageData(imageData, 0, 0);

                        let base32Data = tempFrameCanvas.toDataURL("image/png");

                        let tempFrameImage = new Image();

                        let frameID = generateUniqueID(28);

                        Debug.Log("spritesheet cutter", `Loading frame ${frameID.id}...`, "color: yellow;");

                        tempFrameImage.src = base32Data;

                        tempFrameImage.addEventListener("load", function () {

                            sheets.push(tempFrameImage);

                            tempFrameCanvas.remove();

                            tempFrameCanvas = null;
                            tempFrameCanvasCtx = null;

                            Debug.Log("spritesheet cutter", `Succesfully loaded frame ${frameID.id}.`, "color: lime;");

                            loadedImages += 1;

                            checkIfReady();

                        });

                        if (frameX < this.frames) {
                            frameX += 1;
                        }
                    }


                    break;
                case "vertical":

                    break;
                default:

                    break;

            }

        });
    }
}