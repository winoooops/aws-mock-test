import React, { useState } from 'react';
import { useQuestions } from '../hooks/useQuestions';

export default function QuestionCard() {
  const { question } = useQuestions();

  return (
    <div className="question-card-container flex justify-between items-start">
      <div className="flex-1">
        <div
          className="text-white leading-relaxed"
          style={{
            fontSize: "18px",
            fontWeight: "600",
            letterSpacing: "-0.01em",
            lineHeight: "1.4em",
          }}
        >
          {question.question}
        </div>
      </div>
    </div>
  );
}