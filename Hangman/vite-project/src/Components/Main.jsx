import React, { useState } from 'react';

const Main = ({ currentWord, guessedLetters, setGuessedLetters, onNewGame, wrongGuessesCount }) => {

  //static value
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const maxWrongGuesses = 9



  // Determine if the player has won or lost
  const isGameLost = wrongGuessesCount >= maxWrongGuesses;
  const isGameWon = currentWord
    .split('')
    .every(letter => guessedLetters.includes(letter.toLowerCase()) || guessedLetters.includes(letter.toUpperCase()));

  // Disable the buttons when the game is over
  const isGameOver = isGameLost || isGameWon;




  // Adds guessed letters to the guessedLetters state if not already present
  function addGuessedLetters(letter) {
    // Add the letter to guessedLetters if it hasn't been guessed
    if (!guessedLetters.includes(letter) && !isGameOver) {
      setGuessedLetters((prevLetters) => [...prevLetters, letter]);
    }
  }


  // Determines the button class based on whether the letter is guessed and correct/incorrect
  const getButtonClass = (letter) => {
    const isGuessed = guessedLetters.includes(letter); // Check if the letter has been guessed
    const normalizedWord = currentWord.toUpperCase();
    const isCorrect = normalizedWord.includes(letter.toUpperCase());    // Check if the letter is in the word
    const isWrong = isGuessed && !isCorrect;            // If guessed and wrong

    // Debugging output for clarification
    console.log(`Letter: ${letter}, Guessed: ${isGuessed}, Correct: ${isCorrect}, Wrong: ${isWrong}`);

    if (isCorrect && isGuessed) {
      return "bg-green-500";  // Green if the letter is part of the word
    }
    if (isWrong) {
      return "bg-red-500";    // Red if the letter is guessed and not part of the word
    }
    return "bg-orange-500";   // Orange if the letter hasn't been guessed yet
  };

  // Creating buttons for each letter in the alphabet
  const keyboardElements = alphabet.split("").map((letter) => (
    <button
      key={letter}
      className={`w-12 h-12 mx-1 my-2 ${getButtonClass(letter)} text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400`}
      onClick={() => addGuessedLetters(letter)}
      disabled={guessedLetters.includes(letter) || isGameOver}  // Disable button after guessing

    >
      {letter.toUpperCase()}
    </button>
  ));

  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 min-h-screen">
      <main className="py-8">
        {/* Render the keyboard */}
        <div className="flex flex-wrap justify-center">
          {keyboardElements}
        </div>

        {/* New Game button */}
        <button
          className="w-32 h-12 mt-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={onNewGame}
          disabled={!isGameOver}
        >
          New Game
        </button>
      </main>
    </div>
  );
};

export default Main;
