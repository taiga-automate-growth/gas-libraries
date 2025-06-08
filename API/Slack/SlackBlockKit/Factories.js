/**
 * SlackBlockKitのインスタンスを作成する
 * @returns {SlackBlockKit} 新しいSlackBlockKitオブジェクト
 */
function createSlackBlockKit() {
  return new SlackBlockKit();
}

/**
 * Blockのファクトリメソッド
 * @returns {SlackBlockKit} 新しいBlockオブジェクト
 */
function createBlock() {
  return new Block();
}

/**
 * Sectionのファクトリメソッド
 * @returns {SlackBlockKit} 新しいSectionオブジェクト
 */
function createSection() {
  return new Section();
}

/**
 * BlockElementのファクトリメソッド
 * @returns {SlackBlockKit} 新しいBlockElementオブジェクト
 */
function createBlockElement() {
  return new BlockElement();
}

/**
 * Accessoryのファクトリメソッド
 * @returns {SlackBlockKit} 新しいAccessoryオブジェクト
 */
function createAccessory() {
  return new Accessory();
}

/**
 * Textのファクトリメソッド
 * @param {string} type - "mrkdwn" または "plain_text"
 * @param {string} text - テキスト
 * @param {boolean} [emoji=false] - 絵文字を有効にするかどうか
 * @param {boolean} [verbatim=false] - プレーンテキストとして処理するかどうか
 * @returns {TextComposition} 新しいTextオブジェクト
 */
function createText(type, text, emoji = false, verbatim = false) {
  return new TextComposition(type, text, emoji, verbatim);
}

/**
 * Imageのファクトリメソッド
 * @param {string} image_url - 画像のURL
 * @param {string} alt_text - 画像の代替テキスト
 * @returns {SlackBlockKit} 新しいImageオブジェクト
 */
function createImage(image_url, alt_text) {
  return new Image(image_url, alt_text);
}

/**
 * Buttonオブジェクトを生成します。
 * @param {Object} text - plain_text形式のTextオブジェクト
 * @param {string} action_id - ボタン押下時のアクションID（未指定で自動生成）
 * @returns {SlackBlockKit} Buttonオブジェクト
 */
function createButton(text, action_id) {
  return new Button(text, action_id);
}

/**
 * Dividerのファクトリメソッド
 * @param {string} [block_id] - ブロックID
 * @returns {SlackBlockKit} 新しいDividerオブジェクト
 */
function createDivider(block_id = null) {
  return new Divider(block_id);
}

/**
 * StaticSelectのファクトリメソッド
 * @param {string} placeholder - プレースホルダーとして表示するテキスト
 * @param {string} action_id - アクションID（省略時は自動生成）
 * @returns {SlackBlockKit} 新しいStaticSelectオブジェクト
 */
function createStaticSelect(placeholder, action_id) {
  return new StaticSelect(placeholder, action_id);
}

/**
 * Datepickerのファクトリメソッド
 * @param {string} placeholder - プレースホルダーとして表示するテキスト
 * @param {string} action_id - アクションID（省略時は自動生成）
 * @returns {SlackBlockKit} 新しいDatepickerオブジェクト
 */
function createDatepicker(placeholder, action_id) {
  return new Datepicker(placeholder, action_id);
}