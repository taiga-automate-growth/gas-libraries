/**
 * ラインボットを生成する
 * 
 * @param {String} accessToken アクセストークン
 * @return {LineApp} LineBotインスタンス
 */
function create(accessToken) {
  return new Line(accessToken);
}