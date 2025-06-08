/**
 * スプレッドシートデータベースクラス
 * スプレッドシートをデータベースのように扱い、クエリを実行する
 */
class SheetDAO {
  /**
   * @param {string} spreadsheetId - スプレッドシートのID（省略時はアクティブシート）
   * @param {string} tableName - メインテーブル（シート名）
   */
  constructor(spreadsheetId, tableName) {
    this.ss = spreadsheetId ? SpreadsheetApp.openById(spreadsheetId) : SpreadsheetApp.getActive();
    this.tableName = tableName;
    this.mainTable = this.ss.getSheetByName(tableName);
    if (!this.mainTable) throw new Error(`シート ${tableName} が見つかりません`);
  }

  /**
   * クエリを実行してデータを取得
   * @param {SheetQuery} sheetQuery - クエリ条件
   * @param {string} tableName - テーブル名
   * @returns {Array<Object>} 取得したデータ
   */
  get(sheetQuery = new SheetQuery(), tableName = "") {
    let table;
    if(tableName === ""){
      table = this.mainTable;
    }else{
      table = this.ss.getSheetByName(tableName);
      if (!table) throw new Error(`シート ${tableName} が見つかりません`);
    }

    const lastRow = table.getLastRow();
    if (lastRow === 1) return [];

    const lastColumn = table.getLastColumn();
    const values = table.getRange(2, 1, lastRow - 1, lastColumn).getValues();
    const columns = table.getRange(1, 1, 1, lastColumn).getValues()[0];

    // フィルタリング
    const searchedValues = values.filter(row => {
      const isFullfilled = (condition) => {
        const columnIndex = columns.indexOf(condition.column);
        if (columnIndex === -1) throw new Error(`${condition.column}というカラムが見つかりません`);
        let target = row[columnIndex];
        
        if (!Array.isArray(condition.values)) {
          throw new Error(`valuesは配列である必要があります: ${JSON.stringify(condition)}`);
        }
        
        // 空白を明示的に検索する条件
        const isSearchingForEmpty = condition.values.includes(null) || condition.values.includes("");

        // セルが空白の場合の処理（operand を考慮して分岐）
        if (target === undefined || target === null || target === "") {
          if (condition.operand === "=") {
            return isSearchingForEmpty; // 空を探しているならtrue
          }
          if (condition.operand === "!=") {
            return !isSearchingForEmpty; // 空じゃないものを探しているならtrue
          }
          // その他（数値比較など）は false
          return false;
        }

        // 日付型の処理
        if (Object.prototype.toString.call(target) === "[object Date]") {
          target = new Date(row[columnIndex]);
          const dataTime = target.getTime();
          const conditionTime = [];
          condition.values.forEach(value => {
            if(value !== null && value !== undefined && value !== ""){
              conditionTime.push(value.getTime());
            }else{
              conditionTime.push("");
            }
          });

          switch(condition.operand){
            case "=":
              return conditionTime.some(time => time === dataTime);
            case "<":
              return dataTime < conditionTime[0];
            case ">":
              return dataTime > conditionTime[0];
            case "<=":
              return dataTime <= conditionTime[0];
            case ">=":
              return dataTime >= conditionTime[0];
            case "!=":
              return conditionTime.every(time => time !== dataTime);
          }
        }else{
          if (condition.operand === "=") return condition.values.includes(target);
          if (condition.operand === "<") return target < condition.values[0];
          if (condition.operand === ">") return target > condition.values[0];
          if (condition.operand === "<=") return target <= condition.values[0];
          if (condition.operand === ">=") return target >= condition.values[0];
          if (condition.operand === "!=") return !condition.values.includes(target);
        }


        return false;
      };

      return sheetQuery.requires.every(isFullfilled) &&
             (sheetQuery.options.length === 0 || sheetQuery.options.some(isFullfilled));
    });

    // 並び替え
    if (sheetQuery.orderby) {
      const columnIndex = columns.indexOf(sheetQuery.orderby.column);
      if (columnIndex !== -1) {
        searchedValues.sort((a, b) => sheetQuery.orderby.order === "asc"
          ? a[columnIndex] - b[columnIndex]
          : b[columnIndex] - a[columnIndex]);
      }
    }

    // リミット & オフセット
    let result = searchedValues;
    if (sheetQuery.offsetNum && sheetQuery.offsetNum > 0) result = result.slice(sheetQuery.offsetNum);
    if (sheetQuery.limitNum) result = result.slice(0, sheetQuery.limitNum);

    // オブジェクト化
    const formattedData = result.map(row => {
      const obj = {};
      columns.forEach((col, index) => obj[col] = row[index]);
      return obj;
    });

    // JOINの処理
    if (sheetQuery.joins.length > 0) {
      sheetQuery.joins.forEach(join => {
        const relatedData = this.get(join.query,join.table);
        const relatedMap = relatedData.reduce((acc, item) => {
          const key = item[join.foreignKey];
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
        }, {});

        formattedData.forEach(row => {
          row[join.as] = relatedMap[row[join.localKey]] || [];
        });
      });
    }

    return formattedData;
  }


