import './AddressListBuilder.css';
import addresses from './config/addresses.json'; //inventory of all addresses
import { useEffect, useState } from 'react';

function AddressListBuilder({ setIpAddresses, ipAddresses }) {
    const defaultNavKey = { site: "--select site--", mdc: "--all mdcs--", rack: "--all racks--" };
    const [navKey, setNavKey] = useState(defaultNavKey);
    const [formattedNavKey, setFormattedNavKey] = useState("None");
    const [mdcEnabled, setMdcEnabled] = useState(false);
    const [rackEnabled, setRackEnabled] = useState(false);
    const [sites, setSites] = useState(); //set current list of sites
    const [mdcs, setMdcs] = useState(); //set current list of mdcs (from selected site)
    const [racks, setRacks] = useState(); //set current list of racks (from selected sites/mdcs)

    useEffect(() => {
        if (addresses) {
            try {
                setSites(Object.keys(addresses));
            } catch (e) {
                console.log(e, 'JSON file is not formatted correctly!');
            }
        }
    }, []);
    //navKey is for building out select menues, storing actual addresses in ipAddresses state var
    //configure select menus (disabling and loading IP addresses)
    const handleSelectChange = (e) => {
        const { id, value } = e.currentTarget;
        if (id === "site" && value !== "--select site--") {
            setNavKey({ ...navKey, site: value, mdc: "", rack: "" });
            setMdcEnabled(true);
            setRackEnabled(false);
            setMdcs(Object.keys(addresses[value]));
            setIpAddresses(Object.values(addresses[value]).map(mdc => mdc.rackswitches)) //site IP addresses
            setFormattedNavKey(`All ${value} Rackswitches`)
        }
        if (id === "site" && value === "--select site--") {
            setNavKey({ site: "--select site--", mdc: defaultNavKey.mdc, rack: defaultNavKey.rack });
            setMdcEnabled(false);
            setRackEnabled(false);
            setMdcs([]);
            setRacks([]);
            setFormattedNavKey(`None`)
            setIpAddresses([]);
        }
        if (id === "mdc" && value !== `--all mdcs--`) {
            setNavKey({ ...navKey, mdc: value, rack: defaultNavKey.rack });
            setRackEnabled(true);
            setRacks(addresses[navKey.site][value].rackswitches);
            setIpAddresses(addresses[navKey.site][value].rackswitches);
            setFormattedNavKey(`${navKey.site} - All ${value.toUpperCase()} Rackswitches`);
        }
        if (id === "mdc" && value === `--all mdcs--`) {
            setNavKey({ ...navKey, mdc: defaultNavKey.mdc, rack: defaultNavKey.rack });
            setRackEnabled(false);
            setIpAddresses([Object.values(addresses[navKey.site]).map(mdc => mdc.rackswitches)].flat(2));
            setRacks([])
            setFormattedNavKey(`All ${navKey.site} Rackswitches`);
        }
        if (id === "rack" && value !== "--all racks--") {
            setNavKey({ ...navKey, rack: value });
            setIpAddresses([value]);
            setFormattedNavKey(`${navKey.site} - ${navKey.mdc.toUpperCase()} - Rackswitch ${value}`)
        }
        if (id === "rack" && value === "--all racks--") {
            setNavKey({ ...navKey, rack: racks});
            setIpAddresses(addresses[navKey.site][navKey.mdc].rackswitches);
            setFormattedNavKey(`All ${navKey.site} - ${navKey.mdc.toUpperCase()} Rackswitches`);
        }
    };

    return (
        <div>
            <p className='format-navkey-width'>You are currently adding: <span style={{fontWeight: "bold"}}>{formattedNavKey}</span></p>
            <div>
                {sites &&
                    <select className='select-site-width' id="site" onChange={handleSelectChange}>
                        <option defaultValue={defaultNavKey.site}>{defaultNavKey.site}</option>
                        {
                            sites.map((site, key) => {
                                return <option value={site} key={key}>{site}</option>
                            })
                        }
                    </select>}
                <select className='select-mdc-width' id="mdc" onChange={handleSelectChange} disabled={!mdcEnabled}>
                    <option defaultValue={defaultNavKey.mdc}>{defaultNavKey.mdc}</option>
                    {mdcs &&
                        mdcs.map((mdc, key) => {
                            return <option value={mdc} key={key}>All {mdc.toUpperCase()}</option>
                        })
                    }
                </select>
                <select className='select-rack-width' id="rack" onChange={handleSelectChange} disabled={!rackEnabled}>
                    <option defaultValue={defaultNavKey.rack}>{defaultNavKey.rack}</option>
                    {racks &&
                        racks.map((rack, key) => {
                            return <option value={rack} key={key + 1}>Rack Switch {rack}</option>
                        })
                    }
                </select>
            </div>
        </div>
    );
}

export default AddressListBuilder;