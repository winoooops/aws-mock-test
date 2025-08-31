import React from 'react';

export default function ReviewPage({ flaggedQuestions, onBackToResults }) {
  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <div className="mb-8">
        <button
          onClick={onBackToResults}
          className="flex items-center text-secondary hover:text-white mb-6 px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Results
        </button>

        <div className="card rounded-xl p-8 mb-8 text-center">
          <div className="w-16 h-16 mx-auto bg-yellow-500 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-3 text-white">Flagged Questions Review</h1>
          <p className="text-lg text-secondary">
            Review the {flaggedQuestions.length} questions you flagged during the test
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {flaggedQuestions.map((item, index) => (
          <div key={item.questionId} className="card rounded-xl p-8 shadow-xl animate-fade-in">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full mr-4">
                  Question {item.question.id}
                </div>
                <div className="flex items-center text-red-400 bg-red-500 bg-opacity-10 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Flagged</span>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-6 leading-relaxed">
              {item.question.question}
            </h3>

            <div className="space-y-4 mb-6">
              {item.question.options.map((option, optionIndex) => (
                <div
                  key={option.id}
                  className={`p-5 rounded-xl border-2 transition-all duration-300 ${option.id === item.question.correctAnswer
                    ? 'border-green-500 bg-green-500 bg-opacity-10 shadow-lg'
                    : option.id === item.selectedAnswer
                      ? 'border-red-500 bg-red-500 bg-opacity-10 shadow-lg'
                      : 'border-gray-600 border-opacity-30'
                    }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${option.id === item.question.correctAnswer
                      ? 'border-green-500 bg-green-500'
                      : option.id === item.selectedAnswer
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-400'
                      }`}>
                      {option.id === item.question.correctAnswer && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {option.id === item.selectedAnswer && option.id !== item.question.correctAnswer && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center flex-1">
                      <span className="text-lg font-medium mr-3 text-primary">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      <span className="text-lg text-white">{option.label}</span>
                    </div>
                    {option.id === item.question.correctAnswer && (
                      <span className="ml-4 text-green-400 text-sm font-semibold bg-green-500 bg-opacity-10 px-2 py-1 rounded-full">
                        Correct Answer
                      </span>
                    )}
                    {option.id === item.selectedAnswer && option.id !== item.question.correctAnswer && (
                      <span className="ml-4 text-red-400 text-sm font-semibold bg-red-500 bg-opacity-10 px-2 py-1 rounded-full">
                        Your Answer
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-blue-400 text-lg">Explanation</h4>
              </div>
              <p className="text-white leading-relaxed">{item.question.explanation}</p>
            </div>
          </div>
        ))}
      </div>

      {flaggedQuestions.length === 0 && (
        <div className="card rounded-xl p-12 text-center">
          <div className="w-20 h-20 mx-auto bg-gray-500 bg-opacity-20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">No Flagged Questions</h3>
          <p className="text-secondary">You didn't flag any questions during the test.</p>
        </div>
      )}
    </div>
  );
}