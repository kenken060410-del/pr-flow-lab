import { useRef, useState } from "react";
import Header from "./components/Header.jsx";
import IntroPanel from "./components/IntroPanel.jsx";
import StepRail from "./components/StepRail.jsx";
import BeginnerNote from "./components/BeginnerNote.jsx";
import BranchDiagram from "./components/BranchDiagram.jsx";
import DiffViewer from "./components/DiffViewer.jsx";
import { ArrowIcon, CheckIcon } from "./components/Icons.jsx";
import { FLOW_STEPS, nextStep, previousStep } from "./flow.js";

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const simulatorRef = useRef(null);
  const currentStepRef = useRef(null);
  const completionRef = useRef(null);
  const step = FLOW_STEPS[currentStep];

  function scrollToSimulator() {
    simulatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollToContent(targetRef) {
    window.requestAnimationFrame(() => {
      const behavior = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";
      targetRef.current?.scrollIntoView({ behavior, block: "start" });
    });
  }

  function handleStart() {
    setCurrentStep(0);
    setCompleted(false);
    scrollToSimulator();
  }

  function handleReset() {
    setCurrentStep(0);
    setCompleted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSelectStep(index) {
    setCurrentStep(index);
    setCompleted(false);
    scrollToContent(currentStepRef);
  }

  function handlePrevious() {
    if (completed) {
      setCompleted(false);
      scrollToContent(currentStepRef);
      return;
    }
    setCurrentStep((value) => previousStep(value));
    scrollToContent(currentStepRef);
  }

  function handleNext() {
    if (completed) {
      handleReset();
      return;
    }
    if (currentStep === FLOW_STEPS.length - 1) {
      setCompleted(true);
      scrollToContent(completionRef);
      return;
    }
    setCurrentStep((value) => nextStep(value));
    scrollToContent(currentStepRef);
  }

  const primaryLabel = completed
    ? "もう一度試す"
    : currentStep === FLOW_STEPS.length - 1
      ? "マージを完了する"
      : "次へ進む";

  return (
    <div id="top" className="app">
      <Header onReset={handleReset} />
      <main className="app-layout">
        <IntroPanel onStart={handleStart} />
        <section
          className="simulator"
          id="simulator"
          ref={simulatorRef}
          aria-labelledby="current-step-title"
        >
          <StepRail currentStep={currentStep} onSelect={handleSelectStep} />

          <div className="current-step" ref={currentStepRef} aria-live="polite">
            <p className="step-counter">
              STEP {currentStep + 1} / {FLOW_STEPS.length}
            </p>
            <div className="step-heading-row">
              <div>
                <h2 id="current-step-title">{step.title}</h2>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          </div>

          <BeginnerNote
            title={step.beginnerTitle}
            text={step.beginnerText}
            happening={step.happening}
          />

          <BranchDiagram step={currentStep} completed={completed} />

          {completed ? (
            <section className="completion-notice" ref={completionRef} aria-live="polite">
              <span className="completion-icon">
                <CheckIcon />
              </span>
              <div>
                <h3>マージ完了</h3>
                <p>変更がmainに入り、PRはMergedになりました。</p>
              </div>
            </section>
          ) : null}

          <DiffViewer step={currentStep} completed={completed} />

          <div className="simulator-controls">
            <button
              className="secondary-button"
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0 && !completed}
            >
              <ArrowIcon direction="left" />
              戻る
            </button>
            <button className="primary-button next-button" type="button" onClick={handleNext}>
              {primaryLabel}
              <ArrowIcon />
            </button>
          </div>
        </section>
      </main>
      <footer>このシミュレーションはブラウザー内だけで動きます。</footer>
    </div>
  );
}
