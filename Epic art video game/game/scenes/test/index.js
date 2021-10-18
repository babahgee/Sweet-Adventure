import "../../engine/window/titlebar.js";

import * as engine from "../../engine/main.js";
import * as math from "../../engine/essentials/math.js";

import { generateTerrain } from "./terrain.js";

const canvas = document.querySelector(".renderer-scene"),
    loader = document.querySelector(".app-loader");


// Create main audio interface.
const audioInterface = new engine.MainAudioInterface();




// Define canvas renderer
engine.defineCanvasRenderer(canvas);

const playerSpriteSheet = await engine.loadImageSync("../../assets/sprites/player-spritesheet-01.png");

const spriteSheetCutter = new engine.SpriteSheetCutter(playerSpriteSheet.image, "horizontal", 25);

await spriteSheetCutter.Cut();

const playerAnimator = new engine.Animator(spriteSheetCutter);

playerAnimator.SetAnimationRange("standing", 0, 1);
playerAnimator.SetAnimationRange("walking-right", 1, 11);
playerAnimator.SetAnimationRange("walking-left", 11, 24);

generateTerrain();

// Create player object
const mainPlayer = new engine.LocalPlayer(10, 300);

mainPlayer.SetFrameAnimator(playerAnimator);

engine.setUpdateRangeOnPlayer(mainPlayer);

window.addEventListener("load", function () {

    const x = this.document.createElement("audio");

    x.src = "../../assets/audio/sfx/boardgame/Dice 9.wav";

    const a = new engine.StereoAudioNode(x);

    a.pan = 0;

    a.Play();

    engine.updateRenderObjects();

    this.setTimeout(function () {

        loader.classList.add("fadeout");

        setTimeout(function () {

            loader.classList.add("hidden");
            loader.classList.remove("fadeout");

        }, 300);

    }, 2000);

});