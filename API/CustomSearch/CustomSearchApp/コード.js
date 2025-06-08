/**
 * Google Custom Search API クライアント
 */
class CustomSearchApiClient {
  /**
   * コンストラクタ
   * @param {string} apiKey - Google Custom Search API の API キー
   * @param {string} searchEngineId - カスタム検索エンジンの ID (Search Engine ID)
   */
  constructor(apiKey, searchEngineId) {
    if (!apiKey) {
      throw new Error('APIキーが必要です');
    }
    if (!searchEngineId) {
      throw new Error('Search Engine ID が必要です');
    }

    this.apiKey = apiKey;
    this.searchEngineId = searchEngineId;
    this.endpoint = 'https://www.googleapis.com/customsearch/v1';
  }

  /**
   * Google カスタム検索 API を使用して検索を実行
   * @param {string} query - 検索クエリ
   * @param {number} [num=10] - 取得する検索結果の件数（デフォルトは10件）
   * @return {Object} - 検索結果のデータ
   */
  search(query, num = 10) {
    if (!query) {
      throw new Error('検索クエリが必要です');
    }

    if (typeof num !== 'number' || num <= 0 || num > 10) {
      throw new Error('numは1から10の範囲で指定してください');
    }

    // リクエストのベースURLと必須パラメータ
    const params = {
      key: this.apiKey,
      cx: this.searchEngineId, // Search Engine ID
      q: query,
      num: num, // 取得する検索結果の件数
      g1: "jp", // 日本を指定
      c2coff: 1, // 中国語の検索を無効にする
    };

    // クエリパラメータをURLに変換
    const url = this.endpoint + '?' + this._toQueryString(params);

    // HTTPリクエストを送信
    const response = UrlFetchApp.fetch(url, {
      method: 'GET',
      muteHttpExceptions: true,
    });

    // レスポンスのステータスコードを確認
    const responseCode = response.getResponseCode();
    if (responseCode !== 200) {
      throw new Error(
        `エラーが発生しました。HTTPステータスコード: ${responseCode}, メッセージ: ${response.getContentText()}`
      );
    }

    // レスポンスをJSON形式で返す
    return JSON.parse(response.getContentText());
  }

  /**
   * 検索結果からタイトルとリンクを抽出して返す
   * @param {string} query - 検索クエリ
   * @param {number} [num=10] - 取得する検索結果の件数（デフォルトは10件）
   * @return {Array} - タイトルとリンクの配列 [{ title: "タイトル", link: "URL" }]
   */
  searchTitleAndLink(query, num = 10) {
    // 検索結果を取得
    const results = this.search(query, num);

    // アイテムが存在しない場合は空配列を返す
    if (!results.items || results.items.length === 0) {
      return [];
    }

    // タイトルとリンクを抽出
    return results.items.map((item) => {
      return {
        title: item.title,
        link: item.link,
      };
    });
  }

  /**
   * オブジェクトをクエリ文字列に変換
   * @param {Object} params - クエリパラメータのオブジェクト
   * @return {string} - エンコードされたクエリ文字列
   */
  _toQueryString(params) {
    return Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }
}
