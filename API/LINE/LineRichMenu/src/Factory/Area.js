/**
 * エリアオブジェクトを生成する
 * @param {number} x - X座標
 * @param {number} y - Y座標
 * @param {number} width - 横幅
 * @param {number} height - 縦幅
 * @param {LineAction} action - アクションオブジェクト
 */
function createArea(x,y,width,height,action){
  return new Area(x,y,width,height,action);
}
