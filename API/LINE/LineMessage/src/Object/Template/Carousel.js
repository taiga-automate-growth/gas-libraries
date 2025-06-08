class Carousel{
  
  /**
   * @constructor
   * 
   * @param {Array<Column>} columns - カラムオブジェクトの配列
   */
  constructor(columns = []){
    this.type = "carousel";
    if(columns.every(column => column instanceof Column)){
      this.columns = columns;
    }else{
      this.columns = [];
    }
  }

  /**
   * 画像のアスペクト比を設定する
   * 
   * @param {"rectangle" | "square"} imageAspectRatio - 画像のアスペクト比。デフォルトはrectangle
   */ 
  setImageAspectRatio(imageAspectRatio = "rectangle"){
    this.imageAspectRatio = imageAspectRatio;
  }

  /**
   * 画像サイズを設定する
   * 
   * @param {"cover" | "contain"} imageSize - 画像サイズ
   */ 
  setImageSize(imageSize = "cover"){
    this.imageSize = imageSize;
  }

  /**
   * カラムを追加できるか判定する
   * 
   * @return {boolean} 追加できる場合はtrue,それ以外はfalse
   */
  canAddColumn(){
    const columnLimit = 10;
    if(this.columns.length < columnLimit) return true;
    return false;
  }

  /**
   * カラムを追加する
   * 
   * @param {Column} column - カラムオブジェクト
   */
  addColumn(column){
    if(this.canAddColumn()){
      this.columns.push(column);
      return;
    }
    throw new Error('カルーセルメッセージン登録できるカラムメッセージは最大10件までです');
  }

  /**
   * カラムオブジェクトを一括で追加する
   * 
   * @param {Array<Column>} columns - カラムオブジェクトの配列
   */
  addColumns(columns){
    if(columns.length >= 10){
      throw new Error('最大10件までです');
    }
    this.columns = columns;
  }

  /**
   * カラム数をカウントする
   * 
   * @return {number} 登録されているカラムメッセージの数
   */
  countColumns(){
    return this.columns.length;
  }
}
