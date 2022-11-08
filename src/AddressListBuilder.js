import './AddressListBuilder.css';
import addresses from './config/addresses.json'; //inventory of all addresses
import { useState } from 'react';

function AddressListBuilder() {

    const [siteChecked, setSiteChecked] = useState(false);

    const siteCheckHandler = (e) => {
        console.log(e.currentTarget.value)
    };

    return (

    <div className="address-box">
        <ul>
            {
                Object.keys(addresses).map((listItem, key) => {
                    return (<><li id={listItem} key={key}><input type="checkbox" value={listItem} checked={siteChecked} onChange={siteCheckHandler}/><label htmlFor={listItem}>{listItem}</label></li></>)
                })
            }
        </ul>
    {/* <input type="checkbox" />
    <label>Midland, PA</label><br />
    &nbsp;&nbsp;<input type="checkbox" />
    <label htmlFor="all-ips">Rack Switches</label><br />


    &nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" />
    <label>MDC01</label><br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" />
    <label>10.1.1.200</label><br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" />
    <label>10.1.2.200</label><br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" />
    <label>10.1.3.200</label><br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" />
    <label>10.1.4.200</label><br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" />
    <label>10.1.5.200</label><br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" />
    <label>10.1.6.200</label><br />
    &nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" />
    <label>MDC02</label><br />
    &nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" />
    <label>MDC03</label><br />
    &nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" />
    <label>MDC04</label><br />

    &nbsp;&nbsp;<input type="checkbox" />
    <label htmlFor="all-ips">Core Switches</label><br />
    <hr />
    <input type="checkbox" />
    <label>Sharon, PA</label><br /> */}
    </div>  
    );
}

export default AddressListBuilder;