const DIFF_ROWS = [
  { number: 1, type: "remove", text: "# PRの練習" },
  { number: 1, type: "add", text: "# PR Flow Lab" },
  { number: 2, type: "context", text: "" },
  {
    number: 3,
    type: "remove",
    text: "このリポジトリは、PRの流れを学ぶためのサンプルです。",
  },
  {
    number: 3,
    type: "add",
    text: "このリポジトリは、PRの流れを学ぶインタラクティブな教材です。",
  },
  { number: 5, type: "add", text: "## できること" },
  { number: 6, type: "add", text: "- 作業用ブランチを作成する" },
  { number: 7, type: "add", text: "- コミットを作成する" },
  { number: 8, type: "add", text: "- Pull Requestを作成する" },
];

export default function DiffViewer({ step, completed }) {
  const status =
    completed ? "マージ済み" : step >= 3 ? "CI確認済み" : step >= 2 ? "PRで確認中" : null;

  return (
    <section className="diff-viewer" aria-labelledby="diff-title">
      <header className="diff-header">
        <h3 id="diff-title">README.md</h3>
        <div className="diff-summary" aria-label="9行追加、削除なし">
          <span className="additions">+9</span>
          <span className="deletions">−0</span>
          {status ? <span className="diff-status">{status}</span> : null}
        </div>
      </header>
      <div className="diff-code" role="table" aria-label="README.mdの変更差分">
        {DIFF_ROWS.map((row, index) => (
          <div className={`diff-row diff-${row.type}`} role="row" key={`${row.number}-${index}`}>
            <span className="line-number" role="cell">
              {row.number}
            </span>
            <span className="diff-symbol" role="cell" aria-hidden="true">
              {row.type === "add" ? "+" : row.type === "remove" ? "−" : ""}
            </span>
            <code role="cell">{row.text || " "}</code>
          </div>
        ))}
      </div>
    </section>
  );
}
