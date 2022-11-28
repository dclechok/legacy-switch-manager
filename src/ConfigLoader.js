import './ConfigLoader.css';
import { useState } from 'react';

function ConfigLoader() {
    const [selectedConfig, setSelectedConfig] = useState('--select config--')
    //"stock" configurations will auto-detect device model/version for applying the correct config (between 3750 and 2960 cisco switches)

    const handleSelect = (e) => {
        setSelectedConfig(e.currentTarget.value);
    };

    console.log(selectedConfig);

    return (
        <div className="config-menu">
            <p>Choose Configuration:</p>
            <select value={selectedConfig} onChange={handleSelect}>
                <option id="default" defaultValue="--select config--">--select config--</option>
                <option id="stock" value="Mawson Stock">Mawson Stock</option>
                <option id="password" value="Change Password">Change Password</option>
                <option id="custom" value="Custom...">Custom...</option>
            </select><br /><br />
            <button id="push-config">Push Configuration</button>
        </div>
    );
}

export default ConfigLoader;