/**
 * Slackアプリを生成する
 * @param {string} botToken - ボットのトークン
 * @param {string} userToken - ユーザートークン
 * @return {SlackApp}
 */
function create(botToken, userToken = "") {
  return new SlackApp(botToken,userToken);
}