  /**
   * @param {Array<Array>} data - 二次元配列
   */
  set(data){
    try{
      const startRow = this.mainTable.getLastRow() + 1;
      const rows = data.length;
      if(data.length === 0) return;
      let columns = this.mainTable.getLastColumn();
      columns = columns === 0? data[0].length: columns;

      const range = this.mainTable.getRange(startRow,1,rows,columns);
      range.setValues(data);

    }catch(e){
      throw e;
    }
  }

  /**
   * すべてのデータを削除する
   */
  deleteAll(){
    let lastRow = this.mainTable.getLastRow();
    if(lastRow === 1 || lastRow === 0) return;

    const lastColumn = this.mainTable.getLastColumn();
    const range = this.mainTable.getRange(2, 1, lastRow - 1, lastColumn);

    range.clearContent();
  }

  /**
   * 最後に登録されているデータを返却する
   */
  getLastData(){
    const lastRow = this.mainTable.getLastRow();
    if(lastRow <= 1) return null;
    const lastColumn = this.mainTable.getLastColumn();
    const values = this.mainTable.getRange(lastRow, 1, 1, lastColumn).getValues();
    return values[0];
  }

  /**
   * 最後に登録されているデータのIDを取得する
   * @param {string} columnName - IDが保存されているカラム名 
   */
  getLastId(columnName){
    const lastRow = this.mainTable.getLastRow();
    if(lastRow <= 1) return null;
    
    const lastColumn = this.mainTable.getLastColumn();
    const values = this.mainTable.getRange(2, 1, lastRow - 1, lastColumn).getValues();

    const columns = this.mainTable.getRange(1,1,1,lastColumn).getValues()[0];
    const columnIndex = columns.findIndex(column => column === columnName); // 条件が指定されているカラムを特定する
    return values[values.length - 1][columnIndex];
  }

  /**
   * クエリを生成する
   */
  query(){
    return new SheetQuery();
  }

  /**
   * あるカラムの値を全て同じ値に設定する
   * @param {string} columnName - カラム名
   * @param {string | number | Date} value - 値
   */
  setSameValues(columnName,value){
    const lastColumn = this.mainTable.getLastColumn();
    const columns = this.mainTable.getRange(1,1,1,lastColumn).getValues()[0];
    const columnIndex = columns.findIndex(column => column === columnName); // 条件が指定されているカラムを特定する

    const lastRow = this.mainTable.getLastRow();
    if(lastRow <= 1) {
      console.error(`${this.mainTable}には値がないので、${columnName}の値を${value}に設定できませんでした`);
      return;
    }

    this.mainTable.getRange(2,columnIndex + 1,lastRow - 1,1).setValue(value);
  }

  /**
   * データの件数を取得する
   * @return {number} データの件数
   */
  count(){
    const lastRow = this.mainTable.getLastRow();
    if (lastRow === 0) return 0;
    return lastRow - 1;
  }
}
