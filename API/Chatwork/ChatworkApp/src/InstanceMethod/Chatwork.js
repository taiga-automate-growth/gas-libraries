/**
 * メッセージを送信する
 * @param {string} message - メッセージ
 * @param {string} roomId - ルームID
 * @return {object}
 */
function push(message, roomId){
  throw new Error("このメソッドはchatwork用のダミーメソッドです");
}

/**
 * イベントを受信する
 * @param {Object} postData - EventオブジェクトのpostData
 * @return {ChatworkEvent | null} ChatworkEventを返却。イベント送信元が自身の場合はnull
 */
function receiveEvent(postData){
  throw new Error("このメソッドはchatwork用のダミーメソッドです");
}