/**
 * クエリを実行してデータを取得
 * @param {SheetQuery} sheetQuery - クエリ条件
   * @param {string} tableName - テーブル名
 * @returns {Array<Object>} 取得したデータ
 */
function get(sheetQuery = new SheetQuery(), table = "") {
  throw new Error("SheetDAO専用のメソッドです");
}


/**
 * @param {Array<Array>} data - 二次元配列
 */
function set(data){
  throw new Error("SheetDAO専用のメソッドです");
}

/**
 * すべてのデータを削除する
 */
function deleteAll(){
  throw new Error("SheetDAO専用のメソッドです");
}

/**
 * 最後に登録されているデータを返却する
 */
function getLastData(){
  throw new Error("SheetDAO専用のメソッドです");
}

/**
 * 最後に登録されているデータのIDを取得する
 * @param {string} columnName - IDが保存されているカラム名 
 */
function getLastId(columnName){
  throw new Error("SheetDAO専用のメソッドです");
}

/**
 * クエリを生成する
 * @return {SheetDAO}
 */
function query(){
  throw new Error("SheetDAO専用のメソッドです");
}

/**
 * あるカラムの値を全て同じ値に設定する
 * @param {string} columnName - カラム名
 * @param {string | number | Date} value - 値
 */
function setSameValues(columnName,value){
  throw new Error("SheetDAO専用のメソッドです");
}


/**
 * データの件数を取得する
 * @return {number} データの件数
 */
function count(){
  throw new Error("SheetDAO専用のメソッドです");
}