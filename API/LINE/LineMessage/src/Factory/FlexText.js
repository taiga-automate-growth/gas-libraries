/**
 * @param {string} text - テキスト
 * @param {boolean} wrap - 折り返す場合はtrue,折り返さない場合はfalse。デフォルトはtrue
 * @param {Array<FlexComponent>} contents - コンテンツの配列
 * @return {LineMessage}
 */
function createFlexText(text,wrap = true, contents = []){
  return new FlexText(text,wrap,contents);
}