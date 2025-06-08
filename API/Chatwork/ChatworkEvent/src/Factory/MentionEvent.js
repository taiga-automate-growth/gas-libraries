/**
 * メンションイベントを生成する
 * @param {string} settingId - イベントのセッティングID
 * @param {string} eventType - イベント種別
 * @param {string} eventTime - イベント受領時間
 * @param {string} event - イベントオブジェクト
 * @return {ChatworkEvent} 
 */
function createMention(settingId,eventType,eventTime,event){
  return new MentionEvent(settingId,eventType,eventTime,event);
}