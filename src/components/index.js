import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './index.css'

const questions = [
  { question: "What is the capital of France?", options: ["A. Berlin", "B. Paris", "C. Rome", "D. Madrid"], answer: "B" },
  { question: "What is 5 + 5?", options: ["A. 10", "B. 15", "C. 20", "D. 25"], answer: "A" },
  { question: "Who wrote 'Macbeth'?", options: ["A. Dickens", "B. Shakespeare", "C. Tolstoy", "D. Hemingway"], answer: "B" },
  { question: "What is the boiling point of water?", options: ["A. 0", "B. 50", "C. 100", "D. 150"], answer: "C" },
  { question: "Who painted the Mona Lisa?", options: ["A. Van Gogh", "B. Picasso", "C. Da Vinci", "D. Rembrandt"], answer: "C" }
];

const GameScreen = () => {
  const [playerName, setPlayerName] = useState("");
  const [joined, setJoined] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleJoinGame = () => {
    if (playerName ) {
      setJoined(true);
    } else{
        alert('Please Enter Your Name')
    }
  };

  const handleAnswerSubmit = (answer) => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (answer === correctAnswer) {
    //   setFeedback(`Congratulations ${playerName}! Correct answer.`);
    setFeedback('')
      setIsCorrect(true);
      setTimeout(() => {
        setIsCorrect(false);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setFeedback("Game Over! You've answered all the questions.");
        }
      }, 2000);
    } else {
      setFeedback("Wrong answer. Try again!");
    }
    // setSelectedAnswer("");
  };

  return (
    <div className='main-container'  >
        <div className='game-container'> 
      <h1 className='app-title'>KBC Game</h1>

      {/* QR code for joining */}
      {!joined && (
        <div>
          <QRCodeCanvas value="http://localhost:3000/join" />
          <p className='qr-para'>Scan to Join</p>
        </div>
      )}

      {/* Player joins by entering name */}
      {!joined && (
        <div className='user-name-input-container'>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={handleJoinGame}>Join Game</button>
        </div>
      )}

      {joined && (
        <div>
          <h2 className='question'>{questions[currentQuestionIndex].question}</h2>
          <div className='mcq-container'>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerSubmit(option[0])}>
                {option}
              </button>
            ))}
          </div>

          {feedback && <h3 className='feedback'>{feedback}</h3>}
        </div>
      )}

      {isCorrect && (
        <h3 style={{ color: 'green' }}>Congratulations {playerName}!</h3>
      )}
      </div>
    </div>
  );
};

export default GameScreen;
