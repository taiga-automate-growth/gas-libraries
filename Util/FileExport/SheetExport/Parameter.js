/**
 * ドキュメント
 * https://spreadsheet.dev/comprehensive-guide-export-google-sheets-to-pdf-excel-csv-apps-script
 */
class Parameter {
  constructor(ssId) {
    this.ssId = ssId;
    this.params = {
      exportFormat: "pdf",
      size: "A4",
      portrait: true,
      fitw: true,
      fith: false,
      scale: 1,
      top_margin: 0,
      bottom_margin: 0,
      left_margin: 0,
      right_margin: 0,
      gridlines: false,
      printnotes: false,
      title: false,
      horizontal_alignment: "CENTER",
      vertical_alignment: "MIDDLE"
    };
  }

  /**
   * ファイル形式を指定する
   * デフォルトはPDF
   * @param {"pdf" | "csv" | "xlsx" | "tsv" | "ods" | "zip"} format - フォーマット
   */
  format(format){
    this.params.exportFormat = format;
    return this;
  }

  /**
   * 用紙の向きを指定する
   * デフォルトは縦向き
   * @param {"vertical" | "horizontal"} orientation - 用紙の向き
   */
  orientation(orientation) { 
    if(orientation === "vertical"){
      this.params.portrait = true;
    }else if(orientation === "horizontal"){
      this.params.portrait = false;
    }
    return this; 
  }

  /**
   * サイズを指定する
   * デフォルトはA4
   * @param {"letter" | "tabloid" | "legal" | "statement" | "executive" | "folio" | "A3" | "A4" | "A5" | "B4" | "B5"} size - サイズ
   */
  size(size){
    this.params.size = size;
    return this;
  }

  /**
   * 幅に合わせる
   * デフォルトはfalse
   * @param {boolean} enable - 幅に合わせる場合はtrue,合わせない場合はfalse
   * @return {this}
   */
  fitWidth(enable = true) {
    if (enable) {
      this.params.fitw = true;
      this.params.fith = false;
      this.params.scale = 2;  // ← 追加
    } else {
      this.params.fitw = false;
      this.params.scale = 1;
    }
    return this;
  }


  /**
   * 高さに合わせる
   * デフォルトはfalse
   * @param {boolean} enable - 高さに合わせる場合はtrue,合わせない場合はfalse
   */
  fitHeight(enable = true) { 
    if(enable) this.params.fitw = false;
    this.params.fith = enable;
    return this;
  }

  /**
   * スケールを設定
   * デフォルトはnormal
   * @param { "normal" | "fitw" | "fith" | "fitToPage" } value - 値
   */
  scale(value) { 
    switch(value){
      case "normal":
        this.params.scale = 1;
        break;
      case "fitw":
        this.params.scale = 2;
        break;
      case "fith":
        this.params.scale = 3;
        break;
      case "fitToPage":
        this.params.scale = 4;
        break;
      default:
        console.error(`該当する値がありません：${value}`)
        break;
    }
    return this;
  }

  /**
   * 余白を設定する
   * @param {number} top - 上余白（cm）
   * @param {number} bottom - 下余白（cm）
   * @param {number} left - 左余白（cm）
   * @param {number} right - 右余白（cm）
   */
  margin(top = 0, bottom = 0, left = 0, right = 0) {
    this.params.top_margin = top / 2.54;
    this.params.bottom_margin = bottom / 2.54;
    this.params.left_margin = left / 2.54;
    this.params.right_margin = right / 2.54;
    return this;
  }

  /**
   * グリッド線の表示有無
   * @param {boolean} enable - 表示する場合はtrue,非表示の場合はfalse
   */
  showGridlines(enable = true) { this.params.gridlines = enable; return this; }

  /**
   * メモの表示有無
   * @param {boolean} enable - 表示する場合はtrue,非表示の場合はfalse
   */
  printNotes(enable = true) { this.params.printnotes = enable; return this; }

  /**
   * タイトルの表示有無
   * @param {boolean} enable - 表示する場合はtrue,非表示の場合はfalse
   */
  title(enable = true) { this.params.title = enable; return this; }

  /**
   * ページ番号を表示する
   */
  pageNum() { this.params.pagenum = "CENTER"; return this; }

  /**
   * 水平方向の配置
   * デフォルトは中央
   * @param { "CENTER" | "LEFT" | "RIGHT" } position -  配置
   */
  horizontalAlignment(position = "CENTER") { this.params.horizontal_alignment = position; return this; }

  /**
   * 垂直方向の配置
   * デフォルトは中央
   * @param { "TOP" | "MIDDLE" | "BOTTOM" } position -  配置
   */
  verticalAlignment(position = "MIDDLE") { this.params.vertical_alignment = position; return this; }

  /**
   * 特定のシートを設定する
   */
  sheet(sheetName){
    const sh = SpreadsheetApp.openById(this.ssId).getSheetByName(sheetName);
    if(!sh) throw new Error(`${sheetName}というシートはありません`);
    this.params.gid = sh.getSheetId();
    return this;
  }

  /**
   * クエリをビルドする
   */
  build() {
    return Object.keys(this.params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(this.params[key])}`)
      .join("&");
  }
}
