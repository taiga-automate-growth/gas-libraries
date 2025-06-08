/**
 * チャットワークを生成する
 * @param {string} token - APIトークン
 * @param {string} botId - ボットのアカウントID
 * @return {ChatworkApp}
 */
function create(token, botId){
  return new Chatwork(token,botId);
}
