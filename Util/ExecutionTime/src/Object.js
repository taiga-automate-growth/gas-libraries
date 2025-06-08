class ExecutionTime {
  /**
   * 実行監視オブジェクトを生成する
   * @param {number} limit - 制限時間（単位：秒）
   */
  constructor(limit = 300) {
    this.limit = limit * 1000; // 秒をミリ秒に変換
    this.startTime = new Date().getTime();
    this.lock = LockService.getScriptLock();
  }

  /**
   * 実行可能かを識別する
   * @param {number} lowestSec - 必要な残り秒数（単位：秒）デフォルトは0秒
   * @return {boolean} 実行可能な場合はtrue,それ以外はfalse
   */
  monitor(lowestSec = 0) {
    const now = new Date().getTime();
    return now - this.startTime + (lowestSec * 1000) <= this.limit;
  }

  /**
   * 次回に持ち越す（重複トリガーを削除してから新規作成）
   * @param {string} funcName - 関数名
   * @param {number} after - 何秒後にトリガーするか（単位：秒）
   */
  defer(funcName,after) {
    // 既存の同じ関数のトリガーを削除（重複実行を避けるため）
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === funcName) {
        ScriptApp.deleteTrigger(trigger);
      }
    });

    // 1分後に再実行するトリガーをセット
    ScriptApp.newTrigger(funcName)
      .timeBased()
      .after(after * 1000) // 1 分後
      .create();
    
    Logger.log("新しいトリガーを設定しました");
  }

}
