import { createContext, useState } from "react";

import questions from "../data/questions.json";

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [question, setQuestion] = useState(questions[0]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const totalQuestions = questions.length;

  const nextQuestion = () => {
    if (currentQuestionIdx === questions.length - 1) return;

    setCurrentQuestionIdx(currentQuestionIdx + 1);
    setQuestion(questions[currentQuestionIdx + 1]);
  };

  const previousQuestion = () => {
    if (currentQuestionIdx === 0) return;

    setCurrentQuestionIdx(currentQuestionIdx - 1);
    setQuestion(questions[currentQuestionIdx - 1]);
  };

  const setQuestionByIdx = (idx) => {
    if (idx < 0 || idx >= questions.length) return;

    setCurrentQuestionIdx(idx);
    setQuestion(questions[idx]);
  };

  const toggleFlag = (questionId) => {
    const questionToUpdate = questions.find((q) => q.id === questionId);
    if (!questionToUpdate) return;

    questionToUpdate.flag = !questionToUpdate.flag;
    // Update current question if it's the one being flagged
    if (question.id === questionId) {
      setQuestion({ ...question, flag: questionToUpdate.flag });
    }
  }

  const getFlaggedQuestions = () => {
    return questions.filter((q) => q.flag);
  }

  return (
    <QuestionContext.Provider value={{ question, setQuestion, currentQuestionIdx, nextQuestion, previousQuestion, setQuestionByIdx, toggleFlag, getFlaggedQuestions, totalQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
};
