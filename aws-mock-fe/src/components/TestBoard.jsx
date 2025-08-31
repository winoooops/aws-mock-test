import QuestionCard from "./QuestionCard";
import OptionsCard from "./OptionsCard";

export default function TestBoard() {
  return (
    <div
      className="mx-auto"
      style={{
        width: "min(90vw, 1200px)",
        height: "min(80vh, 800px)",
        maxWidth: "1200px",
        maxHeight: "800px"
      }}
    >
      <div className="material-card elevation-3 p-6 animate-fade-in h-full">
        <div className="flex flex-col gap-6 h-full justify-between">
          <div className="flex-shrink-0">
            <QuestionCard />
          </div>
          <div className="overflow-y-auto">
            <OptionsCard />
          </div>
        </div>
      </div>
    </div>
  )
};