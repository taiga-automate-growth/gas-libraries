class FlexBox extends FlexComponent{
  /**
   * @param {"horizontal" | "vertical" | "baseline"} layout - コンテンツの配置方向
   * @param {Array<FlexComponent>} contents - コンテンツ
   */
  constructor(layout, contents = []){
    super("box");
    this.layout = layout;
    this.contents = contents;
  }
}