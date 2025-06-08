/**
 * ロガーを生成する
 * 
 * @param {string} docId - ログを出力するドキュメントのID
 * @return {DocumentLogger}
 */
function create(docId) {
  return new DocumentLogger(docId);
}
