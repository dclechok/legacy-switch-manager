import './ConfigLoader.css';
import { useState } from 'react';

function ConfigLoader({ queue }) {
    const BASE_URL = "http://localhost:5000/";
    const [config, setConfig] = useState();
    const [clickVal, setClickVal] = useState();
    const [stockConf, setStockConf] = useState(false);

    const handleConfigSubmit= (e) => {
        e.preventDefault();
        //validate that we have a text file
        console.log(e.currentTarget.id);
        if(e.target.id === 'stop') window.alert('Stopped!');
        else if(e.currentTarget.id === 'push'){
            window.confirm('Lyra does not validate your configuration! Please check that you have uploaded a valid configuration. Click OK if you wish to proceed. (Read documentation to see how configurations need to be formatted.)');
            console.log(e.target);
            // setConfig(e.target[0].file);
            // var fileReader = new FileReader();
            // fileReader.readAsText(config);
        }

    };

    const handleConfigClick = (e) => {
        setClickVal(e.currentTarget.id);
    }

    const handleConfigPush = (e) => {
        //validate if we want to push this configuration for sure (and queue is not empty)
        //assuming all switches selected in queue have the same username / password - enter username / password
        if (queue.size === 0) return window.alert("Queue is empty!");
        if (config === "--select config--") return window.alert("A configuration must be selected!");
        async function serverCall() {
            try {
                const response = await fetch(BASE_URL + "ssh", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data: {
                            stock: stockConf, //true or false if stock configuration is selected
                            queue: Array.from(queue) //turn set of queued items into an array
                        }
                    })
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
            <form>
                <input type="file" name="new-config" accept=".txt" /><br /><br />
                <button id="push" onClick={handleConfigSubmit}>Push Configuration</button>
                <button id="stop" onClick={handleConfigSubmit}>Stop</button>
            </form>
        </div>
    );
}

export default ConfigLoader;