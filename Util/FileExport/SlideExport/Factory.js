/**
 * 出力用のオブジェクトを生成する
 * @param {string} slideId - スライドID
 * @return {SlideExport}
 */
function create(slideId){
  return new SlideExport(slideId);
}

/**
 * パラメーターを取得する
 * @return {SlideExport}
 */
function getParameter(){
  throw new Error("SlideExport専用のメソッドです");
}

/**
 * エクスポートする
 * @return {Blob} 
 */
function exportForBlob() {
  throw new Error("SlideExport専用のメソッドです");
}

/**
 * エクスポートして保存するGoogle Driveに保存
 * @param {string} fileName - 保存するファイル名
 * @param {string} folderId - 保存先フォルダのID
 * @return {DriveApp.File} 保存されたファイルオブジェクト
 */
function exportAndSave(fileName, folderId) {
  throw new Error("SlideExport専用のメソッドです");
}