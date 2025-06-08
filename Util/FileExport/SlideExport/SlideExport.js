class SlideExport {
  constructor(presentationId) {
    this.presentationId = presentationId;
    this.parameter = new Parameter();
  }

  /**
   * パラメーターを取得
   * @returns {Parameter}
   */
  getParameter() {
    return this.parameter;
  }

  /**
   * エクスポートしてBlobを返す
   * @returns {Blob}
   */
  exportForBlob() {
    const format = this.parameter.build();
    const url = `https://docs.google.com/presentation/d/${this.presentationId}/export/${format}`;
    Logger.log("Export URL: " + url);

    const options = {
      method: "get",
      headers: { Authorization: `Bearer ${ScriptApp.getOAuthToken()}` },
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);
    Logger.log("Response code: " + response.getResponseCode());
    Logger.log("Content-Type: " + response.getHeaders()["Content-Type"]);

    return UrlFetchApp.fetch(url, options).getBlob();
  }

  /**
   * Driveに保存してFileを返す
   * @param {string} fileName - ファイル名（拡張子なし）
   * @param {string} folderId - フォルダID
   * @returns {GoogleAppsScript.Drive.File}
   */
  exportAndSave(fileName, folderId) {
    const blob = this.exportForBlob();
    const ext = this.parameter.getExtension();
    const fullName = `${fileName}.${ext}`;
    return DriveApp.getFolderById(folderId).createFile(blob.setName(fullName));
  }
}
