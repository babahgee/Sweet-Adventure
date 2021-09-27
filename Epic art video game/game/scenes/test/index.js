import * as engine from "../../engine/main.js";
import { generateTerrain } from "./terrain.js";

const canvas = document.querySelector(".renderer-scene");

// Define canvas renderer
engine.defineCanvasRenderer(canvas);

generateTerrain();

// Create player object
const mainPlayer = new engine.LocalPlayer(10, 300);

engine.updateRenderObjects();