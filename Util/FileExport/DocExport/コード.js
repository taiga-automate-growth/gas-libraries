class DocExport {
  /**
   * @param {string} docId - GoogleドキュメントのID
   */
  constructor(docId) {
    this.docId = docId;
    this.parameter = new DocParameter(docId);
  }

  /**
   * パラメーター取得
   * @returns {DocParameter}
   */
  getParameter() {
    return this.parameter;
  }

  /**
   * Blobとしてエクスポート
   * @returns {Blob}
   */
  exportForBlob() {
    const url = `https://docs.google.com/feeds/download/documents/export/Export?id=${this.docId}&${this.parameter.build()}`;
    const token = ScriptApp.getOAuthToken();

    const response = UrlFetchApp.fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      muteHttpExceptions: true
    });

    if (response.getResponseCode() !== 200) {
      throw new Error(`エクスポートに失敗しました（コード: ${response.getResponseCode()}）`);
    }

    return response.getBlob();
  }

  /**
   * Driveに保存
   * @param {string} fileName 
   * @param {string} folderId 
   * @returns {GoogleAppsScript.Drive.File}
   */
  exportAndSave(fileName, folderId) {
    const blob = this.exportForBlob().setName(fileName);
    return DriveApp.getFolderById(folderId).createFile(blob);
  }
}
