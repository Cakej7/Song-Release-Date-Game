import { Button } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';


const Score = ({ score, setScore, setTurnCounter, setGenre, setTime }) => {

    return (
        <div id='score-progress-bar'>
            <h1 id='score-you-scored'>You scored {score}/10</h1>
            <ProgressBar now={score * 10} />
            <Button
                className='score-play-again-button'
                onClick={() => {
                    setTurnCounter(0)
                    setScore(0)
                    setGenre('')
                    setTime('all_time')
                }}
            >
                Play Again
            </Button>
        </div>
    )
}

export default Score