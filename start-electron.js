const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const serve = require('electron-serve')

const loadURL = serve({ directory: 'build' })

let mainWindow
;(async () => {
  await app.whenReady()

  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    titleBarStyle: 'hidden'
  })

  mainWindow.removeMenu()

  if (!isDev) {
    await loadURL(mainWindow)
  } else {
    mainWindow.loadURL('http://localhost:3000')
  }

  // mainWindow.webContents.openDevTools()
})()
