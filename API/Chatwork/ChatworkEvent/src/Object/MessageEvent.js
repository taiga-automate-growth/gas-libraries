class MessageEvent extends WebhookEvent{
  constructor(settingId, eventType, eventTime, webhookEvent){
    super(settingId, eventType, eventTime);
    this.messageId = webhookEvent["message_id"];
    this.roomId = webhookEvent["room_id"];
    this.accountId = webhookEvent["account_id"];
    this.body = webhookEvent["body"];
    this.sendTime = webhookEvent["send_time"];
    this.updateTime = webhookEvent["update_time"];
  }

  /**
   * メッセージを取得する
   * @return {string} メッセージ本文
   */
  getMessage(){
    return this.body;
  }

  /**
   * 送信者のIDを取得する
   * @return {string} 送信者のID
   */
  getSenderId(){
    return this.accountId;
  }
  
  /**
   * ルームIDを取得する
   * @return {string} ルームID
   */
  getRoomId(){
    return this.roomId;
  }
}