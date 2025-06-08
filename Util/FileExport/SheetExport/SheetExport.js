class SheetExport {
  constructor(ssId) {
    this.ssId = ssId;
    this.parameter = new Parameter(ssId);
  }

  /**
   * パラメーターを取得する
   * @return {Parameter}
   */
  getParameter(){
    return this.parameter;
  }

  /**
   * エクスポートする
   * @return {Blob} 
   */
  exportForBlob() {
    const url = `https://docs.google.com/spreadsheets/d/${this.ssId}/export?${this.parameter.build()}`;
    
    const token = ScriptApp.getOAuthToken();
    return UrlFetchApp.fetch(url, { headers: { Authorization: `Bearer ${token}` } }).getBlob();
  }

  /**
   * エクスポートして保存するGoogle Driveに保存
   * @param {string} fileName - 保存するファイル名
   * @param {string} folderId - 保存先フォルダのID
   * @return {DriveApp.File} 保存されたファイルオブジェクト
   */
  exportAndSave(fileName, folderId) {
    const blob = this.exportForBlob().setName(fileName);
    return DriveApp.getFolderById(folderId).createFile(blob);
  }
}
