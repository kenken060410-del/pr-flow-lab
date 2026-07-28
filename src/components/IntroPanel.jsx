import { ArrowIcon } from "./Icons.jsx";

export default function IntroPanel({ onStart }) {
  return (
    <aside className="intro-panel" aria-labelledby="intro-title">
      <div>
        <h1 id="intro-title">
          <span className="headline-line">
            変更が <span className="code-word">main</span> に
          </span>
          <span className="headline-line">入るまでを、</span>
          <span className="headline-line">動かして理解する。</span>
        </h1>
        <p>
          ブランチ、コミット、PR、レビュー、マージ。
          <br />
          5つの操作を順番に試せます。
        </p>
      </div>
      <button className="primary-button intro-action" type="button" onClick={onStart}>
        シミュレーションを始める
        <ArrowIcon />
      </button>
    </aside>
  );
}
