/**
 * 実行監視オブジェクトを生成する
 * @param {number} limit - 制限時間（単位：秒）
 * @return {ExecutionTime}
 */
function create(limit = 300) {
  return new ExecutionTime(limit);
}

/**
 * 実行可能かを識別する
 * @param {number} lowestSec - 必要な残り秒数（単位：秒）デフォルトは0秒
 * @return {boolean} 実行可能な場合はtrue,それ以外はfalse
 */
function monitor(lowestSec = 0){
  throw new Error("ExecutionTimeのインスタンスメソッドです");
}

/**
 * 次回に持ち越す（重複トリガーを削除してから新規作成）
 * @param {string} funcName - 関数名
 * @param {number} after - 何秒後にトリガーするか（単位：秒）
 */
function defer(funcName,after) {
  throw new Error("ExecutionTimeのインスタンスメソッドです");
}