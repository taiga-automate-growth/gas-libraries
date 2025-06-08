/**
 * テンプレートを設定する
 * 
 * @param {Template} template - テンプレートオブジェクト
 */
function setTemplate(template){
  throw new Error('Templateメッセージ専用のインスタンスメソッドです');
}

/**
 * 代替テキストを更新する
 * 
 * @param {string} altText - 代替テキスト通知やトークリストで表示される代替メッセージ
 */
function updateAltText(altText){
  throw new Error('Templateメッセージ専用のインスタンスメソッドです');
}

/**
 * 画像のアスペクト比を設定する
 * 
 * @param {"rectangle" | "square"} imageAspectRatio - 画像のアスペクト比。デフォルトはrectangle
 */ 
function setImageAspectRatio(imageAspectRatio = "rectangle"){
  throw new Error('Carouselメッセージ専用のインスタンスメソッドです');
}

/**
 * カラムを追加できるか判定する
 * 
 * @return {boolean} 追加できる場合はtrue,それ以外はfalse
 */
function canAddColumn(){
  throw new Error('Carouselメッセージ専用のインスタンスメソッドです');
}

/**
 * 画像サイズを設定する
 * 
 * @param {"cover" | "contain"} imageSize - 画像サイズ
 */ 
function setImageSize(imageSize = "cover"){
  throw new Error('Carouselメッセージ専用のインスタンスメソッドです');
}

/**
 * カラムを追加する
 * 
 * @param {Column} column - カラムオブジェクト
 */
function addColumn(column){
  throw new Error('Carouselメッセージ専用のインスタンスメソッドです');
}

/**
 * カラムオブジェクトを一括で追加する
 * 
 * @param {Array<Column>} columns - カラムオブジェクトの配列
 */
function addColumns(columns){
  throw new Error('Carouselメッセージ専用のインスタンスメソッドです');
}

/**
 * カラム数をカウントする
 * 
 * @return {number} 登録されているカラムメッセージの数
 */
function countColumns(){
  throw new Error('Carouselメッセージ専用のインスタンスメソッドです');
}

/**
 * アクションオブジェクトを追加する
 * @param {Action} action - アクションオブジェクト
 */
function addAction(action){
  throw new Error('Columnオブジェクト専用のインスタンスメソッドです');
}

/**
 * サムネイルを設定する
 *
 * @param {string} url - 画像URL
 * @param {string} backgroundColor - 画像背景色 RGB値
 */
function setThumbnail(url,backgroundColor){
  throw new Error('Columnオブジェクト専用のインスタンスメソッドです');
}

/**
 * タイトルを設定する
 * 
 * @param {string} title - タイトル
 */
function setTitle(title){
  throw new Error('Columnオブジェクト専用のインスタンスメソッドです');
}

/**
 * デフォルトアクションを設定する
 * 
 * @param {Action} action - アクションオブジェクト
 */
function setDefaultAction(action){
  throw new Error('Columnオブジェクト専用のインスタンスメソッドです');
}

/**
 * クイックリプライを設定する
 * @param {Array<LineAction>} quickReplyButtons - クイックリプライボタンの配列（最大13個） 
 */
function setQuickReply(quickReplyButtons){
  throw new Error("Messageオブジェクト専用のインスタンスメソッドです");
}