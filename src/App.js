import './App.css';

import AddressListBuilder from './AddressListBuilder';

const { ipcRenderer } = window.require('electron');

function App() {

  const handleMin = (e) => {
    const { id } = e.currentTarget;
    if (id === "min") ipcRenderer.send('minimize');
  }

  const handleClose = () => {
    if (window.confirm('Are you sure you wish to exit?')) ipcRenderer.send('exit-app');
  }

  return (
    <div className="App">
      <header><h1>Legacy Crawler</h1></header>
      <div className="close-button-container">
        <button className="remove-btn-style" onClick={handleMin} id="min">[▼]</button>&nbsp;
        <button className="remove-btn-style" onClick={handleClose} id="close">[X]</button>
      </div>
      <div className='ip-selection-container'>
        <div className='loaded-ips'>
          <AddressListBuilder />
        </div>
        <div className='add-remove-ips'>
          <button>&gt;</button>
          <button>&lt;</button>
        </div>
        <div className='selected-ips'>
          <p>This is selection container</p>
        </div>

      </div>

    </div>
  );
}

export default App;
