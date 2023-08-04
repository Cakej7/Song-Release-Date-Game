import { Button } from 'react-bootstrap';
import GenreRadio from './GenreRadio';

export const Start = ({ turnCounter, setTurnCounter, genre, setGenre, time, setTime }) => {

    return (
        <div className='start-container'>
            <div className='start-flex'>
                <div>
                    <h3 className='start-genre-text'>Choose Genre:</h3>
                    <GenreRadio className='start-genre-flex' genre={genre} setGenre={setGenre} />
                </div>

                <Button
                    className='start-button'
                    onClick={() => {
                        setTurnCounter(turnCounter + 1)
                    }}
                >
                Play
                </Button>
            </div>
        </div>
    )
}

export default Start