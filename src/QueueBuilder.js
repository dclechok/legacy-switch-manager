import './QueueBuilder.css';

function QueueBuilder({ queue }) {
    console.log(queue)
    //build out queue box of selected IPs pre-pushing config
    //validate that we're not adding duplicates, or devices from conflicting areas
    return (
        <ul className="que-box">
            {queue && queue.map(qItem => <li>{qItem}</li>)}
        </ul>
    )
}

export default QueueBuilder;