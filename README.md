# PR Flow Lab

PR Flow Labは、GitHubのPull Requestが`main`へ取り込まれるまでを、画面上で順番に体験できる初心者向けWebアプリです。

## 学べる流れ

1. 作業用ブランチを作る
2. 変更をコミットする
3. Pull Requestを作る
4. レビューとCIで確認する
5. `main`へマージする

## ローカルで試す

```powershell
npm install
npm run dev
```

## 品質確認

```powershell
npm run check
```

`check`は、5ステップの進み方を自動テストしてから、公開用ファイルを生成します。

## 公開の仕組み

- Pull Requestを作ると、GitHub Actionsがテストとビルドを自動実行します。
- PRを`main`へマージすると、GitHub Pagesが公開サイトを更新します。

公開前には、PC・スマホの表示と5ステップすべての操作を確認します。
