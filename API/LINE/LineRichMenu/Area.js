class Area{
  /**
   * @param {number} x - X座標
   * @param {number} y - Y座標
   * @param {number} width - 横幅
   * @param {number} height - 縦幅
   * @param {LineAction} action - アクションオブジェクト
   */
  constructor(x,y,width,height,action){
    this.bounds = {
      x: x,
      y: y,
      width: width,
      height: height
    }

    this.action = action;
  }
}