class Config {
    constructor(sheetId = null, sheetName = null) {
      // sheetIdが指定されていなければ、getActive()を使う
      this.sheetId = sheetId || SpreadsheetApp.getActive().getId();
      this.sheetName = sheetName || "設定";
      const sheet = this.getSheet();
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

    get(key){
      return this.data[key];
    }
  }