class MessageAction extends Action{

  /**
   * @constructor
   * @param {string} text - アクションの実行時に送信されるテキスト
   */
  constructor(text){
    super("message");
    this.text = text;
  }
}