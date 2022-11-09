import './App.css';

import AddressListBuilder from './AddressListBuilder';
import QueueBuilder from './QueueBuilder';

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
      <header>
        <h1>Lyra</h1>
        <h2>Mass Affect Legacy Switch Configurations</h2>
      </header>
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
          <QueueBuilder />
        </div>

      </div>
    
    <footer>Powered by Mawson Infrastructure Group © 2022</footer>
    </div>
  );
}

export default App;
