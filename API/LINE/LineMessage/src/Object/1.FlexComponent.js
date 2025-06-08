class FlexComponent{
  /**
   * @param {string} type - コンポーネントのタイプ
   */
  constructor(type){
    this.type = type;
  }

  isBox(){
    return this.type === "box";
  }

  isImage(){
    return this.type === "image";
  }

  isVideo(){
    return this.type === "video"; 
  }
}