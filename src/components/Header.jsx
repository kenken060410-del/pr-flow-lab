import { ResetIcon } from "./Icons.jsx";

export default function Header({ onReset }) {
  return (
    <header className="app-header">
      <a className="brand" href="#top" aria-label="PR Flow Lab トップ">
        PR Flow Lab
      </a>
      <nav className="header-nav" aria-label="ページ内ナビゲーション">
        <a href="#simulator">しくみ</a>
      </nav>
      <button className="reset-button" type="button" onClick={onReset}>
        <ResetIcon />
        最初から
      </button>
    </header>
  );
}
