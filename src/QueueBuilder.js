import './QueueBuilder.css';

function QueueBuilder({ queue }) {
    console.log(queue)
    return (
        <ul className="que-box">
            {queue && queue.map(qItem => <li>{qItem}</li>)}
        </ul>
    )
}

export default QueueBuilder;