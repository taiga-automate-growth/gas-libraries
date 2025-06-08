/**
 * スタンプメッセージを表すクラス
 * @class
 */
class Stamp extends Message{

  /**
   * StickerMessageを初期化する
   * 
   * @param {String} packageId スタンプセットのパッケージID
   * @param {String} stickerId スタンプのID
   */
  constructor(packageId,stickerId){
    super();
    this.type = "sticker";
    this.packageId = packageId;
    this.stickerId = stickerId;
  }

  // 引用トークンをセット
  setQuoteToken(quoteToken){
    this.quoteToken = quoteToken;
  }

}
