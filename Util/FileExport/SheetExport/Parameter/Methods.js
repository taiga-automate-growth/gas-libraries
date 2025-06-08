/**
 * ファイル形式を指定する
 * デフォルトはPDF
 * @param {"pdf" | "csv" | "xlsx" | "tsv" | "ods" | "zip"} format - フォーマット
 * @return {SheetExport}
 */
function format(format){
  throw new Error("Parameter専用のメソッドです");
}

/**
 * 用紙の向きを指定する
 * デフォルトは縦向き
 * @param {"vertical" | "horizontal"} orientation - 用紙の向き
 * @return {SheetExport}
 */
function orientation(orientation) { 
  throw new Error("Parameter専用のメソッドです");
}

/**
 * サイズを指定する
 * デフォルトはA4
 * @param {"letter" | "tabloid" | "legal" | "statement" | "executive" | "folio" | "A3" | "A4" | "A5" | "B4" | "B5"} size - サイズ
 * @return {SheetExport}
 */
function size(size){
  throw new Error("Parameter専用のメソッドです");
}

/**
 * 幅に合わせる
 * デフォルトはfalse
 * @param {boolean} enable - 幅に合わせる場合はtrue,合わせない場合はfalse 
 * @return {SheetExport}
 */
function fitWidth(enable = true) { 
  throw new Error("Parameter専用のメソッドです");
}

/**
 * 高さに合わせる
 * デフォルトはfalse
 * @param {boolean} enable - 高さに合わせる場合はtrue,合わせない場合はfalse
 * @return {SheetExport}
 */
function fitHeight(enable = true) { 
  throw new Error("Parameter専用のメソッドです");
}

/**
 * スケールを設定
 * デフォルトはnormal
 * @param { "normal" | "fitw" | "fith" | "fitToPage" } value - 値
 * @return {SheetExport}
 */
function scale(value) { 
  throw new Error("Parameter専用のメソッドです");
}

/**
 * 余白を設定する
 * @param {number} top - 上余白（cm）
 * @param {number} bottom - 下余白（cm）
 * @param {number} left - 左余白（cm）
 * @param {number} right - 右余白（cm）
 * @return {SheetExport}
 */
function margin(top = 0, bottom = 0, left = 0, right = 0) {
  throw new Error("Parameter専用のメソッドです");
}

/**
 * グリッド線の表示有無
 * @param {boolean} enable - 表示する場合はtrue,非表示の場合はfalse
 * @return {SheetExport}
 */
function showGridlines(enable = true){
  throw new Error("Parameter専用のメソッドです");
}

/**
 * メモの表示有無
 * @param {boolean} enable - 表示する場合はtrue,非表示の場合はfalse
 * @return {SheetExport}
 */
function printNotes(enable = true) {
  throw new Error("Parameter専用のメソッドです");
}

/**
 * タイトルの表示有無
 * @param {boolean} enable - 表示する場合はtrue,非表示の場合はfalse
 * @return {SheetExport}
 */
function title(enable = true) {
  throw new Error("Parameter専用のメソッドです");
}

/**
 * ページ番号を表示する
 * @return {SheetExport}
 */
function pageNum() { 
  throw new Error("Parameter専用のメソッドです");
}

/**
 * 水平方向の配置
 * デフォルトは中央
 * @param { "CENTER" | "LEFT" | "RIGHT" } position -  配置
 * @return {SheetExport}
 */
function horizontalAlignment(position = "CENTER") {
  throw new Error("Parameter専用のメソッドです");
}

/**
 * 垂直方向の配置
 * デフォルトは中央
 * @param { "TOP" | "MIDDLE" | "BOTTOM" } position -  配置
 * @return {SheetExport}
 */
function verticalAlignment(position = "MIDDLE") {
  throw new Error("Parameter専用のメソッドです");
}

/**
 * 特定のシートを設定する
 * @return {SheetExport}
 */
function sheet(sheetName){
  throw new Error("Parameter専用のメソッドです");
}