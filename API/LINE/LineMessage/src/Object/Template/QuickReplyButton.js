class QuickReplyButton{
  /**
   * クイックリプライボタンを作成する
   * @param {LineAction} action - アクションオブジェクト
   */
  constructor(action){
    this.type = "action";
    this.action = action;
  }

  // ボタンの先頭に表示するアイコンのURL
  setImageUrl(imageUrl){
    this.imageUrl = imageUrl
  }

}