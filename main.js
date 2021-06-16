const { app, BrowserWindow } = require('electron');

function createWindow () {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        width: 1980,
        height: 1200
    })

    win.webContents.openDevTools();
    win.loadFile('multistocks.html');
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});