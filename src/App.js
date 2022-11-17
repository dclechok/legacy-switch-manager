import './App.css';

import { useState } from 'react';
import AddressListBuilder from './AddressListBuilder';
import QueueBuilder from './QueueBuilder';
import ConfigLoader from './ConfigLoader';
import OutputLog from './OutputLog';

const { ipcRenderer } = window.require('electron');

function App() {

  const [ipAddresses, setIpAddresses] = useState([]);
  const [queue, setQueue] = useState([]); //stores what is in queue to be configured
  const [selected, setSelected] = useState([]); //for setting selected menu items in queue

  const handleMin = (e) => {
    const { id } = e.currentTarget;
    if (id === "min") ipcRenderer.send('minimize');
  }

  const handleClose = () => {
    if (window.confirm('Are you sure you wish to exit?')) ipcRenderer.send('exit-app');
  }

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    //flatten if multiple arrays (MDCs) are included, and build a set incase of duplicates
    if(id === "add") setQueue(new Set([...queue, ipAddresses.flat(4)].flat(2))); 
    if(id === "remove"){
      //create a new queue, from a set, that is a filtered queue based on what exists in selected
      setQueue(new Set(Array.from(queue).filter(qItem => !selected.find(sel => qItem === sel))));
      //remove "checked" values from selected queue once removed from queue list, this destroys highlights of non-selected IPs
      const thisQ = document.getElementById("que-builder");
      thisQ.value = [];
    }
  };


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
          <AddressListBuilder setIpAddresses={setIpAddresses} ipAddresses={ipAddresses} />
        </div>
        <div className='add-remove-ips'>
          <button onClick={handleClick} id="add">&gt;</button>
          <button onClick={handleClick} id="remove">&lt;</button>
        </div>
        <div className='selected-ips'>
          <QueueBuilder queue={queue} selected={selected} setSelected={setSelected} />
        </div>
      </div>
      <ConfigLoader />
      <OutputLog />
    <footer>Powered by Mawson Infrastructure Group © 2022</footer>
    </div>
  );
}

export default App;
