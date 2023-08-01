import { useState } from "react";
import { ToggleButton } from "react-bootstrap";

const GenreRadio = ({ genre, setGenre }) => {
    const [genreRadioValue, setGenreRadioValue] = useState('1');

    const genreRadios = [
      { name: 'All Genres', value: '1', genre: '' },
      { name: 'Rap', value: '2', genre: 'rap' },
      { name: 'R&B', value: '3', genre:'rb' },
      { name: 'Rock', value: '4', genre: 'rock' }
    ];

    return (
        <>
            {genreRadios.map((gRadio, idx) => (
                <ToggleButton
                    className='start-genre-buttons'
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    name="genreRadio"
                    value={gRadio.value}
                    checked={genreRadioValue === gRadio.value}
                    onChange={(e) => setGenreRadioValue(e.currentTarget.value)}
                    onClick={() => {
                        setGenre(gRadio.genre)
                        // console.log('genre', genre)
                        // console.log(genreRadioValue)
                    }}
                >
                    {gRadio.name}
                </ToggleButton>
            ))}
        </>
    )
}

export default GenreRadio