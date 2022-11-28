import './OutputLog.css';

import { useState } from 'react';
// import doSSH from './ssh/nodeSsh';
const BASE_URL = "http://localhost:5000/";

function OutputLog() {

  // const [outputStream, setOutputStream] = useState();

  // setOutputStream(doSSH);export async '
  async function serverCall() {
    try {
      const response = await fetch(BASE_URL + "ssh", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { test: 'terst'} })
      });
      const jsonResponse = await response.json(); //json-ify readablestream data
      if (jsonResponse) return jsonResponse;
    } catch (e) {
      console.log(e, "Failed to make PUT request.");
    }
  }
  serverCall();

  return (
    <div className="output-log">
      <p>Output</p>
    </div>
  );
}

export default OutputLog;