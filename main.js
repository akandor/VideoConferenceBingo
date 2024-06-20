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
  let savedLanguage = settings.language || 'de'; // Default to 'de' if no preference is saved
  let savedSound = settings.sound || 'on';
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('language-changed', savedLanguage);
    win.webContents.send('sound-changed', savedSound);
  });

  const translations = {
    en: {
      languageMenu: 'Language',
      english: 'English',
      german: 'German',
      soundMenu: 'Sounds',
      on: 'Sound On',
      off: 'Sound Off'
    },
    de: {
      languageMenu: 'Sprache',
      english: 'Englisch',
      german: 'Deutsch',
      soundMenu: 'Geräusche',
      on: 'Geräusche An',
      off: 'Geräusche Aus'
    },
  };

  // Remove the menu
  if (process.platform === 'darwin') {
    const template = [
      {
        label: app.getName(),
        submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'hide' }, { role: 'hideothers' }, { role: 'unhide' }, { type: 'separator' }, { role: 'quit' }]
      },
      {
        label: translations[savedLanguage].languageMenu,
        submenu: [
            {
                label: translations[savedLanguage].german,
                click() {
                    win.webContents.send('language-changed', 'de');
                    savedLanguage = 'de'
                    saveSettings({ language: savedLanguage, sound: savedSound}); // Save the preference
                }
            },
            {
                label: translations[savedLanguage].english,
                click() {
                    win.webContents.send('language-changed', 'en');
                    savedLanguage = 'en'
                    saveSettings({ language: savedLanguage, sound: savedSound}); // Save the preference
                }
            }
            // Add more languages as needed
        ]
    },
    {
      label: translations[savedLanguage].soundMenu,
      submenu: [
          {
              label: translations[savedLanguage].on,
              click() {
                  win.webContents.send('sound-changed', 'on');
                  savedSound = 'on'
                  saveSettings({ language: savedLanguage, sound: savedSound }); // Save the preference
              }
          },
          {
              label: translations[savedLanguage].off,
              click() {
                  win.webContents.send('sound-changed', 'off');
                  savedSound = 'off'
                  saveSettings({ language: savedLanguage, sound: savedSound }); // Save the preference
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
        label: translations[savedLanguage].languageMenu,
        submenu: [
            {
                label: translations[savedLanguage].german,
                click() {
                    win.webContents.send('language-changed', 'de');
                    saveSettings({ language: 'de' }); // Save the preference
                }
            },
            {
                label: translations[savedLanguage].english,
                click() {
                    win.webContents.send('language-changed', 'en');
                    saveSettings({ language: 'en' }); // Save the preference
                }
            }
            // Add more languages as needed
        ]
    },
    {
      label: translations[savedLanguage].soundMenu,
      submenu: [
          {
              label: translations[savedLanguage].on,
              click() {
                  win.webContents.send('sound-changed', 'on');
                  savedSound = 'on'
                  saveSettings({ language: savedLanguage, sound: savedSound }); // Save the preference
              }
          },
          {
              label: translations[savedLanguage].off,
              click() {
                  win.webContents.send('sound-changed', 'off');
                  savedSound = 'off'
                  saveSettings({ language: savedLanguage, sound: savedSound }); // Save the preference
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