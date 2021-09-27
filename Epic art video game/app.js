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
const { app, BrowserWindow, screen } = electron;

// Create empty variable.
let mainWindow;

// Event when electron has been loaded.
app.on("ready", function () {

    // Create new browser window.
    mainWindow = new BrowserWindow({
        title: "Epic game",
        backgroundColor: "#1d1d1d",
        width: 1130,
        height: 670,
        minHeight: 650,
        minWidth: 700,
        icon: path.join(__dirname, "game", "assets", "general", "sweet_adventure-export.png"),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true,
            nodeIntegrationInWorker: true,
        }
    });

    // Load html page into browser window using url format.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "game", "scenes", "test", "index.html"),
        slashes: true,
        protocol: "file:"
    }));
});