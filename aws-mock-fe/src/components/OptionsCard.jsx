import { useQuestions } from '../hooks/useQuestions';
import Option from './Option';

export default function OptionsCard() {
  const { question, setQuestion } = useQuestions();
  const selectedAnswer = question.selectedAnswer;

  if (!question.options) return null;

  const onAnswerSelect = (optionId) => {
    setQuestion({
      ...question,
      selectedAnswer: optionId,
      isSelected: true
    });
  };

  return (
    <div
      className="flex flex-col"
      style={{
        gap: "12px",
        padding: "24px",
        backgroundColor: "rgba(255, 255, 255, 0.05)" // Temporary for debugging
      }}
    >
      {question.options.map((option, index) => (
        <Option key={option.id} index={index} option={option} onAnswerSelect={onAnswerSelect} selectedAnswer={selectedAnswer} />
      ))}
    </div>
  );
}