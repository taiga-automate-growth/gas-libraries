/**
 * テキストメッセージイベントを生成する
 * @param {Event} e - MessagingAPIから送信されたPOSTリクエストイベント
 * @return {LineEvent}
 */
function createTextMessage(e){
  return new TextMessageEvent(e);
}