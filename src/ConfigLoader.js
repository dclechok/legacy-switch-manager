import './ConfigLoader.css';
import { useState } from 'react';

function ConfigLoader({ queue }) {
    const BASE_URL = "http://localhost:5000/";
    const [selectedConfig, setSelectedConfig] = useState('--select config--')
    //"stock" configurations will auto-detect device model/version for applying the correct config (between 3750 and 2960 cisco switches)

    const handleSelect = (e) => {
        setSelectedConfig(e.currentTarget.value);
    };

    const handleConfigPush = (e) => {
        //validate if we want to push this configuration for sure (and queue is not empty)
        //assuming all switches selected in queue have the same username / password - enter username / password
        console.log(queue);
        if(queue.size === 0) return window.alert("Queue is empty!");
        async function serverCall() {
            try {
                const response = await fetch(BASE_URL + "ssh", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ data: { test: 'terst' } })
                });
                const jsonResponse = await response.json(); //json-ify readablestream data
                if (jsonResponse) return jsonResponse;
            } catch (e) {
                console.log(e, "Failed to make PUT request.");
            }
        }
        serverCall();
    };



    return (
        <div className="config-menu">
            <p>Choose Configuration:</p>
            <select value={selectedConfig} onChange={handleSelect}>
                <option id="default" defaultValue="--select config--">--select config--</option>
                <option id="stock" value="Mawson Stock">Mawson Stock</option>
                <option id="password" value="Change Password">Change Password</option>
                <option id="custom" value="Custom...">Custom...</option>
            </select><br /><br />
            <button id="push-config" onClick={handleConfigPush}>Push Configuration</button>
        </div>
    );
}

export default ConfigLoader;