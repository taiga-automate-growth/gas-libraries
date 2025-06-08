/**
 * テキストメッセージイベントを表すクラス
 */
class TextMessageEvent extends MessageEvent{
  constructor(destination,event){
    super(destination,event);
    const eventData = event.message;
    this.id = eventData.id;
    this.messageType = 'text';
    this.quoteToken = eventData.quoteToken;
    this.text = eventData.text;
    if('emojis' in eventData){
      this.emojis = eventData.emojis;
    }
    if('mention' in eventData){
      this.mention = event.mention;
    }
  }

  getId(){
    return this.id;
  }

  getQuoteToken(){
    return this.quoteToken;
  }

  getText(){
    return this.text;
  }

  getEmojis(){
    return this.emojis;
  }

  getMention(){
    return this.mention;
  }

}
