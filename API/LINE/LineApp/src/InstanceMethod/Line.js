/**
 * ボットの基礎情報を取得する
 * 
 */
function getBotInfo(){
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}

/**
 * フォロワーのIDを取得する
 */
function getFollowerIds(){
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}

/**
 * ブロードキャストメッセージを送信する
 * @param {Array<Object>} messages - 送信するメッセージの配列
 * @param {boolean} [notificationDisabled=false] - 通知を無効にするかどうか
 * @returns {Object} - APIレスポンス
 */
function broadcast(messages, notificationDisabled = false) {
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}
  

/**
 * プッシュメッセージを送信する
 * 
 * ※このメソッドはラインボットクラスのプロトタイプメソッドです。
 * ほかのオブジェクトからは利用できません。
 * 
 * @param {string} to - 送信先のID。Webhookイベントオブジェクトで返される、userId、groupId、またはroomIdの値を使用します。
 * @param {Array<LineMessage>} messages - 送信するLineMessageオブジェクトの配列 [LineMessages,...] 最大5件
 * @param {bool} notifiactionDisabled - true：メッセージ送信時に、ユーザーに通知されない。　false：メッセージ送信時に、ユーザーに通知される。ただし、LINEで通知をオフにしている場合は通知されません。デフォルト値はfalseです。
 */
function sendPush(to , messages , notificationDisabled = false){
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}

/**
 * 返信をする
 * 
 * ※このメソッドはLineBotクラスのインスタンスメソッドです。
 * 補完されてもほかのオブジェクトからは利用できません。
 * 
 * @param {String} replyToken 返信用トークン
 * @param {Array} messages 送信するメッセージの配列 最大5件まで
 */
function reply(replyToken , messages) {
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}

/**
 * ローディングを表示する
 * 
 * @param {string} chatId - ユーザーID
 * @param {number} loadingSeconds - ロード時間（秒）0~60秒までの5秒刻み
 */
function loading(chatId, loadingSeconds = 20){
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}


/**
 * リッチメニューを作成する
 * @param {LineRichMenu} richMenu - リッチメニューオブジェクト
 */
function createRichMenu(richmenu){
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}

/**
 * リッチメニューに画像をアップロードする
 * 
 * @param {String} richMenuId - リッチメニューのID
 * @param {Blob} imageBlob - 画像のBlobオブジェクト（JPEGまたはPNG）
 * @returns {Object} - アップロード結果のレスポンス
 */
function uploadRichMenuImage(richMenuId, imageBlob) {
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}

/**
 * リッチメニューをユーザーにリンクする
 * @param {string} userId - ユーザーID
 * @param {string} richMenuId - リッチメニューのID
 */
function linkRichMenu(userId,richMenuId){
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}

/**
 * リッチメニューを配列で取得する
 */
function getRichMenus(){
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}

/**
 * リッチメニューのリンクを解除する
 * @param {string} userId - 解除対象となるユーザーのID
 */
function unlinkRichMenu(userId){
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}

/**
 * リッチメニューを削除する
 * @param {string} richMenuId - 削除対象のリッチメニューID
 */
function deleteRichMenu(richMenuId){
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}

/**
 * プッシュメッセージを検証する
 * @param {LineMessage} messages - メッセージ
 */
function validatePushMessage(messages){
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}

/**
 * マルチキャストメッセージを配信する
 */
function sendMultiCast(toIds , messages , notificationDisabled = false) {
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}

/**
 * 複数のユーザーにリッチメニューを登録する
 * @param {string} richMenuId - リッチメニューのID
 * @param {Array<string>} userIds - ユーザーID
 */
function linkRichMenuBulk(richMenuId,userIds){
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}

/**
 * ユーザーのリッチメニューを取得する
 * @param {string} userId - ユーザーID
 */
function getRichMenu(userId){
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}


/**
 * デフォルトリッチメニューを設定する
 * @param {string} richMenuId - リッチメニューのID
 */
function setupDefaultRichMenu(richMenuId){
  throw new Error('これはLineBotクラス専用のダミーメソッドです');
}