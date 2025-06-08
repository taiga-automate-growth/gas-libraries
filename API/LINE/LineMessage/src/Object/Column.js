/**
 * カラムメッセージを表すクラス
 */
class Column{

  /**
   * @constructor
   * @param {string} text - テキスト
   * @param {Array<LineAction>} actions - アクションオブジェクト配列
   */
  constructor(text, actions = []){
    this.text = text;
    this.actions = actions;
  }

  /**
   * アクションオブジェクトを追加する
   * @param {LineAction} action - アクションオブジェクト
   */
  addAction(action){
    this.actions.push(action);
  }

  /**
   * サムネイルを設定する
   *
   * @param {string} url - 画像URL
   * @param {string} backgroundColor - 画像背景色 RGB値
   */
  setThumbnail(url,backgroundColor){
    this.thumbnailImageUrl = url;
    this.backgroundColor = backgroundColor;
  }

  /**
   * タイトルを設定する
   * 
   * @param {string} title - タイトル
   */
  setTitle(title){
    if(this.text.length > 60){
      this.text = this.text.substring(0,60);
    }

    if(title.length > 40){
      const trimedTitle = title.substring(0,40);
      this.title = trimedTitle;
      return;
    }
    this.title = title;
  }

  /**
   * デフォルトアクションを設定する
   * 
   * @param {LineAction} action - アクションオブジェクト
   */
  setDefaultAction(action){
    this.defaultAction = action;
  }
}

