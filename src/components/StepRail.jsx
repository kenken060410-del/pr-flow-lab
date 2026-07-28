import { FLOW_STEPS, getProgressState } from "../flow.js";
import { CheckIcon } from "./Icons.jsx";

export default function StepRail({ currentStep, onSelect }) {
  return (
    <div className="step-rail" aria-label="Pull Requestの5ステップ">
      <ol className="step-list">
        {FLOW_STEPS.map((step, index) => {
          const state = getProgressState(index, currentStep);

          return (
            <li className={`step-item step-${state}`} key={step.navLabel}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={state === "current" ? "step" : undefined}
                aria-label={`ステップ${index + 1} ${step.navLabel}`}
              >
                <span className="step-number">
                  {state === "complete" ? <CheckIcon /> : index + 1}
                </span>
                <span>{step.navLabel}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <span
        className="step-progress-line"
        style={{ "--progress": `${(currentStep / (FLOW_STEPS.length - 1)) * 100}%` }}
        aria-hidden="true"
      />
    </div>
  );
}
