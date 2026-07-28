export const FLOW_STEPS = [
  {
    navLabel: "ブランチ",
    title: "作業用ブランチを作る",
    description: "mainを直接変えずに、変更を試すための場所を作ります。",
    beginnerTitle: "ブランチとは？",
    beginnerText:
      "正式版のmainから分かれて、安全に変更を試すための作業場所です。",
    happening:
      "いま起きること：agent/pr-labという作業場所がmainから分かれます。",
  },
  {
    navLabel: "コミット",
    title: "変更をコミットする",
    description: "README.mdの変更を、ひとまとまりの記録として保存します。",
    beginnerTitle: "コミットとは？",
    beginnerText:
      "変更内容に名前を付けて、後から確認したり戻したりできる保存地点を作ることです。",
    happening:
      "いま起きること：「Add beginner guide」という記録が作業ブランチに追加されます。",
  },
  {
    navLabel: "Pull Request",
    title: "Pull Requestを作る",
    description: "mainへ取り込む前に、変更内容をGitHubで確認できるようにします。",
    beginnerTitle: "Pull Requestとは？",
    beginnerText:
      "作業ブランチの変更を正式版へ入れてよいか、差分を見ながら確認する依頼です。",
    happening:
      "いま起きること：README.mdの変更差分と説明文が、確認ページにまとまります。",
  },
  {
    navLabel: "レビューとCI",
    title: "レビューとCIで確認する",
    description: "人の確認と自動テストで、変更を入れても問題ないか確かめます。",
    beginnerTitle: "CIとは？",
    beginnerText:
      "GitHubへ変更を送るたびに、テストやビルドを自動実行して失敗を知らせる仕組みです。",
    happening:
      "いま起きること：テスト成功を示すチェックが付き、マージできる状態になります。",
  },
  {
    navLabel: "マージ",
    title: "mainへマージする",
    description: "確認済みの変更を、正式なmainへ取り込みます。",
    beginnerTitle: "マージとは？",
    beginnerText:
      "確認を終えた作業ブランチの変更を、正式版へ取り込むことです。",
    happening:
      "いま起きること：作業ブランチの線がmainへ戻り、変更が正式な履歴になります。",
  },
];

export function clampStep(step) {
  return Math.max(0, Math.min(FLOW_STEPS.length - 1, step));
}

export function nextStep(step) {
  return clampStep(step + 1);
}

export function previousStep(step) {
  return clampStep(step - 1);
}

export function getProgressState(index, currentStep) {
  if (index < currentStep) return "complete";
  if (index === currentStep) return "current";
  return "upcoming";
}
