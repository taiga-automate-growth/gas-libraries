class MentionEvent extends WebhookEvent{
  
  constructor(settingId, eventType, eventTime, webhookEvent){
    super(settingId, eventType, eventTime);
    this.fromAccountId = webhookEvent["from_account_id"];
    this.toAccountId = webhookEvent["to_account_id"];
    this.roomId = webhookEvent["room_id"];
    this.messageId = webhookEvent["message_id"];
    this.body = webhookEvent["body"];
    this.sendTime = webhookEvent["send_time"];
    this.updateTime = webhookEvent["update_time"];
  }
}