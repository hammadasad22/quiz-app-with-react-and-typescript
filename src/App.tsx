import React, { useState, useEffect } from 'react';
import './App.css'
import { getQuizDetails } from './services/quiz-services'
import { QuestionType } from './Types/quiz_types';
import QuestionCard from './components/QuestionCard'

function App() {

  let [quiz, setquiz] = useState<QuestionType[]>([])
  let [currentStep, setcurrentStep] = useState(0)
  let [score, setScore] = useState(0)
  let [showResult, setShowResult] = useState(false)


  useEffect(() => {
    async function fetchData() {
      const questions: QuestionType[] = await getQuizDetails(5, 'easy');
      setquiz(questions)
    }
    fetchData()
  }, [])
  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    const currentQuestion: QuestionType = quiz[currentStep];
    console.log(`correct answer is : ${currentQuestion.correct_answer} user selection is: ${userAns}`)


    if (userAns === currentQuestion.correct_answer) {
      setScore(++score)
    }

    e.preventDefault();
    if (currentStep !== quiz.length - 1)
      setcurrentStep(++currentStep);
    else {
      setShowResult(true);
      

    }
  }
  if (!quiz.length)
    return <div className="loading"><img src="https://media3.giphy.com/media/WiIuC6fAOoXD2/200w.webp?cid=ecf05e47d8xx23xazrpodvfn83dtaen94jldn5tbnkddu99b&rid=200w.webp" alt="Loading"/></div>
    if(showResult){
      return (
      <div className="question-container result-container">
        <h2>Result</h2>
  
        <p className="result-text">
          You final score is 
            <b> {score}</b> out of <b>{quiz.length}</b>
        </p>
      </div>
      )
      
    }
  return (
    <div className="App">
      <p>
        You answered {currentStep} out of {quiz.length} questions
      </p>

      <QuestionCard
        options={quiz[currentStep].option}
        question={quiz[currentStep].question.replace(/&quot;|&#039;/g, "'")}
        callback={handleSubmit}
      />
    </div>
  );
}

export default App;
