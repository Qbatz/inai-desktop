const { app, BrowserWindow } = require("electron");

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

 
  mainWindow.loadURL("https://inaidev.s3remotica.com/");

  mainWindow.webContents.on("did-fail-load", () => {
    console.log("Failed to load URL, retrying in 1 second...");
    setTimeout(() => mainWindow.loadURL("https://inaidev.s3remotica.com/"), 1000);
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const newWindow = new BrowserWindow({
        width: 800,
        height: 600,
      });
      newWindow.loadURL("https://inaidev.s3remotica.com/");
    }
  });
});
