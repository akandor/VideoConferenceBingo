const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    onLanguageChanged: (callback) => ipcRenderer.on('language-changed', callback),
    getLanguage: () => ipcRenderer.sendSync('get-language'),
    openDialog: (method, config) => ipcRenderer.invoke('dialog', method, config),
    quitApp: () => ipcRenderer.send('quit-app')
});
