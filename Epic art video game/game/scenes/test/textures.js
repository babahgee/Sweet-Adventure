import * as engine from "../../engine/main.js";

export const assets = {
    top: await engine.loadImageSync("../../assets/extracted/GRASS/topM.png"),
    dirt: await engine.loadImageSync("../../assets/extracted/GRASS/middleM.png"),
    bottomL: await engine.loadImageSync("../../assets/extracted/GRASS/bottomL.png"),
    bottomM: await engine.loadImageSync("../../assets/extracted/GRASS/bottomM.png"),
    bottomR: await engine.loadImageSync("../../assets/extracted/GRASS/bottomR.png"),
    bush1: await engine.loadImageSync("../../assets/extracted/DECOR/bush1.png"),
    bushCollection:[
        await engine.loadImageSync("../../assets/extracted/DECOR/bush31.png"),
        await engine.loadImageSync("../../assets/extracted/DECOR/bush32.png"),
        await engine.loadImageSync("../../assets/extracted/DECOR/bush33.png")
    ],
    flowerB1: await engine.loadImageSync("../../assets/extracted/DECOR/flowerB1.png"),
    flowerB2: await engine.loadImageSync("../../assets/extracted/DECOR/flowerR2.png"),
    flowerB3: await engine.loadImageSync("../../assets/extracted/DECOR/flowerB3.png"),
    flowerB4: await engine.loadImageSync("../../assets/extracted/DECOR/flowerR4.png"),
    rock1: await engine.loadImageSync("../../assets/extracted/DECOR/rock1.png"),
    rock2: await engine.loadImageSync("../../assets/extracted/DECOR/rock2.png"),
    rock3: await engine.loadImageSync("../../assets/extracted/DECOR/rock3.png"),
    cobblestone: await engine.loadImageSync("../../assets/extracted/DECOR/cobblestone.png"),
    log1: await engine.loadImageSync("../../assets/extracted/LOGS/log_01.png"),
    leaf1: await engine.loadImageSync("../../assets/extracted/LEAVS/birch_leaves.png")
}