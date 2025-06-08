/**
 * ボタンテンプレートを生成する
 * 
 * @param {string} altText - 代替テキスト。通知やトークリストに表示されるメッセージ
 * @param {string} text - テキスト
 * @param {Array<Action>} actions - アクションオブジェクトの配列　最大4つまで
 */
function createButtonTemplate(altText,text,actions){
  const button = new Button(text,actions);
  const template = new Template(altText,button);
  return template;
}