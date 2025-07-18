import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import Main from './Components/Main'

function App() {

  //state variable
  const [currentWord, setCurrentWord] = useState("NORWAY")
  const [guessedLetters, setGuessedLetters] = useState([])

  const wrongGuessesCount = guessedLetters.filter(
    letter => !currentWord.toLowerCase().includes(letter.toLowerCase())
  ).length;
  console.log(wrongGuessesCount);

  // Array of words
  const words = ["MACEDONIA", "NORWAY", "JAVASCRIPT", "MINECRAFT", "HULK", "HANGMAN"];


  const handleNewGame = () => {
    const randomIndex = Math.floor(Math.random() * words.length); // Random index
    setCurrentWord(words[randomIndex]); // Set the new word
    setGuessedLetters([]); // Reset the guessed letters
  };
  return (

    <div>


      <Header
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        wrongGuessesCount={wrongGuessesCount}
      />

      <Main
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        setGuessedLetters={setGuessedLetters}
        onNewGame={handleNewGame}
        wrongGuessesCount={wrongGuessesCount} />

    </div>

  )
}

export default App
