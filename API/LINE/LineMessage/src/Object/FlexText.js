class FlexText extends FlexComponent{
  /**
   * @param {string} text - テキスト
   * @param {boolean} wrap - 折り返す場合はtrue,折り返さない場合はfalse。デフォルトはtrue
   * @param {Array<FlexComponent>} contents - コンテンツの配列
   */
  constructor(text, wrap = true, contents = []){
    super("text");
    this.text = text;
    this.contents = contents;
    this.wrap = wrap;
  }
}