import './AddressListBuilder.css';
import addresses from './config/addresses.json'; //inventory of all addresses
import { useEffect, useState } from 'react';

function AddressListBuilder() {

    const [navKey, setNavKey] = useState({ site: "--select site--", mdc: "", rack: ""});
    const [formattedNavKey, setFormattedNavKey] = useState();
    const [mdcEnabled, setMdcEnabled] = useState(false);
    const [rackEnabled, setRackEnabled] = useState(false);
    const [sites, setSites] = useState(); //set current list of sites
    const [mdcs, setMdcs] = useState(); //set current list of mdcs (from selected site)
    const [racks, setRacks] = useState(); //set current list of racks (from selected sites/mdcs)
    const siteCheckHandler = (e) => {
        console.log(e.currentTarget.value)
    };

    useEffect(() => {
        if (addresses) {
            try {
                setSites(Object.keys(addresses));
            } catch (e) {
                console.log(e, 'JSON file is not formatted correctly!');
            }
        }
    }, []);

    const handleSelectChange = (e) => {
        const { id, value } = e.currentTarget;
        if(id === "site" && value !== "--select site--"){
            setNavKey({...navKey, site: value, mdc: "", rack: ""});
            setMdcEnabled(true);
            setMdcs(Object.keys(addresses[value]));
            setFormattedNavKey(`All ${value} Rackswitches`)
        }
        if(id === "site" && value === "--select site--"){
            setNavKey({site: "--select site--", mdc: `All ${navKey.mdc} MDCs`, rack: ""});
            setMdcEnabled(false);
            setRackEnabled(false);
            setMdcs([])
            setFormattedNavKey(`None`)
        }
        if(id === "mdc" && value !== `All ${navKey.site} MDCs`){
            setNavKey({...navKey, mdc: value, rack: ""});
            setRackEnabled(true);
            setRacks(addresses[navKey.site][value].rackswitches);
            setFormattedNavKey(`${navKey.site} - All ${value.toUpperCase()} Rackswitches`)
        }
        if(id === "mdc" && value === `All ${navKey.site} MDCs`){
            setNavKey({...navKey, rack: `All ${navKey.site} Racks`});
            setRackEnabled(false);
            setRacks([]);
            setFormattedNavKey(`All ${navKey.site} Rackswitches`)
        }
        if(id === "rack" && value !== "--select rack--"){
            setNavKey({...navKey, rack: `All ${navKey.site} Racks`});
            setFormattedNavKey(`${navKey.site} - ${navKey.mdc.toUpperCase()} - Rackswitch ${value}`)
        }
    };

    return (
        <div>
        <p>You are currently adding: {formattedNavKey}</p>
        <div>
            {sites &&
                <select id="site" onChange={handleSelectChange}>
                    <option defaultValue="--select site--">--select site--</option>
                    {
                        sites.map((site, key) => {
                            return <option value={site} key={key}>{site}</option>
                        })
                    }
                </select>}
                <select id="mdc" onChange={handleSelectChange} disabled={!mdcEnabled}>
                    {navKey.site !== "--select site--" && <option defaultValue={`All ${navKey.site} MDCs`}>All {navKey.site} MDCs</option>}
                    {mdcs &&
                        mdcs.map((mdc, key) => {
                            return <option value={mdc} key={key}>All {mdc.toUpperCase()}</option>
                        })
                    }
                </select>
                <select id="rack" onChange={handleSelectChange} disabled={!rackEnabled}>
                    {navKey.site !== "--select site--" && <option defaultValue={'--select rack--'}>--select rack--</option>}
                    {racks &&
                        racks.map((rack, key) => {
                            return <option value={rack} key={key}>Rack Switch {rack}</option>
                        })
                    }
                </select>
        </div>
        </div>
    );
}

export default AddressListBuilder;