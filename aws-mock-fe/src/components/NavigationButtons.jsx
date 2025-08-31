import React from 'react';
import { useQuestions } from '../hooks/useQuestions';
import ProgressBar from './ProgressBar';

export default function NavigationButtons({
  onSubmit,
  onFinish,
}) {
  const { currentQuestionIdx, totalQuestions, nextQuestion, previousQuestion, question, flaggedCount } = useQuestions();

  const isLastQuestion = currentQuestionIdx === totalQuestions - 1;
  const hasSelectedAnswer = question.isSelected !== null;
  const showPrevious = currentQuestionIdx > 0;

  const handlePrevious = () => {
    if (showPrevious) {
      previousQuestion();
    }
  };

  const handleNext = () => {
    if (hasSelectedAnswer) {
      if (isLastQuestion) {
        onFinish();
      } else {
        nextQuestion();
      }
    }
  };

  return (
    <div className="nav-button-container w-[90%] max-w-4xl mx-auto px-6 py-4">
      <button
        className={`nav-button-base h-[80%] nav-button-previous ${!showPrevious ? 'disabled' : ''}`}
        onClick={handlePrevious}
        disabled={!showPrevious}
        aria-label="Previous question"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: "8px" }}
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      <ProgressBar
        current={currentQuestionIdx + 1}
        total={totalQuestions}
        flagged={flaggedCount}
        className="mr-4"
        style={{ marginRight: "8px" }}
      />

      <button
        className={`nav-button-base nav-button-next ${!hasSelectedAnswer ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={!hasSelectedAnswer}
        aria-label={isLastQuestion ? "Finish test" : "Next question"}
      >
        {isLastQuestion ? (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "8px" }}
            >
              <path d="M20 6L9 17L4 12" />
            </svg>
            Finish Test
          </>
        ) : (
          <>
            Next Question
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: "8px" }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}