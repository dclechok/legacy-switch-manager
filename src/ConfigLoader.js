import './ConfigLoader.css';

function ConfigLoader() {

    //"stock" configurations will auto-detect device model/version for applying the correct config (between 3750 and 2960 cisco switches)
    return (
        <div className="config-menu">
            <p>Choose Configuration:</p>
            <select>
                <option>--select config--</option>
                <option id="stock">Mawson Stock</option>
                <option id="password">Change Password</option>
                <option>Custom...</option>
            </select><br /><br />
            <button>Push Configuration</button>
        </div>
    );
}

export default ConfigLoader;