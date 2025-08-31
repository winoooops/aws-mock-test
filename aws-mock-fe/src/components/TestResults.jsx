import React from 'react';

export default function TestResults({ answers, questions, onRestart, onReview }) {
  const score = answers.filter(answer =>
    answer && answer.isCorrect
  ).length;

  const percentage = Math.round((score / questions.length) * 100);

  const flaggedQuestions = answers
    .filter(answer => answer && answer.isFlagged)
    .map(answer => ({
      ...answer,
      question: questions.find(q => q.id === answer.questionId)
    }));

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return 'Excellent Work! 🎉';
    if (percentage >= 60) return 'Good Job! 👍';
    return 'Keep Studying! 📚';
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <div className="card rounded-xl p-8 shadow-xl animate-fade-in">
        <div className="text-center mb-10">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-2 text-white">Test Complete!</h1>
            <p className="text-lg text-secondary">{getScoreMessage()}</p>
          </div>

          <div className={`text-7xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <div className="text-2xl font-semibold text-white mb-8">
            {percentage}% Score
          </div>

          <div className="relative mb-8">
            <div className="w-full bg-gray-700 bg-opacity-50 rounded-full h-6 overflow-hidden shadow-inner">
              <div
                className="progress h-full rounded-full shadow-lg transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="text-center p-6 rounded-xl bg-green-500 bg-opacity-10 border border-green-500 border-opacity-30 hover:border-opacity-50 transition-all duration-300">
            <div className="w-12 h-12 mx-auto bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-1">{score}</div>
            <div className="text-sm font-medium text-green-300">Correct Answers</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 hover:border-opacity-50 transition-all duration-300">
            <div className="w-12 h-12 mx-auto bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-red-400 mb-1">{questions.length - score}</div>
            <div className="text-sm font-medium text-red-300">Incorrect Answers</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 hover:border-opacity-50 transition-all duration-300">
            <div className="w-12 h-12 mx-auto bg-yellow-500 bg-opacity-20 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-1">{flaggedQuestions.length}</div>
            <div className="text-sm font-medium text-yellow-300">Flagged Questions</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          {flaggedQuestions.length > 0 && (
            <button
              onClick={onReview}
              className="flex items-center justify-center px-8 py-3 rounded-xl font-medium secondary hover:bg-gray-700 hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
              </svg>
              Review Flagged Questions
            </button>
          )}
          <button
            onClick={onRestart}
            className="flex items-center justify-center px-8 py-3 rounded-xl font-semibold button hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start New Test
          </button>
        </div>
      </div>
    </div>
  );
}