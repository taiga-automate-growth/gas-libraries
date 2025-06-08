class DocParameter {
  /**
   * @param {string} docId - ドキュメントID
   */
  constructor(docId) {
    this.docId = docId;
    this.params = {
      exportFormat: 'html'
    };
  }

  /**
   * エクスポート形式を指定（html, pdf, txt）
   * @param {'html' | 'pdf' | 'txt' } format 
   */
  format(format) {
    this.params.exportFormat = format;
    return this;
  }

  /**
   * クエリ文字列を構築
   * @returns {string}
   */
  build() {
    return Object.keys(this.params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(this.params[key])}`)
      .join("&");
  }
}
