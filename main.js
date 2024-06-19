const { app, ipcMain, BrowserWindow, Menu, dialog } = require('electron')
const path = require('path');
const fs = require('fs');

const userDataPath = app.getPath('userData');
const settingsFilePath = path.join(userDataPath, 'settings.json');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 680,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
  }
  })

  // Function to read settings from file
function readSettings() {
  try {
    return JSON.parse(fs.readFileSync(settingsFilePath));
  } catch (error) {
    return {};
  }
}

// Function to save settings to file
function saveSettings(settings) {
  fs.writeFileSync(settingsFilePath, JSON.stringify(settings));
}

  win.loadFile('index.html')

  //win.webContents.openDevTools();

  const settings = readSettings();
  const savedLanguage = settings.language || 'de'; // Default to 'en' if no preference is saved
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('language-changed', savedLanguage);
  });

  // Remove the menu
  if (process.platform === 'darwin') {
    const template = [
      {
        label: app.getName(),
        submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'hide' }, { role: 'hideothers' }, { role: 'unhide' }, { type: 'separator' }, { role: 'quit' }]
      },
      {
        label: '🌎',
        submenu: [
            {
                label: '🇩🇪 Deutsch',
                click() {
                    //store.set('language', 'de');
                    win.webContents.send('language-changed', 'de');
                    saveSettings({ language: 'de' }); // Save the preference
                }
            },
            {
                label: '🇬🇧 English',
                click() {
                    //store.set('language', 'en');
                    win.webContents.send('language-changed', 'en');
                    saveSettings({ language: 'en' }); // Save the preference
                }
            }
            // Add more languages as needed
        ]
    }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  } else {
    const template = [
      {
        label: '🌎',
        submenu: [
            {
                label: 'Deutsch',
                click() {
                    //store.set('language', 'de');
                    win.webContents.send('language-changed', 'de');
                    saveSettings({ language: 'de' }); // Save the preference
                }
            },
            {
                label: 'English',
                click() {
                    //store.set('language', 'en');
                    win.webContents.send('language-changed', 'en');
                    saveSettings({ language: 'en' }); // Save the preference
                }
            }
            // Add more languages as needed
        ]
    }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  }
}

app.whenReady().then(() => {
  ipcMain.handle('dialog', (event, method, params) => {       
    return dialog[method](params);
  });
  ipcMain.on('quit-app', () => {
    app.quit(); // Quit the Electron application
  });
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })