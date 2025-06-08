/**
 * メッセージオブジェクトの基底クラス
 * @class
 * 
 * このクラスを継承して9種のメッセージオブジェクトを定義する
 * 
 */
class Message{

  /**
   * @constructor
   * @param {"text" | "sticker" | "template"} type - メッセージのタイプ
   */
  constructor(type){
    this.type = type;
  }

  /**
   * クイックリプライボタンを設定する
   * @param {Array<LineAction>} quickReplyButtons - クイックリプライボタンの配列（最大13個）
   */
  setQuickReply(quickReplyButtons){
    if(quickReplyButtons.length > 13){
      throw new Error("クイックリプライボタンは最大で13個までです");
    }
    this.quickReply = {};
    this.quickReply.items = quickReplyButtons
  }
}