const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export function searchMailClientsElectron() {
  ipcRenderer.send('searchMailClients-req');
}

export function searchAttributesElectron() {
  ipcRenderer.send('searchAttributes-req');
}

export function composeMailElectron(sigRequest, mailClientName, mailClientPath, mailInfo) {
  ipcRenderer.send('composeMail-req', { sigRequest, mailClientName, mailClientPath, mailInfo });
}

export function saveSignatureRequestElectron(sigRequest, path) {
  ipcRenderer.send('saveSignatureRequest-req', { sigRequest, path });
}

export function setRequestElectron(sigRequest, date, recipient) {
  ipcRenderer.send('setRequest-req', { sigRequest, date, recipient });
}

export function retrieveRequestsElectron() {
  ipcRenderer.send('getAllRequests-req');
}

export function getSignatureSavePath() {
  return electron.remote.dialog.showSaveDialog({
    title: 'Save IRMA signature request',
    filters: [
      { name: 'IRMA Files', extensions: ['irma'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });
}
