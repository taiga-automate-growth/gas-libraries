/**
 * メッセージを送信する
 * @param {string} message - フォールバック用メッセージ（通知など）
 * @param {string} channelId - チャンネルID
 * @param {Array<object>} blocks - Block Kitのblocks配列
 * @param {Array<object>} attachments - 任意の旧attachments配列（使わないことが多い）
 * @return {object}
 */
function postMessage(message, channelId, blocks = [], attachments = []) {
  throw new Error("ダミーメソッドです");
}

/**
 * ワークスペース内の全てのユーザーを取得する
 * @return {Array<SlackUser>} 
 */
function getUsers(){
  throw new Error("ダミーメソッドです");
}

/**
 * BOTとのダイレクトメッセージを開く
 * @param {string} userId - DMを送るユーザーのID 
 */
function openDM(userId){
  throw new Error("ダミーメソッドです");
}

/**
 * ファイル付きメッセージを送信する
 * @param {string} channel - メッセージを送信するチャンネルのID
 * @param {string} message - メッセージの内容
 * @param {Blob} file - ファイル
 * @param {string} fileName - ファイル名
 * @return {Object}
 */
function postMessageWithFile(channel, message, file, fileName){
  throw new Error("ダミーメソッドです");
}

/**
 * メッセージを取得する
 * @param {string} channelId - チャンネルID
 * @param {string} messageTs - メッセージのタイムスタンプ
 * @return {string}
 */
function getMessage(channelId,messageTs){
  throw new Error("ダミーメソッドです");
}

/**
 * Slackのメッセージリンクを生成する
 * @param {string} workspace - ワークスペース名
 * @param {string} channelId - チャンネルID
 * @param {string} ts - メッセージのタイムスタンプ
 * @return {string}
 */
function getMessageLink(workspace, channelId, ts) {
  const tsFormatted = ts.replace('.', '').padEnd(16, '0');
  return `https://${workspace}.slack.com/archives/${channelId}/p${tsFormatted}`;
}