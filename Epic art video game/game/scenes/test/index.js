import * as engine from "../../engine/main.js";
import * as math from "../../engine/essentials/math.js";
import { generateTerrain } from "./terrain.js";

const canvas = document.querySelector(".renderer-scene");

// Define canvas renderer
engine.defineCanvasRenderer(canvas);

// Create player object
const mainPlayer = new engine.LocalPlayer(10, 300);

engine.setUpdateRangeOnPlayer(mainPlayer);

generateTerrain();

engine.updateRenderObjects();