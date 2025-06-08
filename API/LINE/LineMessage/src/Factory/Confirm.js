/**
 * 確認テンプレートを生成する
 * 
 * @param {string} altText - 代替テキスト。通知やトークリストに表示されるメッセージ
 * @param {string} text - テキスト
 * @param {Array<Action>} actions - アクションオブジェクトの配列　２つ
 */
function createConfirm(altText, text, actions = []){
  const confirm = new Confirm(text,actions);
  const template = new Template(altText,confirm);
  return template;
}