import './ConfigLoader.css';

function ConfigLoader() {
    return (
        <div className="config-menu">
            <p>Choose Configuration:</p>
            <select>
                <option>Mawson 3750 Stock</option>
                <option>Mawson 2960 Stock</option>
                <option>Change Password</option>
                <option>Custom...</option>
            </select><br /><br />
            <button>Push Configuration</button>
        </div>
    );
}

export default ConfigLoader;