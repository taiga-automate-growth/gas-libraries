class DiscordApp{
  constructor(webhookUrl){
    if(webhookUrl === undefined || webhookUrl === null || webhookUrl === ""){
      throw new Error("WebhookURLは必須です");
    }
    this.webhookUrl = webhookUrl;
  }

  /**
   * @param {string} text - メッセージ本文
   * @param {boolean} readble - ボット読み上げの有効化デフォルトはfalse
   */
  post(text, readble = false){
    const message = {
      "content": text, 
      "tts": readble
    }

    const param = {
      "method": "POST",
      "headers": { 'Content-type': "application/json" },
      "payload": JSON.stringify(message)
    }

    UrlFetchApp.fetch(this.webhookUrl, param);
  }
}