/**
 * テキストメッセージを生成する
 * 
 * @param {String} text - メッセージとして送信するテキスト
 * @return {LineMessage}
 */
function createText(text){
  return new Text(text);
}

/**
 * 画像メッセージを生成する
 * 
 * @param {string} originalContentUrl - オリジナルのURL
 * @param {string} previewImageUrl - プレビューURL
 * @return {LineMessage}
 */
function createImage(originalContentUrl,previewImageUrl){
  return new ImageMessage(originalContentUrl,previewImageUrl);
}