import * as engine from "../../engine/main.js";
import * as math from "../../engine/essentials/math.js";
import { generateTerrain } from "./terrain.js";

const canvas = document.querySelector(".renderer-scene");

// Define canvas renderer
engine.defineCanvasRenderer(canvas);

const playerSpriteSheet = await engine.loadImageSync("../../assets/sprites/player-spritesheet-01.png");

const spriteSheetCutter = new engine.SpriteSheetCutter(playerSpriteSheet, "horizontal", 25);

await spriteSheetCutter.Cut();

const playerAnimator = new engine.Animator(spriteSheetCutter);

playerAnimator.SetAnimationRange("standing", 0, 1);
playerAnimator.SetAnimationRange("walking-right", 1, 11);
playerAnimator.SetAnimationRange("walking-left", 11, 24);

// Create player object
const mainPlayer = new engine.LocalPlayer(10, 300);

mainPlayer.SetFrameAnimator(playerAnimator);

engine.setUpdateRangeOnPlayer(mainPlayer);

generateTerrain();

engine.updateRenderObjects();