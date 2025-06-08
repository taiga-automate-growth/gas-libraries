/**
 * LINEからイベントを受信する
 * @param {Event} e - MessagingAPIから送信されたPOSTリクエストイベント
 * @return {LineEvent}
 */
function receive(e) {
  if(!e.hasOwnProperty('postData')){
    console.error("postDataが含まれていません");
  };
    const postData = JSON.parse(e.postData.getDataAsString());
    const destination = postData.destination;
    const events = postData.events;
    // イベントが一つもない時は検証時のリクエストとして処理する
    if(events.length === 0) return new LineEvent(destination,"verification","", new Date().getTime(),{},"","");

    const eventObjects = events.map(event => {
      const type = event.type;
      if(type === 'message'){
        const messageType = event.message.type;
        if(messageType === 'text'){
          return new TextMessageEvent(destination,event);
        }
        if(messageType === 'audio'){
          return new AudioMessageEvent(destination,event);
        }
      }

      if(type === 'postback'){
        return new PostbackEvent(destination,event);
      }

      if(type === 'follow'){
        return new FollowEvent(destination,event);
      }
    });

    if(eventObjects.length === 1) return eventObjects[0];
    return eventObjects;
}

/**
 * LINEのAPIから音声データのBlobを取得する（Drive保存は行わない）
 * @param {string} channelAccessToken - LINEチャネルアクセストークン
 * @param {number} [retry=3] - リトライ回数（データが202の場合）
 * @returns {Blob|null} - 取得成功時はBlob、失敗時はnull
 */
function getAsBlob(channelAccessToken, retry = 3) {
  throw new Error('Audioメッセージ専用のメソッドです');
}
