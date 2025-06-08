/**
 * 出力用のオブジェクトを生成する
 * @param {string} ssId - スプレッドシートID
 * @return {SheetExport}
 */
function create(ssId){
  return new SheetExport(ssId);
}

/**
 * パラメーターを取得する
 * @return {SheetExport}
 */
function getParameter(){
  throw new Error("SheetExport専用のメソッドです");
}

/**
 * エクスポートする
 * @return {Blob} 
 */
function exportForBlob() {
  throw new Error("SheetExport専用のメソッドです");
}

/**
 * エクスポートして保存するGoogle Driveに保存
 * @param {string} fileName - 保存するファイル名
 * @param {string} folderId - 保存先フォルダのID
 * @return {DriveApp.File} 保存されたファイルオブジェクト
 */
function exportAndSave(fileName, folderId) {
  throw new Error("SheetExport専用のメソッドです");
}