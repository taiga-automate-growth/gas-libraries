class Confirm{

  /**
   * @constructor
   * @param {string} text - テキスト
   * @param {Array<Action>} actions - アクションオブジェクトの配列 
   */
  constructor(text, actions = []){
    this.type = 'confirm';
    if(text.length > 240){
      this.text = text.substring(0,240);
    }else{
      this.text = text;
    }
    this.actions = actions;
  
  }

}