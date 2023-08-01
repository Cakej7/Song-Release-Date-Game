import { Button } from 'react-bootstrap';
import GenreRadio from './GenreRadio';

export const Start = ({ turnCounter, setTurnCounter, genre, setGenre, time, setTime }) => {

    return (
        <div className='start-container'>
            <div >
                <div>
                    <h3 className='start-choices'>Genre:</h3>
                    <GenreRadio genre={genre} setGenre={setGenre} />
                </div>

                <Button
                    id='start-button'
                    onClick={() => {
                        setTurnCounter(turnCounter + 1)
                    }}
                >
                Start
                </Button>
            </div>
        </div>
    )
}

export default Start