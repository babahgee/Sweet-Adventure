// Importing essentials.
import { generateUniqueID } from "./essentials/generateUniqueID.js";
import { renderObjects } from "./rendering/renderobject.js";

// Import prototypes
import { pt_loadImageSync } from "./essentials/loadImage.js";
import { pt_terrain_block, pt_terrain_block_collection } from "./terrain/terrainblock.js";

import { pt_localplayer } from "./players/localplayer/base.js";
import { pt_collection } from "./essentials/collection.js";

/**@type {HTMLCanvasElement} */
export let canvas = null;

/**@type {CanvasRenderingContext2D} */
export let ctx = null;

/**@type {object} */
export const renderOffset = {
    x: 0,
    y: 0
}

export const renderScale = {
    x: 1,
    y: 1,
    changeDimension: function (dimension) {
        this.x = dimension;
        this.y = dimension;
    }
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

    canvas = canvasElement;

    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", function () {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

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

export function updateRenderObjects(timeStamp) {

    secondsPassed = (timeStamp - oldTimeStamp) / 100;
    oldTimeStamp = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.beginPath();

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

    gradient.addColorStop(0, "#5292ff");
    gradient.addColorStop(1, "#94beff");



    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.closePath();
    ctx.restore();

    ctx.save();

    ctx.translate(renderOffset.x, renderOffset.y);
    ctx.scale(renderScale.x, renderScale.y);


    let i = 0;

    while (i < renderObjects.length) {

        /**@type {RenderObject} */
        const object = renderObjects[i];

        if (typeof object.UpdateMain == "function") {


            object.UpdateMain(secondsPassed);
        }

        i += 1;
    }

    ctx.restore();

    ctx.save();

    ctx.beginPath();

    ctx.fillStyle = "#fff";

    ctx.font = "10px Consolas";

    ctx.fillText(fps + " fps", 10, 10);
    ctx.fillText(`Renderoffset: ${renderOffset.x} - ${renderOffset.y}`, 10, 25);

    ctx.restore();

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

// Terrain exports
export const Terrain = {
    TerrainBlock: pt_terrain_block,
    BlockCollection: pt_terrain_block_collection
}

export const LocalPlayer = pt_localplayer;