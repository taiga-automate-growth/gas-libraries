/**
 * 受領したイベントの基底クラス
 * 
 * @class
 */
class LineEvent{
  /**
   * @param {Event} event - doPostの引数で受領するイベントオブジェクト
   */
  constructor(destination,type,mode,timestamp,source,webhookEventId,isRedelivery){
    this.destination = destination;
    this.type = type;
    this.mode = mode;
    this.timestamp = timestamp;
    this.source = source;
    this.webhookEventId = webhookEventId;
    this.isRedelivery = isRedelivery;
  }

  getDestination(){
    return this.destination;
  }

  getType(){
    return this.type;
  }

  getMode(){
    return this.getMode;
  }

  getTimestamp(){
    return this.timestamp
  }

  getSource(){
    return this.source;
  }

  getWebhookEventId(){
    return this.webhookEventId;
  }

  getIsRedelivery(){
    return this.isRedelivery;
  }

  getSenderId(){
    if(this.source.type === 'user') return this.source.userId;
    if(this.source.type === 'group') return this.source.groupId;
    if(this.source.type === 'room') return this.source.roomId;
  }

  isTextMessage(){
    if(this.type === 'message' && this.messageType === 'text') return true;
    return false;
  }

  isAudioMessage(){
    if(this.type === 'message' && this.messageType === 'audio') return true;
    return false;
  }

  isPostback(){
    if(this.type === 'postback') return true;
    return false;
  }

  isFollow(){
    if(this.type === "follow") return true;
    return false;
  }

  isVerification(){
    if(this.type === "verification") return true;
    return false;
  }
}