import React from 'react'
import { languages } from '../languages.js'
import { useState } from 'react'

const Header = ({ currentWord, guessedLetters, wrongGuessesCount }) => {

  const maxWrongGuesses = 9



  // Determine if the player has won or lost
  const isGameLost = wrongGuessesCount >= maxWrongGuesses;
  const isGameWon = currentWord
    .split('')
    .every(letter => guessedLetters.includes(letter.toLowerCase()) || guessedLetters.includes(letter.toUpperCase()));

  // Display "You Lost" or "You Won" messages
  const gameStatusMessage = isGameLost
    ? 'You Lost, Better Luck Next Time!'
    : isGameWon
      ? 'You Won! Congratulations!'
      : '';


  const letterElements = currentWord.split("").map((letter, index) => (
    <div
      key={index}
      className="flex items-center justify-center w-12 h-12 bg-gray-700 text-white text-xl rounded-md shadow-md"
    >
      {/* Conditionally render the letter only if it has been guessed */}

      {guessedLetters.includes(letter.toLowerCase()) || guessedLetters.includes(letter.toUpperCase())
        ? letter.toUpperCase()
        : '_'}


    </div>
  ));


  return (
    <div className="bg-gray-800 text-white py-8">
      <header className="container mx-auto px-6">

        <section className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Hangman</h1>
          <p className="text-lg">Guess the word to keep the programming world from disappearing</p>
        </section>

        {/* Display Game Status Message */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-green-400 mb-2">{gameStatusMessage}</h2>
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-semibold text-white mb-4">Programming Languages</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {languages.map((language, index) => {
              // Display skull based on wrongGuessesCount
              const skulls = wrongGuessesCount > index ? '💀' : '';
              return (
                <div
                  key={language.name}
                  className="flex items-center justify-center p-4 rounded-md"
                  style={{
                    backgroundColor: language.backgroundColor,
                    color: language.color,
                    width: '80px',
                    height: '80px',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    overflow: 'hidden', // Prevents skull from overflowing the box
                  }}
                >
                  <span className="font-semibold">{language.name}</span>


                  {/* Position skull in the center of the box */}
                  {skulls && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay to make the skull pop
                        borderRadius: '50%',
                        zIndex: 1, // Put the skull on top of the box
                        fontSize: '2rem', // Skull size
                      }}
                    >
                      {skulls}
                    </div>
                  )}
                </div>
              );
            })}
          </div>


        </section>


        <section className="mt-8">
          <h3 className="text-2xl font-semibold text-white mb-4">Current Word</h3>
          <div className="flex justify-center gap-2">
            {letterElements} {/* Rendered letter elements in separate boxes */}
          </div>
        </section>

      </header>
    </div>
  )
}

export default Header
