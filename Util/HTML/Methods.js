/**
 * 指定した開始文字列と終了文字列の間にあるすべての文字列を抽出する
 * 
 * @param {string} startString - 抽出開始位置を示す文字列
 * @param {string} endString - 抽出終了位置を示す文字列
 * @returns {Array<string>} 抽出された文字列の配列
 */
function sliceBetween(startString, endString) {
  throw new Error("インスタンスメソッドです");
}

/**
 * 正規表現を使ってHTMLから文字列を抽出する
 * 
 * @param {RegExp} regex - 抽出に使う正規表現（キャプチャグループが必要）
 * @returns {Array<string>} 抽出された文字列の配列
 */
function getByRegex(regex) {
  throw new Error("インスタンスメソッドです");
}

/**
 * 指定した文字列以降の内容をすべて削除したHTML文字列を返す
 * 
 * @param {string} removeText - 削除開始位置となる文字列
 * @returns {string} 削除後のHTML文字列
 */
function removeBackward(removeText) {
  throw new Error("インスタンスメソッドです");
}
/**
 * 指定した文字列で囲まれた文字列をすべて抽出する
 * （例: getByText("●") → "●〜●" の間にある文字列をすべて取得）
 * 
 * @param {string} string - 開始と終了に使われる囲み文字列
 * @returns {Array<string>} 抽出された文字列の配列
 */
function getByText(string) {
  throw new Error("インスタンスメソッドです");
}