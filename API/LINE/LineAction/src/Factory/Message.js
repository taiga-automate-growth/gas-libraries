/**
 * メッセージアクションを生成する
 * @param {string} text - アクションの実行時に送信されるテキスト
 * @return {LineAction}
 */
function createMessage(text){
  return new MessageAction(text);
}