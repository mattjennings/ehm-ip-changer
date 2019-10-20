const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const serve = require('electron-serve')

const loadURL = serve({ directory: 'build' })

let mainWindow
;(async () => {
  await app.whenReady()

  mainWindow = new BrowserWindow({
    width: 500,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    },
    titleBarStyle: 'hidden'
  })

  if (!isDev) {
    await loadURL(mainWindow)
  } else {
    mainWindow.loadURL('http://localhost:3000')
  }

  // mainWindow.webContents.openDevTools()
})()
