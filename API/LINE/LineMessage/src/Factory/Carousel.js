/**
 * カルーセルテンプレートを生成する
 * 
 * @param {string} altText - 通知やトークリストで表示される代替メッセージ。
 * @param {Array<Column>} columns - カラムオブジェクトの配列
 * @return {LineMessage}
 */
function createCarousel(columns = []){
  const carousel = new Carousel(columns);
  return carousel;
}
