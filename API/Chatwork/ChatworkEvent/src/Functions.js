/**
 * イベントを受信する
 * @param {Object} postData - EventオブジェクトのpostData
 * @return {ChatworkEvent | null} ChatworkEventを返却。イベント送信元が自身の場合はnull
 */
function receive(postData){
  const settingId = postData["webhook_setting_id"];
  const eventType = postData["webhook_event_type"];
  const eventTime = postData["webhook_event_time"];
  const event = postData["webhook_event"];
  if(eventType === "message_created" || eventType === "message_updated"){
    const messageEvent = new MessageEvent(settingId,eventType,eventTime,event);
    if(messageEvent.getSenderId() === messageEvent.botId) return null;
    return messageEvent;
  }
  return new MentionEvent(settingId,eventType,eventTime,event);
}