/**
 * SheetDAO を作成するファクトリメソッド
 * @param {string} spreadsheetId スプレッドシートのID
 * @param {string} tableName メインのシート名
 * @return {SheetDAO} SheetDAO インスタンス
 */
function create(spreadsheetId, tableName) {
  return new SheetDAO(spreadsheetId, tableName);
}