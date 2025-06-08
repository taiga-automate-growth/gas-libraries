/**
 * メッセージイベントを表すクラス
 */
class MessageEvent extends LineEvent{
  constructor(destination,event){
    const mode = event.mode;
    const timestamp = event.timestamp;
    const source = event.source;
    const webhookEventId = event.webhookEventId;
    const isRedelivery = event.deliveryContext?.isRedelivery ?? false;
    super(destination,'message',mode,timestamp,source,webhookEventId,isRedelivery);
    this.replyToken = event.replyToken;
    this.message = {}
  }

  getReplyToken(){
    return this.replyToken;
  }

  getMessage(){
    return this.message;
  }
 
  getMessageType(){
    return this.message.messageType;
  }
}
