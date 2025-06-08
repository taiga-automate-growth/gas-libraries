/**
 * スプレッドシート用クエリクラス
 * データの検索条件やソート、JOINの指定を行う
 */
class SheetQuery {
  constructor() {
    this.requires = [];
    this.options = [];
    this.orderby = null;
    this.limitNum = null;
    this.offsetNum = null;
    this.joins = [];
  }

  /**
   * 必須条件を追加
   * @param {string} column - カラム名
   * @param {string} operand - 演算子（=, <, >, <=, >=, !=）
   * @param {Array<any>} values - 値
   * @returns {SheetQuery}
   */
  where(column, operand, values) {
    this.requires.push({ column, operand, values });
    return this;
  }

  /**
   * 任意条件を追加（いずれかを満たせばOK）
   * @param {string} column - カラム名
   * @param {string} operand - 演算子
   * @param {Array<any>} values - 値
   * @returns {SheetQuery}
   */
  optional(column, operand, values) {
    this.options.push({ column, operand, values });
    return this;
  }

  /**
   * 並び順を指定
   * @param {string} column - カラム名
   * @param {"asc" | "desc"} order - 昇順または降順
   * @returns {SheetQuery}
   */
  orderBy(column, order = "asc") {
    this.orderby = { column, order };
    return this;
  }

  /**
   * 取得件数を指定
   * @param {number} value - 取得件数
   * @returns {SheetQuery}
   */
  limit(value) {
    this.limitNum = value;
    return this;
  }

  /**
   * オフセットを指定
   * @param {number} value - スキップする件数
   * @returns {SheetQuery}
   */
  offset(value) {
    this.offsetNum = value;
    return this;
  }

  /**
   * 関連データをJOINする
   * @param {string} table - 参照するテーブル（シート名）
   * @param {string} localKey - 現在のテーブルのキー
   * @param {string} foreignKey - 参照先のキー
   * @param {string} as - 取得データのプロパティ名
   * @param {SheetQuery} [query] - JOIN対象の検索条件
   * @returns {SheetQuery}
   */
  join(table, localKey, foreignKey, as, query = new SheetQuery()) {
    this.joins.push({ table, localKey, foreignKey, as, query });
    return this;
  }
}
