import React from 'react';
import { useQuestions } from '../hooks/useQuestions';

export default function ProgressBar() {
  const { currentQuestionIdx, totalQuestions } = useQuestions();
  const progressPercentage = ((currentQuestionIdx + 1) / totalQuestions) * 100;

  return (
    <div className="flex flex-row justify-between items-center sm:flex-col sm:justify-between">
      <span className="progress-bar-text font-semibold text-sm inline-block">{currentQuestionIdx + 1}/{totalQuestions}</span>
      <div className="progress-bar-container min-w-[200px]">
        <div
          className="progress-bar-inner"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}