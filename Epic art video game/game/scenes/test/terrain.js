import * as engine from "../../engine/main.js";
import * as math from "../../engine/essentials/math.js";

const top = await engine.loadImageSync("../../assets/extracted/GRASS/topM.png"),
    dirt = await engine.loadImageSync("../../assets/extracted/GRASS/middleM.png"),
    bottomL = await engine.loadImageSync("../../assets/extracted/GRASS/bottomL.png"),
    bottomM = await engine.loadImageSync("../../assets/extracted/GRASS/bottomM.png"),
    bottomR = await engine.loadImageSync("../../assets/extracted/GRASS/bottomR.png"),
    bush1 = await engine.loadImageSync("../../assets/extracted/DECOR/bush1.png"),
    bushCollection = [await engine.loadImageSync("../../assets/extracted/DECOR/bush31.png"), await engine.loadImageSync("../../assets/extracted/DECOR/bush32.png"), await engine.loadImageSync("../../assets/extracted/DECOR/bush33.png")],
    flowerB1 = await engine.loadImageSync("../../assets/extracted/DECOR/flowerB1.png"),
    flowerB2 = await engine.loadImageSync("../../assets/extracted/DECOR/flowerR2.png"),
    flowerB3 = await engine.loadImageSync("../../assets/extracted/DECOR/flowerB3.png"),
    flowerB4 = await engine.loadImageSync("../../assets/extracted/DECOR/flowerR4.png"),
    rock1 = await engine.loadImageSync("../../assets/extracted/DECOR/rock1.png"),
    rock2 = await engine.loadImageSync("../../assets/extracted/DECOR/rock2.png"),
    rock3 = await engine.loadImageSync("../../assets/extracted/DECOR/rock3.png"),
    cobblestone = await engine.loadImageSync("../../assets/extracted/DECOR/cobblestone.png");

export const generationOptions = {
    baseYLevel: 400,
    width: window.innerWidth * 2,
    height: 1300
}

export function generateTerrain() {
    // Calculate x length.
    const xLength = Math.round(generationOptions.width / 30),
        yLength = Math.round(generationOptions.height / 30);

    for (let x = 0; x < xLength; x++) {

        const xChunk = [];

        const topLayerHeight = 0;
        const dirtLayerHeight = math.randomBetween(10, 15);
        const stoneLayerHeight = 30;

        for (let y = 0; y < yLength; y++) {

            let block;

            switch (true) {
                case (y == 0):

                    let grass;

                    const randomGrassCount = math.randomBetween(0, 10);

                    switch (randomGrassCount) {
                        case 0:

                            grass = new engine.Terrain.Block(bush1, x * 30, generationOptions.baseYLevel - y - 30, 30, 30);
                            grass.setCollisionState(false);
                            xChunk.push(grass);

                            break;
                        case 1:

                            for (let i = 0; i < 3; i++) {
                                grass = new engine.Terrain.Block(bushCollection[i], x * 30 + (i * 30), generationOptions.baseYLevel - y - 30, 30, 30);
                                grass.setCollisionState(false);
                                xChunk.push(grass);
                            }

                            break;
                    }


                    block = new engine.Terrain.Block(top, x * 30, generationOptions.baseYLevel + (y * 30), 30, 30);

                    xChunk.push(block);
                    break;
                case (y > topLayerHeight - 1 && y < dirtLayerHeight):
                    block = new engine.Terrain.Block(dirt, x * 30, generationOptions.baseYLevel + (y * 30), 30, 30);

                    xChunk.push(block);
                    break;
                case (y > dirtLayerHeight - 1 && y < dirtLayerHeight + stoneLayerHeight):
                    block = new engine.Terrain.Block(cobblestone, x * 30, generationOptions.baseYLevel + (y * 30), 30, 30);

                    xChunk.push(block);
                    break;
            }

        }

        engine.Terrain.Chunks.push(xChunk);

    }

    console.log("Generating done!");
}