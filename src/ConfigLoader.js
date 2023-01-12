import './ConfigLoader.css';
import { useState } from 'react';

function ConfigLoader({ queue }) {
    // const BASE_URL = "http://localhost:5000/";
    const [blobPromise, setBlobPromise] = useState(); //stores text data parsed from .txt file upload
    const [giveNonValidationWarning, setGiveNonValidationWarning] = useState(false); //only warn once while app is loaded that Lyra does not validate configurations
    // const [secretAndPassword, setSecretAndPassword] = useState({ secret: '', password: '' });

    const handleConfigSubmit = async (e) => {
        e.preventDefault();
        if(e.currentTarget.id === 'stop') window.alert('Stopped!'); //cancel config push
        if(e.currentTarget.id === 'push'){
            if(!blobPromise) return window.alert('No valid configuration has been uploaded!');
            if(!giveNonValidationWarning){
                setGiveNonValidationWarning(true);
                window.confirm('Lyra does not validate your configuration! Please check that you have uploaded a valid configuration. Click OK if you wish to proceed. (Read documentation to see how configurations need to be formatted.)');
            }
            //if file uploaded was valid .txt file, and turned into blob of text, prompt for secret/password and proceed with applying configurations to switch list
            console.log(blobPromise);
        }
    };

    const handleUploadFile = async (e) => {
        //create blob and read data from text file
        e.preventDefault();
        if(e.currentTarget.files[0].type !== "text/plain"){ //accept text files only
            document.getElementById('new-config').value = ""; //if not text file clear upload
            return window.alert('Uploaded configuration must be in ".txt" format only!');
        
        }
        else{
            const textBlob = new Blob(e.currentTarget.files);
            setBlobPromise(await Promise.resolve(textBlob.text()));
        }
    }

    // const handleConfigPush = (e) => {
    //     //validate if we want to push this configuration for sure (and queue is not empty)
    //     //assuming all switches selected in queue have the same username / password - enter username / password
    //     if (queue.size === 0) return window.alert("Queue is empty!");
    //     async function serverCall() {
    //         try {
    //             const response = await fetch(BASE_URL + "ssh", {
    //                 method: "PUT",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     data: {
    //                         // stock: stockConf, //true or false if stock configuration is selected
    //                         queue: Array.from(queue) //turn set of queued items into an array
    //                     }
    //                 })
    //             });
    //             const jsonResponse = await response.json(); //json-ify readablestream data
    //             if (jsonResponse) return jsonResponse;
    //         } catch (e) {
    //             console.log(e, "Failed to make PUT request.");
    //         }
    //     }
    //     serverCall();
    // };


    return (
        <div className="config-menu">
            <form>
                <label htmlFor='new-config'>Upload Configuration (.txt file only)</label><br />
                <input type="file" id="new-config" name="new-config" accept=".txt" onChange={handleUploadFile}/><br /><br />
                <button id="push" onClick={handleConfigSubmit}>Push Configuration</button>
                <button id="stop" onClick={handleConfigSubmit}>Stop</button>
            </form>
        </div>
    );
}

export default ConfigLoader;