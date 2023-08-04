import './App.css';
import React from 'react';
import { useState } from 'react';
import DateGameCard from './Components/DateGameCard';
import Start from './Components/Start';
import Score from './Components/Score';
import Header from './Components/Header';

const App = () => {
  const [genre, setGenre] = useState('')
  const [time, setTime] = useState('')
  const [turnCounter, setTurnCounter] = useState(0)
  const [score, setScore] = useState(0)

  return (
    <>
      <Header />
      
      <div className='app-container'>

        {turnCounter === 0 ?
          <Start genre={genre} setGenre={setGenre} turnCounter={turnCounter} setTurnCounter={setTurnCounter} time={time} setTime={setTime} />
          :
          null
        } 
          {console.log(`app.js genre:`, genre)}
        {turnCounter >= 1 && turnCounter <= 10 ? 
          <DateGameCard genre={genre} turnCounter={turnCounter} setTurnCounter={setTurnCounter} setScore={setScore} score={score} time={time} />
          :
          null
        }
        {turnCounter > 10 ? 
          <Score score={score} setScore={setScore} setTurnCounter={setTurnCounter} setGenre={setGenre} setTime={setTime} />
          :
          null
        }
      </div>
    </>
  )
}

export default App;
