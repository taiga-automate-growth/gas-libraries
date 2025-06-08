class Template extends Message{
  /**
   * @constructor
   * @param {string} altText - 代替テキスト。通知やトークリストで表示される代替メッセージ
   * @param {Caousel | Button} template - テンプレートオブジェクト
   */
  constructor(altText,template = {}){
    super("template");
    this.altText = altText;
    this.template = template;
  }

  /**
   * テンプレートを設定する
   * 
   * @param {} template - テンプレートオブジェクト
   */
  setTemplate(template){
    this.template = template;
  }

  /**
   * 代替テキストを更新する
   * 
   * @param {string} altText - 代替テキスト通知やトークリストで表示される代替メッセージ
   */
  updateAltText(altText){
    this.altText = altText;
  }

}
