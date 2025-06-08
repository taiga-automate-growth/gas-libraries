/**
 * @param {"horizontal" | "vertical" | "baseline"} layout - コンテンツの配置方向
 * @param {Array<FlexComponent>} contents - コンテンツ
 * @return {LineMessage}
 */
function createFlexBox(layout,contents = []){
  return new FlexBox(layout,contents);
}
