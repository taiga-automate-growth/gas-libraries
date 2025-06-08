/**
 * アクションオブジェクトの基底クラス
 * 
 * @class 
 */
class Action{

  /**
   * @constructor
   * @param {"postback" | "text" | "uri"} type - アクションオブジェクトの種別
   */
  constructor(type){
    this.type = type;
  }

  /**
   * ラベルを設定する
   * @param {string} label - ラベル
   */
  setLabel(label){
    this.label = label;
  }
}