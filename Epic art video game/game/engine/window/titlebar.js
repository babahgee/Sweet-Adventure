const electron = require("electron");

const { ipcRenderer } = electron;

const titlebarControlButtons = document.querySelectorAll(".titlebar-controls-control");

titlebarControlButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (button.classList.contains("control-close")) ipcRenderer.send("app:close", null);

        if (button.classList.contains("control-maximize")) ipcRenderer.send("app:toggle_windowsize", null);

        if (button.classList.contains("control-minimize")) ipcRenderer.send("app:minimize", null);

    });
});
