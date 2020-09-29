const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;

function createWindow() {
    win = new BrowserWindow({show: false, title: "Lantern Notes"});
    loaderWin = new BrowserWindow({show: false, frame: false, backgroundColor: "#1f1f1f", width: 600, height: 400, maximizable: false, minimizable: false, movable: false});
    loaderWin.loadURL(url.format({
        pathname: path.join(__dirname, 'src/loader.html'),
        protocol: 'file',
        slashes: true
    }));

    win.removeMenu();
    win.loadURL('https://lantern-notes.herokuapp.com');

    loaderWin.once('ready-to-show', () => {
        loaderWin.show();
    });

    win.once('ready-to-show', () => {
        win.show();
        win.maximize();
        loaderWin.destroy();
    });

    win.on('close', (e) => {
        e.preventDefault();
        win.destroy();
    });

    app.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(win === null) {
        createWindow();
    }
});