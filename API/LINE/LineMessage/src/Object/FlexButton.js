class FlexButton extends FlexComponent{
  /**
   * @param {LineAction} action - アクションオブジェクト
   */
  constructor(action){
    super("button","vertical");
    this.action = action;
  }
}