/**
 * @param {Event} e - MessagingAPIから送信されたPOSTリクエストイベント
 * @return {LineEvent}
 */
function createPostback(e){
  return new PostbackEvent(e);
}