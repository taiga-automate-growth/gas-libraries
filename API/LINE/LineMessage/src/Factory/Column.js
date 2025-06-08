/**
 * カラムメッセージを生成する
 * 
 * @param {string} text - メッセージテキスト
 * @param {Array<Action>} actions - アクションオブジェクト配列
 * @return {LineMessage}
 */
function createColumn(text,actions = []){
  return new Column(text,actions);
}