import React, { useState } from "react";
import { ColorSchemeProvider } from "./contexts/ColorSchemeContext";
import Navbar from "./components/Navbar";
import QuestionCard from "./components/QuestionCard";
import ProgressBar from "./components/ProgressBar";
import NavigationButtons from "./components/NavigationButtons";
import TestResults from "./components/TestResults";
import ReviewPage from "./components/ReviewPage";
import questions from "./data/questions.json";
import TestBoard from "./components/TestBoard";
import { QuestionProvider } from "./contexts/QuestionContext";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [testState, setTestState] = useState('taking'); // 'taking', 'finished', 'review'

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];
  const flaggedCount = flaggedQuestions.size;

  const handleAnswerSelect = (optionId) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: currentQuestionData.id,
      selectedAnswer: optionId,
      isCorrect: optionId === currentQuestionData.correctAnswer,
      isFlagged: flaggedQuestions.has(currentQuestionData.id)
    };
    setAnswers(newAnswers);
  };

  const handleFlagToggle = (questionId) => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(questionId)) {
      newFlagged.delete(questionId);
    } else {
      newFlagged.add(questionId);
    }
    setFlaggedQuestions(newFlagged);

    // Update the answer's flagged status
    const newAnswers = [...answers];
    const answerIndex = newAnswers.findIndex(a => a && a.questionId === questionId);
    if (answerIndex !== -1) {
      newAnswers[answerIndex] = {
        ...newAnswers[answerIndex],
        isFlagged: newFlagged.has(questionId)
      };
      setAnswers(newAnswers);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleFinish = () => {
    setTestState('finished');
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setFlaggedQuestions(new Set());
    setTestState('taking');
  };

  const handleReview = () => {
    setTestState('review');
  };

  const handleBackToResults = () => {
    setTestState('finished');
  };

  const getFlaggedQuestionsForReview = () => {
    return answers
      .filter(answer => answer && answer.isFlagged)
      .map(answer => ({
        ...answer,
        question: questions.find(q => q.id === answer.questionId)
      }));
  };

  if (testState === 'finished') {
    return (
      <div className="min-h-screen background font-archivo">
        <Navbar />
        <main className="flex flex-col py-4">
          <TestResults
            answers={answers}
            questions={questions}
            onRestart={handleRestart}
            onReview={handleReview}
          />
        </main>
      </div>
    );
  }

  if (testState === 'review') {
    return (
      <div className="min-h-screen background font-archivo">
        <Navbar />
        <main className="flex flex-col min-h-[calc(100vh-64px)] py-4">
          <div className="flex-1 px-4">
            <ReviewPage
              flaggedQuestions={getFlaggedQuestionsForReview()}
              onBackToResults={handleBackToResults}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen background font-archivo">
      <Navbar />
      <main className="flex flex-col min-h-[calc(100vh-64px)] py-4">
        <div className="flex-1 flex flex-col items-end justify-center px-4">
          <TestBoard />
        </div>

        <NavigationButtons
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          onFinish={handleFinish}
          currentQuestion={currentQuestion + 1}
          totalQuestions={questions.length}
          hasSelectedAnswer={currentAnswer !== undefined}
          isLastQuestion={currentQuestion === questions.length - 1}
        />
      </main>
    </div>
  );
}

function AppWrapper() {
  return (
    <ColorSchemeProvider>
      <QuestionProvider>
        <App />
      </QuestionProvider>
    </ColorSchemeProvider>
  );
}

export default AppWrapper;
