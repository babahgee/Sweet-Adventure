import * as engine from "../../engine/main.js";
import * as math from "../../engine/essentials/math.js";

import { assets } from "./textures.js";

export const generationOptions = {
    baseYLevel: 400,
    width: window.innerWidth * 2,
    height: 1300 * 2
}


export function generateTerrain() {

    // Calculate x length.
    const xLength = Math.round(generationOptions.width / 30),
        yLength = Math.round(generationOptions.height / 30);

    for (let x = 0; x < xLength; x++) {

        const xChunk = [];

        const topLayerHeight = 0;
        const dirtLayerHeight = math.randomBetween(10, 15);
        const stoneLayerHeight = 170;

        for (let y = 0; y < yLength; y++) {

            let block;

            switch (true) {
                case (y == 0):

                    let grass;

                    const randomGrassCount = math.randomBetween(0, 10),
                        randomTreeCount = math.randomBetween(0, 10),
                        randomTreeHeight = math.randomBetween(4, 10);

                    if (randomTreeCount == 5) {

                        // Create tree stem
                        for (let i = 0; i < randomTreeHeight; i++) {

                            let block = new engine.Terrain.Block(assets.log1, x * 30, generationOptions.baseYLevel - y - (i * 30), 30, 30);

                            xChunk.push(block);
                        }

                        let startY = generationOptions.baseYLevel - (y + (randomTreeHeight * 30)),
                            startX = x * 30;

                        let treeCoords = [];

                        let n = 5, str = "";

                        for (let i = 1; i <= n; i++) {

                            let o = [];

                            for (let j = 1; j <= n - i; j++) {
                                o.push(0);
                            }

                            for (let k = 0; k < 2 * i - 1; k++) {
                                o.push(1);
                            }

                            treeCoords.push(o);
                        }

                        console.log(treeCoords);

                        //for (let i = 0; i < treeCoords.length; i++) {

                        //    let a = treeCoords[i], c = [];

                        //    for (let o = 0; o < a.length; o++) {

                        //        //console.log(a[o]);

                        //    }

                        //}

                        //let leaf = new engine.Terrain.Block(assets.leaf1, startX - (j * 30), startY - (treeY * 30), 30, 30);

                        //leaf.setCollisionState(false);

                        //xChunk.push(leaf);
                    }

                    switch (randomGrassCount) {
                        case 0:

                            grass = new engine.Terrain.Block(assets.bush1, x * 30, generationOptions.baseYLevel - y - 30, 30, 30);
                            grass.setCollisionState(false);

                            grass.maxHealth = 20;

                            grass.shadowOpacity = 0;

                            xChunk.push(grass);

                            break;
                        case 1:

                            for (let i = 0; i < 3; i++) {
                                grass = new engine.Terrain.Block(assets.bushCollection[i], x * 30 + (i * 30), generationOptions.baseYLevel - y - 30, 30, 30);
                                grass.setCollisionState(false);

                                grass.maxHealth = 20;

                                grass.shadowOpacity = 0;

                                xChunk.push(grass);
                            }

                            break;
                    }


                    block = new engine.Terrain.Block(assets.top, x * 30, generationOptions.baseYLevel + (y * 30), 30, 30);

                    block.shadowOpacity = 0;

                    xChunk.push(block);
                    break;
                case (y > topLayerHeight - 1 && y < dirtLayerHeight):
                    block = new engine.Terrain.Block(assets.dirt, x * 30, generationOptions.baseYLevel + (y * 30), 30, 30);

                    block.shadowOpacity = 1 / dirtLayerHeight * y;

                    xChunk.push(block);
                    break;
                case (y > dirtLayerHeight - 1 && y < dirtLayerHeight + stoneLayerHeight):
                    block = new engine.Terrain.Block(assets.cobblestone, x * 30, generationOptions.baseYLevel + (y * 30), 30, 30);

                    xChunk.push(block);
                    break;
            }

        }

        engine.Terrain.Chunks.push(xChunk);

    }

    console.log("Generating done!");
}