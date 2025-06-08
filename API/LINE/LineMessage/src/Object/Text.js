/**
 * テキストメッセージを表すクラス
 * @class
 */
class Text extends Message{

  /**
   * TextMessageを初期化する
   * 
   * @param {String} message 送信内容のテキスト
   */
  constructor(message){
    super("text");
    this.text = message.replace(/\r/g,"\n");
  }
}
