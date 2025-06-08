/**
 * URIアクションを生成する
 * @param {string} uri - アクション実行時に開かれるURL
 * @return {LineAction}
 */
function createUri(uri){
  return new UriAction(uri);
}