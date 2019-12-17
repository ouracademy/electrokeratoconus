// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");


const { autoUpdater } = require("electron-updater");


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray;

const title = "ElectroKeratoconus";
const icon = path.join(__dirname, "build", "icon.ico");

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon
  });

  mainWindow.removeMenu();

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on("minimize", function (event) {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on("close", function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }

    watcher.close().then(() => (event.returnValue = false));
  });

  // Emitted when the window is closed.
  // Dereference the window object, usually you would store windows
  mainWindow.on("closed", function () {
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: `Ver ${title}`,
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: "Salir",
      click: () => {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);
  tray.setToolTip(title);
  tray.setContextMenu(contextMenu);
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});


app.on('ready', function () {
  autoUpdater.checkForUpdatesAndNotify();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const start_watch = require("./watch");
watcher = start_watch();
