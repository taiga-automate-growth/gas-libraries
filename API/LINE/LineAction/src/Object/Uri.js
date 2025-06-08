
/**
 * URIアクションを表すクラス
 */
class UriAction extends Action{

  /**
   * @constructor
   * @param {string} uri - アクション実行時に開かれるURL
   */
  constructor(uri){
    super("uri");
    this.uri = uri;
  }

  /**
   * デスクトップ専用のURLを設定する
   * 
   * @param {string} desktopUrl - デスクトップで優先されるURL ※Flex MessageにURIアクションを関連付けた場合にのみ有効です。クイックリプライでは動作しません。
   */
  setDesktopUri(desktopUrl){
    this.altUri.desktop = desktopUrl;
  }
}