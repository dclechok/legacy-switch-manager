import './QueueBuilder.css';

function QueueBuilder({ queue, selected, setSelected }) {
    //build out queue box of selected IPs pre-pushing config
    //validate that we're not adding duplicates, or devices from conflicting areas

    const handleSelected = (e) => {
        const { selectedOptions } = e.currentTarget;
        setSelected(Array.from(selectedOptions).map(choice => choice.innerText));
        // console.log(selectedOptions);
    };

    return (
        <div>
            {queue && <p className='total-in-que'>Total Devices in Queue: <span style={{fontWeight: "bold"}}>{queue.size}</span></p>}
        <select id="que-builder" className="form-select que-box" multiple aria-label="multiple select example size 5" onChange={handleSelected}>
            {queue && Array.from(queue).map((qItem, key) => <option key={key}>{qItem}</option>).sort((a, b) => {
                const destructureA = a.props.children.split('.'); // ['10', '2', '13', '200']
                const destructureB = b.props.children.split('.'); // ['10', '7', '3', '200']
                console.log(destructureA[1], destructureB[1])
                // console.log(Number(destructureA) - Number(destructureB));
                if(Number(destructureA[1]) > Number(destructureB[1])) return 1;
                if(Number(destructureA[1]) < Number(destructureB[1])) return -1;
                if(Number(destructureA[2]) > Number(destructureB[2])) return 1;
                if(Number(destructureA[2]) < Number(destructureB[2])) return -1;
            })}
        </select>
        </div>
    )
}

export default QueueBuilder;