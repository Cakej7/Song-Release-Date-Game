import {useState, useEffect} from 'react'
import { MultipleChoice } from './MultChoice';
import { Card, Spinner } from 'react-bootstrap';

function durstenfeldShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function DateGameCard({ genre, turnCounter, setTurnCounter, setScore, score, time }) {
  const [songList, setSongList] = useState([])
  const [shuffledSongs, setShuffledSongs] = useState([])
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // console.log('songList:', songList);
    shuffleSongsFunc()
  }, [songList]);

  useEffect(() => {
    // console.log('shuffledSongs:', shuffledSongs);
  }, [shuffledSongs]);

  let genreRap = 'chart_genre=rap&'
  let genreRB = 'chart_genre=rb&'
  let genreRock = 'chart_genre=rock&'

  async function fetchSongs () {
    const url = `https://genius-song-lyrics1.p.rapidapi.com/chart/songs/?time_period=all_time&${genre === 'rap' ? genreRap : 
    genre === 'rb' ? genreRB :
    genre === 'rock' ? genreRock :
    ''
    }per_page=50&page=1`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6cd92ec021msh5cbd22f131e99d1p179c6ajsn6eb6e63451bd',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
      }
    }
    try {
      setLoading(true)
      const response = await fetch(url, options);
      const result = await response.json();
      setSongList(result.chart_items)
      setLoading(false)
    } catch (error) {
      console.error(error);
      setError('Failed to fetch songs. Please try again later.');
      setLoading(false)
    }
  };

useEffect(() => {
  fetchSongs()
}, []);

// Function to shuffle the songs array and set the state
const shuffleSongsFunc = () => {
  const _shuffledSongs = Array.isArray(songList) ?
    durstenfeldShuffle(songList) 
    : [];
  setShuffledSongs(_shuffledSongs);
};

const currentSong = shuffledSongs[currentSongIndex]

// console.log(songList)

function LoadingScreen () {
	return (
		<div className='loading-screen'>
		    <Spinner animation="border" role="status">
      			<span className="visually-hidden"></span>
    		</Spinner>
		</div>
		
	)
}

if (loading) {
    return <LoadingScreen />
}

return (
  <div className='card-container'>
    <Card 
      className='main-card'
      style={{ width: '18rem' }}
    >
      {error ? (
        <div>{error}</div>
      ) : (
        songList.length > 0 && shuffledSongs.length > 0 && currentSongIndex < shuffledSongs.length && (
          <>
          <Card.Img
            className='card-img'
            variant="top"
            src={currentSong.item.header_image_thumbnail_url}
          />
          <Card.Body>
            <Card.Title>{currentSong.item.title}</Card.Title>
            <Card.Text>
            By {currentSong.item.artist_names}
            </Card.Text>
            <Card.Body className='mult-choice-container'>

              <MultipleChoice
                currentSong={currentSong} 
                currentSongIndex={currentSongIndex} 
                setCurrentSongIndex={setCurrentSongIndex} 
                turnCounter={turnCounter} 
                setTurnCounter={setTurnCounter}
                setScore={setScore}
                score={score}
              />

            </Card.Body>
            <Card.Text>{turnCounter}/10</Card.Text>
          </Card.Body>
          </>
        )
      )}
    </Card>
  </div>
);
} 