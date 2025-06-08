/**
 * テンプレートメッセージを生成する
 * 
 * @param {string} altText - 代替テキスト。通知やトークリストに表示されるメッセージ
 * @return {LineMessage}
 */
function createTemplate(altText){
  const template = new Template(altText);
  return template;
}