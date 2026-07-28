import { CheckIcon } from "./Icons.jsx";

export default function BranchDiagram({ step, completed }) {
  const featureNodes = [1, 2, 3];
  const activeFeatureNodes = Math.min(3, Math.max(0, step));
  const showPullRequest = step >= 2;
  const showCi = step >= 3;
  const showMerge = step >= 4;

  return (
    <figure className="branch-figure">
      <figcaption className="sr-only">
        mainからagent/pr-labブランチが分かれ、確認後にmainへ戻る流れ
      </figcaption>
      <div className="branch-labels" aria-hidden="true">
        <span className={`branch-name main-name ${completed ? "merged" : ""}`}>main</span>
        <span className="branch-name feature-name">agent/pr-lab</span>
      </div>
      <svg
        className="branch-svg"
        viewBox="0 0 900 210"
        role="img"
        aria-label={`現在はステップ${step + 1}。${
          completed ? "作業ブランチはmainへマージ済みです。" : "作業ブランチは確認中です。"
        }`}
      >
        <defs>
          <marker
            id="arrow-main"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e2630" />
          </marker>
          <marker
            id="arrow-feature"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#2457ff" />
          </marker>
        </defs>

        <g className="main-track">
          <path d="M155 55H845" markerEnd="url(#arrow-main)" />
          {[320, 520, 710].map((x) => (
            <circle key={x} cx={x} cy="55" r="12" />
          ))}
        </g>

        <path className="split-line" d="M320 68V150" />

        <g className="feature-track">
          <path
            d={showMerge ? "M320 150H710C760 150 780 125 780 90V55" : "M320 150H845"}
            markerEnd={showMerge ? undefined : "url(#arrow-feature)"}
          />
          {featureNodes.map((node, index) => {
            const x = [320, 520, 710][index];
            const active = index < activeFeatureNodes || step >= 3;

            return (
              <circle
                className={active ? "feature-node-active" : "feature-node-upcoming"}
                key={node}
                cx={x}
                cy="150"
                r="12"
              />
            );
          })}
        </g>

        {showPullRequest && !showMerge ? (
          <g className="pr-connector">
            <path d="M710 137C710 95 750 87 780 70" />
            <text x="732" y="106">
              PR
            </text>
          </g>
        ) : null}

        {showCi && !showMerge ? (
          <g className="ci-check" transform="translate(680 112)">
            <circle cx="30" cy="38" r="17" />
            <path d="M22 38L28 44L39 32" />
          </g>
        ) : null}

        {showMerge ? (
          <g className="merge-node">
            <circle cx="780" cy="55" r="14" />
            {completed ? (
              <foreignObject x="768" y="43" width="24" height="24">
                <span className="svg-check">
                  <CheckIcon />
                </span>
              </foreignObject>
            ) : null}
          </g>
        ) : null}
      </svg>
    </figure>
  );
}
