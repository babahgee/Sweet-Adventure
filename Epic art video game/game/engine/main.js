// Importing essentials.
import { generateUniqueID } from "./essentials/generateUniqueID.js";
import { RenderObject, renderObjects } from "./rendering/renderobject.js";

// Import prototypes
import { pt_loadImageSync } from "./essentials/loadImage.js";

import { pt_localplayer } from "./players/localplayer/base.js";
import { pt_collection } from "./essentials/collection.js";
import { pt_block, pt_blocks, pt_chunks } from "./terrain/block.js";
import { Debug } from "./essentials/debug.js";
import { pt_spritesheet_cutter } from "./essentials/spritesheetCutter.js";
import { pt_animator } from "./essentials/animator.js";
import { effects } from "./effects/main.js";

const fpsNode = document.querySelector(".item-framerate"),
    playerCoordsNode = document.querySelector(".item-player-coords"),
    renderOffsetNode = document.querySelector(".item-renderoffset");



/**@type {HTMLCanvasElement} */
export let canvas = null;

/**@type {CanvasRenderingContext2D} */
export let ctx = null;

/**@type {object} */
export const renderOffset = {
    x: 0,
    y: 0
}

export const renderDistance = 40;

export const renderScale = {
    x: 1,
    y: 1,
    changeDimension: function (dimension) {
        this.x = dimension;
        this.y = dimension;
    }
}


export const mouse = {
    x: 0,
    y: 0,
    isPressing: false
}

window["renderScale"] = renderScale;

/**
 * Defines the canvas element and its renderer.
 * @param {HTMLCanvasElement} canvasElement
 */
export function defineCanvasRenderer(canvasElement) {

    if (typeof canvasElement == "undefined" || !(canvasElement instanceof HTMLCanvasElement)) {

        throw new Error("Cannot define canvas renderer since passed argument is not a HTMLCanvasElemenet instance.");

        return;
    }

    Debug.Log("engine", "Initializing graphics engine...", "color: yellow;");

    canvas = canvasElement;

    ctx = canvas.getContext("2d");

    if (typeof ctx == null) throw new Error("Cannot initialize 2d rendering context.");

    Debug.Log("engine", "Succesfully initialized 2d rendering context.", "color: lime;");


    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 25;

    window.addEventListener("resize", function () {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 25;

    });

    canvas.addEventListener("mousemove", function (event) {

        mouse.x = event.offsetX;
        mouse.y = event.offsetY;

    });

    canvas.addEventListener("mousedown", function (event) {
        mouse.isPressing = true;
    });

    canvas.addEventListener("mouseup", function (event) {
        mouse.isPressing = false;
    });

}

export let fps = -Date.now(),
    times = [],
    updateSpeed = 100,
    calculationSpeed = 0,
    lastFrame = Date.now(),
    deltaTime = 0,
    visibleObjects = 0,
    secondsPassed = 0,
    oldTimeStamp = 0;

export let simulationFrameRate = 60,
    simulationFrameStart = Date.now(),
    simulationFrameDuration = 1000 / simulationFrameRate,
    simulationDelay = 0,
    simulationLagOffset = 0,
    simulationPaused = false,
    previousSimulationToggleState = false;

export const playerCoords = {
    x: 0,
    y: 0
}

/**@type {pt_localplayer} */
export let staticPlayer;

/**
 * Sets a update range on a player instance
 * @param {pt_localplayer} playerInstance
 */
export function setUpdateRangeOnPlayer(playerInstance) {

    if (typeof playerInstance !== "object" || !(playerInstance instanceof pt_localplayer)) {

        throw new Error("The given parameter (as playerInstance) is not a pt_localplayer instance.");

        return;

    }

    staticPlayer = playerInstance;

}

const bg = await pt_loadImageSync("../../assets/general/test-parallax-wallpaper.png");

export function updateRenderObjects(timeStamp) {

    secondsPassed = (timeStamp - oldTimeStamp) / 100;
    oldTimeStamp = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Scene background.
    ctx.save();
    ctx.beginPath();

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    //const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

    //gradient.addColorStop(0, "#5292ff");
    //gradient.addColorStop(1, "#94beff");



    //ctx.fillStyle = gradient;
    //ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.closePath();
    ctx.restore();

    ctx.save();

    ctx.translate(renderOffset.x, renderOffset.y);
    ctx.scale(renderScale.x, renderScale.y);

    let i = 0;

    if (staticPlayer) {

        const x = Math.round(staticPlayer.x / 30);

        for (let i = 0; i < effects.length; i++) {

            const effect = effects[i];

            effect.UpdateMain(secondsPassed);

        }


        for (let i = x - renderDistance; i < x + renderDistance; i++) {

            const chunk = pt_chunks[i];

            if (typeof chunk !== "undefined") {

                for (let y = 0; y < chunk.length; y++) {

                    const block = chunk[y];

                    if (typeof block.UpdateMain == "function") {


                        block.UpdateMain(secondsPassed);
                    }

                }

            }

        }

        staticPlayer.UpdateMain(secondsPassed);

    } else {
        while (i < renderObjects.length) {

            /**@type {RenderObject} */
            const object = renderObjects[i];

            if (typeof object.UpdateMain == "function") {


                object.UpdateMain(secondsPassed);
            }

            i += 1;
        }
    }

    ctx.restore();

    fpsNode.innerText = fps + "fps";
    playerCoordsNode.innerText = `Coordinates x: ${playerCoords.x} y: ${playerCoords.y}`;
    renderOffsetNode.innerText = `Render offset x: ${renderOffset.x} y: ${renderOffset.y}`;

    const now = performance.now();

    while (times.length > 0 && times[0] <= now - 1000) times.shift();

    times.push(now);
    fps = times.length;
    deltaTime = simulationLagOffset.toFixed(4);

    window.requestAnimationFrame(updateRenderObjects);
}

// Essentials
export const loadImageSync = pt_loadImageSync;
export const Collection = pt_collection;

export const SpriteSheetCutter = pt_spritesheet_cutter;
export const Animator = pt_animator;

export const LocalPlayer = pt_localplayer;

export const Terrain = {
    Block: pt_block,
    Blocks: pt_blocks,
    Chunks: pt_chunks
}