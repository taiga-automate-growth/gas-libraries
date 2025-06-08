/**
 * リッチメニューを生成する
 * @param {number} width - 横幅
 * @param {number} height - 縦幅
 * @param {boolean} selected - デフォルトでリッチメニューを表示する場合はtrueです。それ以外はfalseです。
 * @param {string} name - リッチメニューの名前。リッチメニューの管理に役立ちます。ユーザーには表示されません。
 * @param {string} chatBarText - トークルームメニューに表示されるテキストです。
 * @param {Array<Area>} areas - タップ領域の座標とサイズを定義する、領域オブジェクトの配列。
 */
function create(width, height, selected, name, chatBarText,areas){
  return new RichMenu(width, height, selected, name, chatBarText,areas);
}