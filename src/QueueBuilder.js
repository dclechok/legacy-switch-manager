import './QueueBuilder.css';

function QueueBuilder({ queue }) {
    console.log(queue)
    //build out queue box of selected IPs pre-pushing config
    //validate that we're not adding duplicates, or devices from conflicting areas
    return (
        <div>
            {queue && <p className='total-in-que'>Total Devices in Queue: <span style={{fontWeight: "bold"}}>{queue.flat(2).length}</span></p>}
        <select class="form-select que-box" multiple aria-label="multiple select example size 5">
            {queue && queue.flat(2).map(qItem => <option>{qItem}</option>)}
        </select>
        </div>
    )
}

export default QueueBuilder;