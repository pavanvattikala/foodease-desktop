const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const screen = electron.screen;

const path = require("path");
const url = require("url");
const ip = require("ip");

const currentMode = process.env.APP_ENV || "development";

const displayMenu = currentMode === "development" ? false : true;

app.on("ready", () => {});

// PHP SERVER CREATION //
const PHPServer = require("php-server-manager");

let server;

if (process.platform === "win32") {
  const host = ip.address();

  server = new PHPServer({
    php: `${__dirname}/php/php.exe`,
    port: 5555,
    host: host,
    directory: path.join(__dirname, "www", "public"),
    directives: {
      display_errors: 1,
      expose_php: 1,
    },
  });
}

let mainWindow;

function createWindow() {
  server.run();
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const desiredWidth = Math.min(1920, width);
  const desiredHeight = Math.min(1080, height);

  mainWindow = new BrowserWindow({
    width: desiredWidth,
    height: desiredHeight,
    webPreferences: {
      hardwareAcceleration: true,
    },
    autoHideMenuBar: displayMenu,
  });

  mainWindow.loadURL("http://" + server.host + ":" + server.port + "/");

  const { shell } = require("electron");
  shell.showItemInFolder("fullPath");

  mainWindow.on("closed", function () {
    server.close();
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    // PHP SERVER QUIT
    server.close();
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
