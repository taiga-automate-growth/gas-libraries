/**
 * ポストバックイベントを表すクラス
 */
class PostbackEvent extends LineEvent{
  constructor(destination,event){
    const mode = event.mode;
    const timestamp = event.timestamp;
    const source = event.source;
    const webhookEventId = event.webhookEventId;
    const isRedelivery = event.deliveryContext.isRedelivery;
    super(destination,'postback',mode,timestamp,source,webhookEventId,isRedelivery);
    this.replyToken = event.replyToken;
    this.postbackData = event.postback.data;
    this.params = event.postback.params || {};
  }

  getReplyToken(){
    return this.replyToken;
  }

  getPostbackData(){
    const postbackDataArray = this.postbackData.split('&');
    const data = postbackDataArray.reduce((prev, data) => {
      const index = data.indexOf('=');
      const key = data.substring(0,index);
      const value = data.substring(index + 1);
      prev[key] = value;
      return prev;
    },{});
    Object.keys(this.params).forEach(key => data[key] = this.params[key]);
    return data;
  }

  getPostbackParams(){
    return this.params;
  }
}