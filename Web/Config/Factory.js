/**
 * Configインスタンスを作成する
 * @param {string} sheetId 
 * @param {string} sheetName 
 * @returns {Config} Configインスタンス
 */
function create(sheetId, sheetName){
    return new Config(sheetId, sheetName);
}