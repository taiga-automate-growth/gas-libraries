class Config {
    constructor(sheetId = null, sheetName = null) {
      // sheetIdが指定されていなければ、getActive()を使う
      this.sheetId = sheetId || SpreadsheetApp.getActive().getId();
      this.sheetName = sheetName || "設定";
      const sheet = SpreadsheetApp.openById(this.sheetId).getSheetByName(this.sheetName);
      const values = sheet.getDataRange().getValues();
      this.data = {};
      for (let i = 0; i < values.length; i++) {
        const key = values[i][0];
        const value = values[i][1];
        if (key !== "") {
          this.data[key] = value;
        }
      }
    }

    /**
     * 設定値を取得する
     * @param {string} key - 設定値のキー
     * @returns {string} 設定値
     */
    get(key){
      return this.data[key];
    }
  }