import "../../engine/window/titlebar.js";

const electron = require("electron");

const { ipcRenderer } = electron;

const playButton = document.querySelector(".button-play"),
    loader = document.querySelector(".app-loader");

let backgroundMusic,
    mainVolume = 100,
    nodeVolume = .2;

function easeVolume(callback) {

    if (mainVolume > 1) {
        mainVolume -= 1;

        backgroundMusic.volume = nodeVolume / 100 * mainVolume;

        setTimeout(function () {
            easeVolume(callback);
        }, 10);
    } else {

        console.log(true);

        callback();

    }

}

playButton.addEventListener("click", function () {
    loader.classList.remove("hidden");

    easeVolume(function () {

        setTimeout(function () {

            ipcRenderer.send("app:changeView", "test");

        }, 1000);

    });
});

window.addEventListener("load", function () {

    backgroundMusic = new Audio("../../assets/audio/tracks/titlescreen/track01.wav");

    backgroundMusic.volume = nodeVolume / 100 * mainVolume;

    backgroundMusic.play();

    backgroundMusic.addEventListener("load", function () {

        backgroundMusic.play();

    });

    loader.classList.add("fadeout");

    setTimeout(function () {

        loader.classList.add("hidden");
        loader.classList.remove("fadeout");

    }, 300);
});