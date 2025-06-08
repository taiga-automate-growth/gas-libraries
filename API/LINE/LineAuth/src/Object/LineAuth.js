class LineAuth{
  constructor(){
    this.baseEndPoint = "https://api.line.me/oauth2";
  }
  
  /**
   * ユーザープロフィールを取得する
   * @param {string} token - 交換するユーザーのIDトークン
   * @param {string} liffChannelId - IDトークンを取得したLiffアプリが登録されているチャネルのID
   */
  getProfile(token,liffChannelId){
    const url = `${this.baseEndPoint}/v2.1/verify`;

    const payload = {
      'id_token': token,
      'client_id': liffChannelId
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      payload: Object.keys(payload)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]))
        .join('&'),
      muteHttpExceptions: true
    };

    try {
      const response = UrlFetchApp.fetch(url, options);
      const data = JSON.parse(response.getContentText());

      if (response.getResponseCode() === 200) {
        return data;
      } else {
        return response.getContentText();
      }
    } catch (error) {
      console.error("IDトークンの検証に失敗しました:", error);
      throw error;
    }
  }
}