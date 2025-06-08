/**
 * 音声メッセージイベントを表すクラス
 */
class AudioMessageEvent extends MessageEvent {
  /**
   * @param {string} destination - イベントの送信先
   * @param {object} event - Webhookで受け取るイベントオブジェクト
   */
  constructor(destination, event) {
    super(destination, event);
    this.messageId =  event.message.id;
    this.messageType = 'audio';  // 'audio'になる
    this.duration = event.message.duration;
    this.contentProvider = event.message.contentProvider;

  }

  getMessageId() {
    return this.messageId;
  }

  getDuration() {
    return this.duration;
  }

  getContentProvider() {
    return this.contentProvider;
  }

  /**
   * LINEのAPIから音声データのBlobを取得する（Drive保存は行わない）
   * @param {string} channelAccessToken - LINEチャネルアクセストークン
   * @param {number} [retry=3] - リトライ回数（データが202の場合）
   * @returns {Blob|null} - 取得成功時はBlob、失敗時はnull
   */
  getAsBlob(channelAccessToken, retry = 3) {
    const messageId = this.getMessageId();
    const url = `https://api-data.line.me/v2/bot/message/${messageId}/content`;

    const options = {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${channelAccessToken}`
      },
      muteHttpExceptions: true
    };

    for (let i = 0; i < retry; i++) {
      const response = UrlFetchApp.fetch(url, options);
      const code = response.getResponseCode();

      if (code === 200) {
        return response.getBlob();
      } else if (code === 202) {
        Logger.log(`データ準備中（202）、再試行...（${i + 1}/${retry}）`);
        Utilities.sleep(1000); // 1秒待機
      } else {
        Logger.log(`エラー（${code}）: ${response.getContentText()}`);
        break;
      }
    }

    return null;
  }
}
