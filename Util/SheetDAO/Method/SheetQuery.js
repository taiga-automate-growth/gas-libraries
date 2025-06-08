/**
 * 必須条件を追加
 * @param {string} column - カラム名
 * @param {"=" | "<" | ">" | "<=" | ">=" | "!="} operand - 演算子（=, <, >, <=, >=,!=）
 * @param {Array<any>} values - 値
 * @returns {SheetDAO}
 */
function where(column, operand, values) {
  throw new Error("SheetQuery専用のメソッドです");
}

/**
 * 任意条件を追加（いずれかを満たせばOK）
 * @param {string} column - カラム名
 * @param {string} operand - 演算子
 * @param {Array<any>} values - 値
 * @returns {SheetDAO}
 */
function optional(column, operand, values) {
  throw new Error("SheetQuery専用のメソッドです");
}

/**
 * 並び順を指定
 * @param {string} column - カラム名
 * @param {"asc" | "desc"} order - 昇順または降順
 * @returns {SheetDAO}
 */
function orderBy(column, order = "asc") {
  throw new Error("SheetQuery専用のメソッドです");
}

/**
 * 取得件数を指定
 * @param {number} value - 取得件数
 * @returns {SheetDAO}
 */
function limit(value) {
  throw new Error("SheetQuery専用のメソッドです");
}

/**
 * オフセットを指定
 * @param {number} value - スキップする件数
 * @returns {SheetDAO}
 */
function offset(value) {
  throw new Error("SheetQuery専用のメソッドです");
}

/**
 * 関連データをJOINする
 * @param {string} table - 参照するテーブル（シート名）
 * @param {string} localKey - 現在のテーブルのキー
 * @param {string} foreignKey - 参照先のキー
 * @param {string} as - 取得データのプロパティ名
 * @param {SheetQuery} [query] - JOIN対象の検索条件
 * @returns {SheetDAO}
 */
function join(table, localKey, foreignKey, as, query = new SheetQuery()) {
  throw new Error("SheetQuery専用のメソッドです");
}