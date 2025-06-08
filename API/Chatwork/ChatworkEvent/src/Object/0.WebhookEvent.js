class WebhookEvent{
  constructor(settingId, eventType, eventTime){
    this.settingId = settingId;
    this.eventType = eventType;
    this.eventTime = eventTime;
  }

  /**
   * メッセージイベントか判定する
   * @return {bool} メッセージイベントならtrue,それ以外ならfalse
   */
  isMessageEvent(){
    if(this.eventType === "message_created" || this.eventType === "message_updated") return true;
    return false;
  }

}