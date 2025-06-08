/**
 * Googleドキュメント出力用のオブジェクトを生成する
 * @param {string} docId - ドキュメントID
 * @return {DocExport}
 */
function create(docId){
  return new DocExport(docId);
}

/**
 * パラメーターを取得する
 * @return {DocParameter}
 */
function getParameter(){
  throw new Error("DocExport専用のメソッドです");
}

/**
 * エクスポートする
 * @return {Blob} 
 */
function exportForBlob() {
  throw new Error("DocExport専用のメソッドです");
}

/**
 * エクスポートして保存するGoogle Driveに保存
 * @param {string} fileName - 保存するファイル名
 * @param {string} folderId - 保存先フォルダのID
 * @return {DriveApp.File} 保存されたファイルオブジェクト
 */
function exportAndSave(fileName, folderId) {
  throw new Error("DocExport専用のメソッドです");
}

