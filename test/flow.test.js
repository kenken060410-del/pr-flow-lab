import test from "node:test";
import assert from "node:assert/strict";
import {
  FLOW_STEPS,
  clampStep,
  getProgressState,
  nextStep,
  previousStep,
} from "../src/flow.js";

test("初心者向けフローは5ステップで構成される", () => {
  assert.equal(FLOW_STEPS.length, 5);
  assert.deepEqual(
    FLOW_STEPS.map((step) => step.navLabel),
    ["ブランチ", "コミット", "Pull Request", "レビューとCI", "マージ"],
  );
});

test("次へ進んでも最終ステップを越えない", () => {
  assert.equal(nextStep(0), 1);
  assert.equal(nextStep(4), 4);
  assert.equal(clampStep(99), 4);
});

test("戻っても最初のステップより前へ行かない", () => {
  assert.equal(previousStep(4), 3);
  assert.equal(previousStep(0), 0);
  assert.equal(clampStep(-20), 0);
});

test("現在・完了・これからの状態を区別する", () => {
  assert.equal(getProgressState(0, 2), "complete");
  assert.equal(getProgressState(2, 2), "current");
  assert.equal(getProgressState(4, 2), "upcoming");
});

test("各ステップに初心者向け説明がある", () => {
  for (const step of FLOW_STEPS) {
    assert.ok(step.title.length > 0);
    assert.ok(step.description.length > 0);
    assert.ok(step.beginnerTitle.endsWith("？"));
    assert.ok(step.beginnerText.length >= 20);
    assert.ok(step.happening.startsWith("いま起きること："));
  }
});
