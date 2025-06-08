class RichMenu{
  /**
   * @param {number} width - 横幅
   * @param {number} height - 縦幅
   * @param {boolean} selected - デフォルトでリッチメニューを表示する場合はtrueです。それ以外はfalseです。
   * @param {string} name - リッチメニューの名前。リッチメニューの管理に役立ちます。ユーザーには表示されません。
   * @param {string} chatBarText - トークルームメニューに表示されるテキストです。
   * @param {Array<Area>} areas - タップ領域の座標とサイズを定義する、領域オブジェクトの配列。
   */
  constructor(width, height, selected, name, chatBarText,areas){
    this.size = {
      width: width,
      height: height
    }

    this.selected = selected;
    if(name.length > 300){
      this.name = name.substring(0,300);
    }else{
      this.name = name;
    }

    if(chatBarText.length > 14){
      this.chatBarText = chatBarText.substring(0,14);
    }else{
      this.chatBarText = chatBarText;
    }

    if(areas.length <= 20){
      this.areas = areas;
    }
  }
}