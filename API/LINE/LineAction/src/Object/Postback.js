/**
 * ポストバックアクションを表すクラス
 * このアクションが関連づけられたコントロールがタップされると、dataプロパティに指定された文字列を含むポストバックイベントが、Webhookを介して返されます
 * @class
 */
class Postback extends Action{

  /**
   * @constructor
   * @param {string} data - Webhookを介して返却される文字列
   */
  constructor(data){
    super("postback");
    this.data = data;
  }

  /**
   * ディスプレイテキストを設定する
   * 
   * @param {string} displayText - アクションの実行時に、ユーザーのメッセージとしてLINEのトーク画面に表示されるテキスト。 
   */
  setDisplayText(displayText){
    this.displayText = displayText;
  }

  /**
   * 入力オプションを設定する
   * 
   * @param {"closeRichMenu" | "openRichMenu" | "openKeyboard" | "openVoice"} inputOption - アクションに応じた、リッチメニューなどの表示方法
   */
  setInputOption(inputOption = null){
    this.inputOption = inputOption;
  }

  /**
   * キーボードのデフォルト文字列を設定する
   * 
   * @param {string} fillInText - キーボードを開いたときに、入力欄にあらかじめ入力しておく文字列
   */
  setFillInText(fillInText){
    if(this.inputOption !== "openKeyboard"){
      throw new Error('入力オプションがopenKeyboard以外は設定できません');
    }
    this.fillInText = fillInText;
  }

}
