export default function Option({ index, option, onAnswerSelect, selectedAnswer }) {
  const isSelected = selectedAnswer === option.id;
  const optionLetter = String.fromCharCode(65 + index); // A, B, C, D...

  return (
    <button
      key={option.id}
      onClick={() => onAnswerSelect(option.id)}
      className={`modern-option-button ${isSelected ? 'selected' : ''}`}
      role="radio"
      aria-checked={isSelected}
    >
      {/* Option Letter Circle */}
      <div className={`option-letter-indicator ${isSelected ? 'selected' : ''}`}>
        {optionLetter}
      </div>

      {/* Option Text */}
      <span className="option-text">
        {option.label}
      </span>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="option-check-indicator">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20,6 9,17 4,12" />
          </svg>
        </div>
      )}
    </button>
  )
}