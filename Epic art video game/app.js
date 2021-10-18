// Import modules.
const path = require("path"),
    url = require("url"),
    fs = require("fs"),
    electron = require("electron"),
    express = require("express"),
    colors = require("colors"),
    socketio = require("socket.io");

process.env.SOCKET_PORT = 8000;

const io = socketio(8000);

// Get required objects from 'electron' object.
const { app, BrowserWindow, screen, ipcMain } = electron;

app.commandLine.appendSwitch("new-canvas-2d-api", "true");
// app.commandLine.appendSwitch('js-flags', '--max-old-space-size=4096');

// Create empty variable.
let mainWindow;

// Event when electron has been loaded.
app.on("ready", function () {

    // Create new browser window.
    mainWindow = new BrowserWindow({
        title: "Epic game",
        transparent: true,
        width: 1130,
        height: 670,
        minHeight: 650,
        minWidth: 700,
        resizable: true,
        frame: false,
        titleBarStyle: "hidden",
        icon: path.join(__dirname, "game", "assets", "general", "sweet_adventure-export.png"),
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true,
            nodeIntegrationInWorker: true,
            
        }
    });

    // Load html page into browser window using url format.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "game", "scenes", "titlescreen", "index.html"),
        slashes: true,
        protocol: "file:"
    }));

    ipcMain.on("app:close", function (event, args) {

        mainWindow.close();
        app.exit();
        process.exit();

    });

    ipcMain.on("app:toggle_windowsize", function (event, args) {

        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }

    });

    ipcMain.on("app:devtools", function (event, args) {

        mainWindow.webContents.openDevTools();

    });

    ipcMain.on("app:reload", function (event, args) {

        app.relaunch();
        app.exit(0);

        return;
    });

    ipcMain.on("app:minimize", function (event, args) {

        mainWindow.minimize();

    });

    ipcMain.on("app:changeView", function (event, args) {

        switch (args) {
            case "test":

                mainWindow.loadURL(url.format({
                    pathname: path.join(__dirname, "game", "scenes", "test", "index.html"),
                    slashes: true,
                    protocol: "file:"
                }));

                break;
        }

    });
});