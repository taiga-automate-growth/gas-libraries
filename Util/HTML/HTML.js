/**
 * HTML文字列を操作・解析するためのユーティリティクラス
 */
class HTML {
  /**
   * HTMLインスタンスを作成する
   * 
   * @param {string} content - 対象となるHTML文字列
   */
  constructor(content) {
    this.content = content;
  }

  /**
   * 指定した開始文字列と終了文字列の間にあるすべての文字列を抽出する
   * 
   * @param {string} startString - 抽出開始位置を示す文字列
   * @param {string} endString - 抽出終了位置を示す文字列
   * @returns {Array<string>} 抽出された文字列の配列
   */
  sliceBetween(startString, endString) {
    const results = [];
    let startIndex = 0;

    while (true) {
      startIndex = this.content.indexOf(startString, startIndex);
      if (startIndex === -1) break;

      const endIndex = this.content.indexOf(endString, startIndex + startString.length);
      if (endIndex === -1) break;

      const extractedString = this.content.substring(startIndex + startString.length, endIndex);
      results.push(this.trim_(extractedString));

      startIndex = endIndex + endString.length;
    }

    return results;
  }

  /**
   * 正規表現を使ってHTMLから文字列を抽出する
   * 
   * @param {RegExp} regex - 抽出に使う正規表現（キャプチャグループが必要）
   * @returns {Array<string>} 抽出された文字列の配列
   */
  getByRegex(regex) {
    const results = [];
    let match;

    while ((match = regex.exec(this.content)) !== null) {
      results.push(this.trim_(match[1]));
    }

    return results;
  }

  /**
   * HTML文字列から不要なタグや改行などを取り除いて整形する
   * 
   * @param {string} text - 整形対象の文字列
   * @returns {string} 整形済みの文字列
   * @private
   */
  trim_(text) {
    return text
      .replace(/\n/g, '')
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/<\/?[^>]+(>|$)/g, '');
  }

  /**
   * 指定した文字列以降の内容をすべて削除したHTML文字列を返す
   * 
   * @param {string} removeText - 削除開始位置となる文字列
   * @returns {string} 削除後のHTML文字列
   */
  removeBackward(removeText) {
    const removeTextIndex = this.content.indexOf(removeText);
    if (removeTextIndex === -1) return this.content;
    return this.content.substring(0, removeTextIndex);
  }

  /**
   * 指定した文字列で囲まれた文字列をすべて抽出する
   * （例: getByText("●") → "●〜●" の間にある文字列をすべて取得）
   * 
   * @param {string} string - 開始と終了に使われる囲み文字列
   * @returns {Array<string>} 抽出された文字列の配列
   */
  getByText(string) {
    const results = [];
    let startIndex = 0;

    while (true) {
      const foundIndex = this.content.indexOf(string, startIndex);
      if (foundIndex === -1) break;

      const endIndex = this.content.indexOf(string, foundIndex + string.length);
      if (endIndex === -1) break;

      const extractedString = this.content.substring(foundIndex + string.length, endIndex);
      results.push(this.trim_(extractedString));

      startIndex = endIndex + string.length;
    }

    return results;
  }
}
