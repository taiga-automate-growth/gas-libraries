/**
 * メッセージイベントを生成する
 * @param {string} settingId - イベントのセッティングID
 * @param {string} eventType - イベント種別
 * @param {string} eventTime - イベント受領時間
 * @param {string} event - イベントオブジェクト
 * @return {ChatworkEvent} 
 */
function createMessage(settingId,eventType,eventTime,event){
  return new MessageEvent(settingId,eventType,eventTime,event);
}