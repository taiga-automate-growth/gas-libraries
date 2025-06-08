/**
 * フォローイベントを表すクラス
 */
class FollowEvent extends LineEvent {
  constructor(destination, event) {
    const type = "follow";
    const mode = event.mode;
    const timestamp = event.timestamp;
    const source = event.source;
    const webhookEventId = event.webhookEventId;
    const isRedelivery = event.deliveryContext?.isRedelivery ?? false;

    super(destination, type, mode, timestamp, source, webhookEventId, isRedelivery);
    this.replyToken = event.replyToken;
    this.unblocked = event.follow?.isUnblocked ?? false;
  }

  getReplyToken(){
    return this.replyToken;
  }

  isUnblocked() {
    return this.unblocked;
  }
}
