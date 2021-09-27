import * as engine from "../../engine/main.js";

import * as math from "../../engine/essentials/math.js";

const top = await engine.loadImageSync("../../assets/extracted/GRASS/topM.png"),
    dirt = await engine.loadImageSync("../../assets/extracted/GRASS/middleM.png"),
    bottomL = await engine.loadImageSync("../../assets/extracted/GRASS/bottomL.png"),
    bottomM = await engine.loadImageSync("../../assets/extracted/GRASS/bottomM.png"),
    bottomR = await  engine.loadImageSync("../../assets/extracted/GRASS/bottomR.png"),
    bush1 = await engine.loadImageSync("../../assets/extracted/DECOR/bush1.png"),
    bush2L = await  engine.loadImageSync("../../assets/extracted/DECOR/bush31.png"),
    bush2M = await  engine.loadImageSync("../../assets/extracted/DECOR/bush32.png"),
    bush2R = await engine.loadImageSync("../../assets/extracted/DECOR/bush33.png"),
    flowerB1 = await  engine.loadImageSync("../../assets/extracted/DECOR/flowerB1.png"),
    flowerB2 = await engine.loadImageSync("../../assets/extracted/DECOR/flowerR2.png"),
    flowerB3 = await engine.loadImageSync("../../assets/extracted/DECOR/flowerB3.png"),
    flowerB4 = await engine.loadImageSync("../../assets/extracted/DECOR/flowerR4.png"),
    rock1 = await engine.loadImageSync("../../assets/extracted/DECOR/rock1.png"),
    rock2 =  await engine.loadImageSync("../../assets/extracted/DECOR/rock2.png"),
    rock3 = await engine.loadImageSync("../../assets/extracted/DECOR/rock3.png");

export const generationOptions = {
    baseYLevel: 400,
    width: window.innerWidth * 2,
    height: 300
}

export function generateTerrain() {

    console.log("Generating...");

    const baseYLevel = 700;

    // Calculate x length.
    const xLength = Math.round(generationOptions.width / 30),
        yLength = Math.round(generationOptions.height / 30);

    for (let x = 0; x < xLength; x++) {

        const xCollection = new engine.Collection("x-layer-blocks");

        for (let y = 0; y < yLength; y++) {

            let block;

            block = new engine.Terrain.TerrainBlock(top, x * 30, generationOptions.baseYLevel + (y * 30), 30, 30);

            xCollection.AddItem(block);

        }

        engine.Terrain.BlockCollection.AddItem(xCollection);
    }

    console.log("Generating done!");
}