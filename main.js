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
      settings: 'Settings',
      english: 'English',
      german: 'German',
      soundMenu: 'Sounds',
      on: 'Sound On',
      off: 'Sound Off',
      about: 'Info',
      quit: 'Quit'
    },
    de: {
      languageMenu: 'Sprache',
      settings: 'Einstellungen',
      english: 'Englisch',
      german: 'Deutsch',
      soundMenu: 'Sound',
      on: 'Sound An',
      off: 'Sound Aus',
      about: 'Info',
      quit: 'Beenden'
    },
  };

  let isGermanChecked = true;
  let isEnglishChecked = false;

  let isSoundOn = true;
  let isSoundOff = false;

  if(savedLanguage === 'en') {
    isGermanChecked = false;
    isEnglishChecked = true;
  } else {
    isGermanChecked = true;
    isEnglishChecked = false;
  }

  if(savedSound === 'on') {
    isSoundOn = true;
    isSoundOff = false;
  } else {
    isSoundOn = false;
    isSoundOff = true;
  }

  updateMenu();

  function updateMenu() {
    // Remove the menu
    if (process.platform === 'darwin') {
      const template = [
        {
          label: 'Bingo',
          submenu: [
            {
              role: 'about'
            },
            {
              type: 'separator'
            },
            {
              label: translations[savedLanguage].settings,
              submenu: [
                {
                  label: translations[savedLanguage].languageMenu,
                  submenu: [
                    {
                        label: translations[savedLanguage].german,
                        type: 'checkbox',
                        checked: isGermanChecked,
                        click() {
                            isGermanChecked = true;
                            isEnglishChecked = false;
                            win.webContents.send('language-changed', 'de');
                            savedLanguage = 'de'
                            saveSettings({ language: savedLanguage, sound: savedSound}); // Save the preference
                            updateMenu();
                        }
                    },
                    {
                        label: translations[savedLanguage].english,
                        type: 'checkbox',
                        checked: isEnglishChecked,
                        click() {
                            isGermanChecked = false;
                            isEnglishChecked = true;
                            win.webContents.send('language-changed', 'en');
                            savedLanguage = 'en'
                            saveSettings({ language: savedLanguage, sound: savedSound}); // Save the preference
                            updateMenu();
                        }
                    }
                  ]
                },
                {
                  label: translations[savedLanguage].soundMenu,
                  submenu: [
                    {
                      label: translations[savedLanguage].on,
                      type: 'checkbox',
                        checked: isSoundOn,
                      click() {
                          isSoundOn = true;
                          isSoundOff = false;
                          win.webContents.send('sound-changed', 'on');
                          savedSound = 'on'
                          saveSettings({ language: savedLanguage, sound: savedSound }); // Save the preference
                          updateMenu();
                      }
                    },
                    {
                      label: translations[savedLanguage].off,
                      type: 'checkbox',
                      checked: isSoundOff,
                      click() {
                        isSoundOn = false;
                        isSoundOff = true;
                          win.webContents.send('sound-changed', 'off');
                          savedSound = 'off'
                          saveSettings({ language: savedLanguage, sound: savedSound }); // Save the preference
                          updateMenu();
                      }
                    }
                  ]
                }
              ]
          },
          {
            type: 'separator'
          },
            {
              role: 'hide'
            },
            {
              role: 'hideothers'
            },
            {
              role: 'unhide'
            },
            {
              type: 'separator'
            },
            {
              label: translations[savedLanguage].quit,
              role: 'quit'
            }]
        }
      ];

      Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    } else {
      const template = [
        {
          label: 'Bingo',
          submenu: [
            {
              label: translations[savedLanguage].about,
              role: 'about'
            },
            {
              type: 'separator'
            },
            {
              label: translations[savedLanguage].quit,
              role: 'quit'
            }
          ]
        },
        {
          label: translations[savedLanguage].settings,
          submenu: [
            {
              label: translations[savedLanguage].languageMenu,
              submenu: [
                {
                    label: translations[savedLanguage].german,
                    type: 'checkbox',
                    checked: isGermanChecked,
                    click() {
                        isGermanChecked = true;
                        isEnglishChecked = false;
                        win.webContents.send('language-changed', 'de');
                        savedLanguage = 'de'
                        saveSettings({ language: savedLanguage, sound: savedSound}); // Save the preference
                        updateMenu();
                    }
                },
                {
                    label: translations[savedLanguage].english,
                    type: 'checkbox',
                    checked: isEnglishChecked,
                    click() {
                        isGermanChecked = false;
                        isEnglishChecked = true;
                        win.webContents.send('language-changed', 'en');
                        savedLanguage = 'en'
                        saveSettings({ language: savedLanguage, sound: savedSound}); // Save the preference
                        updateMenu();
                    }
                }
              ]
            },
            {
              label: translations[savedLanguage].soundMenu,
              submenu: [
                {
                  label: translations[savedLanguage].on,
                  type: 'checkbox',
                    checked: isSoundOn,
                  click() {
                      isSoundOn = true;
                      isSoundOff = false;
                      win.webContents.send('sound-changed', 'on');
                      savedSound = 'on'
                      saveSettings({ language: savedLanguage, sound: savedSound }); // Save the preference
                      updateMenu();
                  }
                },
                {
                  label: translations[savedLanguage].off,
                  type: 'checkbox',
                  checked: isSoundOff,
                  click() {
                    isSoundOn = false;
                    isSoundOff = true;
                      win.webContents.send('sound-changed', 'off');
                      savedSound = 'off'
                      saveSettings({ language: savedLanguage, sound: savedSound }); // Save the preference
                      updateMenu();
                  }
                }
              ]
            }
          ]
      }
      ];

      Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    }
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