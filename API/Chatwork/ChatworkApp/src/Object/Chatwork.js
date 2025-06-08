class Chatwork{
  /**
   * @param {string} token - APIトークン
   * @param {string} botId - ボットのアカウントID
   */
  constructor(token,botId){
    /** @type {string} */
    this.token = token;
    /** @type {string} */
    this.botId = botId;
    /** @type {string} */
    this.baseUrl = "https://api.chatwork.com/v2";
  }

  /**
   * メッセージを送信する
   * @param {string} message - メッセージ
   * @param {string} roomId - ルームID
   */
  push(message,roomId){
    const url = `${this.baseUrl}/rooms/${roomId}/messages`;
    const headers = {
      "x-chatworktoken": this.token,
    }
    const body = {
      'body': message
    }
    const option = {
      'headers': headers,
      'method': 'POST',
      'payload': body
    }
    try{
      const response = UrlFetchApp.fetch(url,option);
      const code = response.getResponseCode();
      if(code !== 200) throw new Error('メッセージの送信に失敗しました');
      return JSON.parse(response.getContentText());
    }catch(e){
      throw e;
    }
  }

  /**
   * イベントを受信する
   * @param {Object} postData - EventオブジェクトのpostData
   */
  receiveEvent(postData){
    const settingId = postData["webhook_setting_id"];
    const eventType = postData["webhook_event_type"];
    const eventTime = postData["webhook_event_time"];
    const event = postData["webhook_event"];
    if(eventType === "message_created" || eventType === "message_updated"){
      const messageEvent = ChatworkEvent.createMessage(settingId,eventType,eventTime,event);
      if(messageEvent.accountId === this.botId) return null;
      return messageEvent;
    }
    return new ChatworkEvent.createMention(settingId,eventType,eventTime,event);
  }
}