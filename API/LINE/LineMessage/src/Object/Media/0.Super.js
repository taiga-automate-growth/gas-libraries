/**
 * 画像・動画・音声メッセージを表すクラス
 */
class Media extends Message{
  constructor(originalContentUrl){
    super();
    this.originalContentUrl = originalContentUrl;
  }
}