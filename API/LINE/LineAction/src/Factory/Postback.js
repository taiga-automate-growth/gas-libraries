/**
 * ポストバックアクションを生成する
 * @param {string} data - Webhookを介して返却される文字列
 * @return {LineAction}
 */
function createPostback(data) {
  return new Postback(data);
}
