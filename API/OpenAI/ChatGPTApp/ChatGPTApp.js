/**
 * ChatGPTのAPIClientを表すクラス
 * 
 * @class
 */
class ChatGPTApp {
  /**
   * @constructor
   * @param {string} apiKey - OpenAIのAPIキー
   * @param {'gpt-4o' | 'gpt-4-turbo' | 'gpt-3.5-turbo'} model - 使用するモデル名
   */
  constructor(apiKey, model = 'gpt-4o') {
    this.apiKey = apiKey;
    this.model = model;
    this.baseUrl = 'https://api.openai.com/v1';
  }

  /**
   * コンテンツを生成する（テキスト＋画像）
   * @param {string} prompt - モデルへの指示
   * @param {Array<Blob>} medias - 画像（image/png, image/jpeg）のみ対応
   * @returns {string} 応答テキスト
   */
  generateContent(prompt, medias = []) {
    const messages = [{
      role: 'user',
      content: [{ type: 'text', text: prompt }]
    }];

    if (medias.length > 0) {
      medias.forEach(blob => {
        if (Object.prototype.toString.call(blob) !== '[object Blob]') {
          throw new Error('メディアはBlobである必要があります');
        }

        const mimeType = blob.getContentType();
        if (mimeType !== 'image/png' && mimeType !== 'image/jpeg') {
          throw new Error(`対応していないメディアタイプです: ${mimeType}`);
        }

        const base64 = Utilities.base64Encode(blob.getBytes());
        messages[0].content.push({
          type: 'image_url',
          image_url: {
            url: `data:${mimeType};base64,${base64}`
          }
        });
      });
    }

    const payload = {
      model: this.model,
      messages,
      temperature: 0.7
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      },
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(`${this.baseUrl}/chat/completions`, options);
    const code = response.getResponseCode();
    if (code === 200) {
      const json = JSON.parse(response.getContentText());
      return json.choices[0].message.content.trim();
    }

    throw new Error(`ChatGPT API Error: ${response.getContentText()}`);
  }

  /**
   * モデルを変更する
   * @param {'gpt-4o' | 'gpt-4-turbo' | 'gpt-3.5-turbo'} model
   * @returns {GPTApp}
   */
  changeModel(model) {
    const allowed = ['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'];
    if (!allowed.includes(model)) {
      throw new Error(`不正なモデル名: ${model}`);
    }
    this.model = model;
    return this;
  }
}
