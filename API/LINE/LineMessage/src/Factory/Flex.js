/**
 * @param {string} altText - 代替テキスト
 * @param { Bubble | FlexCarousel } contents - コンテンツ
 * @return {LineMessage}
 */
function createFlex(altText,contents){
  return new Flex(altText,contents);
}