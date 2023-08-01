import Swal from 'sweetalert2'
import { Button } from 'react-bootstrap';

export const MultipleChoice = ({ currentSong, currentSongIndex, setCurrentSongIndex, turnCounter, setTurnCounter, setScore, score }) => {
    if (!currentSong || currentSongIndex === undefined || isNaN(currentSongIndex)) {
        return null; // Return null if currentSong or currentSongIndex is not valid
      }

    let randomYearArray = []
	const correctDate = currentSong?.item.release_date_components.year
    let currentYear =  new Date().getFullYear();

	const randYearFunc = () => {
		const releaseYearMin = currentSong?.item.release_date_components.year - 4
		const releaseYearMax = currentSong?.item.release_date_components.year + 4
		
		while (randomYearArray.length < 3) {
			const randomDate = Math.floor(Math.random() * (releaseYearMax - releaseYearMin) + releaseYearMin)
			if (randomDate !== correctDate && randomYearArray.indexOf(randomDate) === -1 && randomDate <= currentYear) {
				randomYearArray.push(randomDate)
			}
		}
		randomYearArray.push(correctDate)
		randomYearArray.sort((a, b) => 0.5 - Math.random())
	}
    
    randYearFunc()

    // console.log('randomYearArray:', randomYearArray)

    return (
        randomYearArray?.map((year, index) => {
            const key = currentSongIndex + index
            return (
                <div
                    key={key} 
                    className='mult-choice-buttons'
                > 
                        <Button variant='dark'

                            onClick={() => {
                                if (year === correctDate && currentSongIndex <= 9) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Correct!',
                                        showConfirmButton: false,
                                        timer: 1400
                                    })
                                    if (turnCounter <= 10) {
                                        setTurnCounter(turnCounter + 1)
                                        setCurrentSongIndex(currentSongIndex + 1)
                                        setScore(score + 1)
                                    }
                                } else if (currentSongIndex <= 9) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title: `Wrong! The correct answer is ${correctDate}`,
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    if (turnCounter <= 10) {
                                        setTurnCounter(turnCounter + 1)
                                        setCurrentSongIndex(currentSongIndex + 1)
                                    }
                                }
                            }}
                        >{year}</Button>
                </div>   
            )
        })
    )
}