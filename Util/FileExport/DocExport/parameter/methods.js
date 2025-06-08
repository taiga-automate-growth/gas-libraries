/**
 * パラメーターオブジェクトを生成する
 * @param {string} docId - GoogleドキュメントのID
 * @return {DocParameter}
 */
function createDocParameter(docId) {
  return new DocParameter(docId);
}

/**
 * 出力形式を設定する
 * @param {"html" | "pdf" | "txt" | "docx" | "odt" | "rtf"} format
 * @return {DocParameter}
 */
function format(format) {
  throw new Error("DocParameter専用のメソッドです");
}

/**
 * クエリパラメーターとして文字列を生成する
 * @return {string}
 */
function build() {
  throw new Error("DocParameter専用のメソッドです");
}

/**
 * 現在の出力形式を取得する
 * @return {string}
 */
function getFormat() {
  throw new Error("DocParameter専用のメソッドです");
}
