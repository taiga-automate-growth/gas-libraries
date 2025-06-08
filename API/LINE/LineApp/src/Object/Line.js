/**
 * ラインボットを表すクラス
 * @class
 */
class Line{

  /**
   * ラインボットインスタンスの初期化
   * BOTのチャンネルアクセストークンをスクリプトプロパティから取得して設定する
   * 
   * @param {String} accessToken ラインボットのアクセストークン
   */
  constructor(accessToken) {
    this.baseEndPoint = "https://api.line.me/v2/bot/";
    
    this.accessToken = accessToken

    this.requestHeader = {
      'Content-Type' : 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    };

    this.receiveMessage = null;
  }

  getBotInfo() {
    const end = this.baseEndPoint + 'info';

    const headers = {
      'Authorization' : 'Bearer ' + this.accessToken
    }

    const parameter = {
      'method' : 'GET',
      'headers' : headers,
      'muteHttpExceptions' : true
    }

    try{
      const response = UrlFetchApp.fetch(end , parameter);
      return JSON.parse(response);
    }catch (error){
      return error.message;
    }
  }

  getFollowerIds(limit = 300 , start){
    const end = this.baseEndPoint + 'followers/ids';
    
    const headers = {
      'Authorization' : 'Bearer ' + this.accessToken
    }

    const parameter = {
      'method' : 'GET',
      'headers' : headers,
      'muteHttpExceptions' : true
    }

    const response = UrlFetchApp.fetch(end , parameter);

    const statusCode = response.getResponseCode();

    if(statusCode === 400) return '無効な継続トークンが指定されています';
    
    if(statusCode === 403) return 'このエンドポイントを使う権限がありません。認証済アカウントまたはプレミアムアカウントのみでご利用いただけます';
    
    if(statusCode === 200) return JSON.parse(response);
  
  }

  /**
   * ブロードキャストメッセージを送信する
   * @param {Array<Object>} messages - 送信するメッセージの配列
   * @param {boolean} [notificationDisabled=false] - 通知を無効にするかどうか
   * @returns {Object} - APIレスポンス
   */
  broadcast(messages, notificationDisabled = false) {
    const end = this.baseEndPoint + 'message/broadcast';

    const payload = {
      messages: messages,
      notificationDisabled: notificationDisabled
    };

    const options = {
      method: 'POST',
      headers: this.requestHeader,
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(end, options);
    const statusCode = response.getResponseCode();

    if (statusCode === 200) {
      return JSON.parse(response);
    }

    let errorMessage = 'ブロードキャストメッセージの送信に失敗しました。';
    switch (statusCode) {
      case 400:
        errorMessage += 'リクエストが不正です。メッセージオブジェクトの形式を確認してください。';
        break;
      case 429:
        errorMessage += 'リクエスト数が上限を超えました。しばらくしてから再試行してください。';
        break;
      case 500:
        errorMessage += 'LINEサーバーで内部エラーが発生しました。';
        break;
      default:
        errorMessage += `不明なエラー (ステータスコード: ${statusCode})`;
    }

    throw new Error(errorMessage);
  }

  sendPush(to , messages , notificationDisabled = false) {
    const end = this.baseEndPoint + 'message/push';
    
    const payload = {
      to : to,
      messages : messages,
      notificationDisabled : notificationDisabled
    };

    const option = {
      method : 'POST',
      headers : this.requestHeader,
      payload : JSON.stringify(payload),
      muteHttpExceptions : true
    };

    const response = UrlFetchApp.fetch(end, option);

    const statusCode = response.getResponseCode();

    if(statusCode === 200) return JSON.parse(response);

    if(statusCode === 400){

      let errorMessage = 'メッセージを送信できませんでした。次のような理由が考えられます\n';
      errorMessage += '・他のプロバイダー配下のチャネルで取得したユーザーIDなど、チャネルに存在しないユーザーのIDが指定されている。\n';
      errorMessage += '・存在しないグループやLINE公式アカウントが参加していないグループが指定されている。\n';
      errorMessage += '・存在しない複数人トークやLINE公式アカウントが参加していない複数人トークが指定されている。';
      errorMessage += '・無効なメッセージオブジェクトが指定されている。';
      
      const errorObject = {
        statusCode : 400,
        message : errorMessage
      }

      return errorObject;
    }

    if(statusCode === 409){
      
      let errorMessage = '同じリトライキーを含むリクエストがすでに受理されています。\n';
      errorMessage += '詳しくは、「APIリクエストを再試行する」の「すでにリクエストが受理されていた場合のレスポンス」を参照してください。';

      const errorObject = {
        statusCode : 409,
        message : errorMessage
      }
      return errorObject;
    }

    if(statusCode === 429){
      let errorMessage = 'リクエスト数が上限を超過しました。次のような理由が考えられます。\n';
      errorMessage += '・このエンドポイントのレート制限を超過した。';
      errorMessage += '・同一のユーザーに大量のメッセージを送信した。';
      errorMessage += '・当月に送信できるメッセージ数の上限目安を超過した。';

      const errorObject = {
        statusCode : 429,
        message : errorMessage
      }

      return errorObject
    }

  };

  sendMultiCast(toIds , messages , notificationDisabled = false) {
    const ids = toIds.filter(id => id !== "" && id !== undefined && id !== null );
    const end = this.baseEndPoint + 'message/multicast';
    
    const payload = {
      to : ids,
      messages : messages,
      notificationDisabled : notificationDisabled
    };

    const option = {
      method : 'POST',
      headers : this.requestHeader,
      payload : JSON.stringify(payload),
      muteHttpExceptions : true
    };

    const response = UrlFetchApp.fetch(end, option);

    const statusCode = response.getResponseCode();

    if(statusCode === 200) return JSON.parse(response);

    if(statusCode === 400){

      let errorMessage = 'メッセージを送信できませんでした。次のような理由が考えられます\n';
      errorMessage += '・他のプロバイダー配下のチャネルで取得したユーザーIDなど、チャネルに存在しないユーザーのIDが指定されている。\n';
      errorMessage += '・存在しないグループやLINE公式アカウントが参加していないグループが指定されている。\n';
      errorMessage += '・存在しない複数人トークやLINE公式アカウントが参加していない複数人トークが指定されている。';
      errorMessage += '・無効なメッセージオブジェクトが指定されている。';
      
      const errorObject = {
        statusCode : 400,
        message : errorMessage
      }

      return errorObject;
    }

    if(statusCode === 409){
      
      let errorMessage = '同じリトライキーを含むリクエストがすでに受理されています。\n';
      errorMessage += '詳しくは、「APIリクエストを再試行する」の「すでにリクエストが受理されていた場合のレスポンス」を参照してください。';

      const errorObject = {
        statusCode : 409,
        message : errorMessage
      }
      return errorObject;
    }

    if(statusCode === 429){
      let errorMessage = 'リクエスト数が上限を超過しました。次のような理由が考えられます。\n';
      errorMessage += '・このエンドポイントのレート制限を超過した。';
      errorMessage += '・同一のユーザーに大量のメッセージを送信した。';
      errorMessage += '・当月に送信できるメッセージ数の上限目安を超過した。';

      const errorObject = {
        statusCode : 429,
        message : errorMessage
      }

      return errorObject
    }

  };

  reply(replyToken , messages) {
    const end = this.baseEndPoint + 'message/reply';
    
    const payload = {
      replyToken : replyToken,
      messages : messages
    };

    const option = {
      method : 'POST',
      headers : this.requestHeader,
      payload : JSON.stringify(payload),
      muteHttpExceptions : true
    };
  
    const response = UrlFetchApp.fetch(end, option);
    
    const statusCode = response.getResponseCode();
    
    if(statusCode === 200) return JSON.parse(response);

    if(statusCode === 400){
      let errorMessage = 'メッセージを送信できませんでした。次のような理由が考えられます。';
      errorMessage += '・無効な応答トークンが指定されている。';
      errorMessage += '・無効なメッセージオブジェクトが指定されている。';
      const errorObject = {
        statusCode : 400,
        message : errorMessage
      }

      return errorObject;
    }
  };

  loading(chatId, loadingSeconds = 20){
    const endPoint = `${this.baseEndPoint}chat/loading/start`;
    const payload = {
      chatId: chatId,
      loadingSeconds: loadingSeconds
    }
    const option = {
      method : 'POST',
      headers : this.requestHeader,
      payload : JSON.stringify(payload),
      muteHttpExceptions : true
    };

    const response = UrlFetchApp.fetch(endPoint,option);

    const code = response.getResponseCode();

    if(code === 202) return JSON.parse(response);
    if(code === 400) throw new Error(`
    ローディングのアニメーションを表示できませんでした。
    次のような理由が考えられます。
    ・無効な秒数が指定されています。
    無効なユーザーIDが指定されています。
    グループトークまたは複数人トークが指定されています.
    `);

  }

  /**
   * デフォルトリッチメニューを設定する
   * @param {string} richMenuId - リッチメニューのID
   */
  setupDefaultRichMenu(richMenuId){
    const url = `${this.baseEndPoint}user/all/richmenu/${richMenuId}`;
    const option = {
      method: "POST",
      headers: this.requestHeader,
      muteHttpExceptions: true
    }

    const response = UrlFetchApp.fetch(url,option);
    const code = response.getResponseCode();
    if(code === 200) return true;
    if(code === 400) {
      console.error("リッチメニューに画像が設定されていません。");
      return false;
    }

    if(code === 404) {
      console.error("存在しないリッチメニューが指定されています。");
      return false;
    }
  }

  /**
   * リッチメニューを作成する
   * @param {LineRichMenu} richMenu - リッチメニューオブジェクト
   */
  createRichMenu(richmenu){
    const url = `${this.baseEndPoint}richmenu`;
    const option = {
      method : 'POST',
      headers : this.requestHeader,
      payload : JSON.stringify(richmenu),
      muteHttpExceptions : true
    }

    const response = UrlFetchApp.fetch(url, option);
    const code = response.getResponseCode();

    if(code === 200){
      const content = JSON.parse(response.getContentText());
      return content.richMenuId;
    }

    console.log(response.getContentText());
    throw new Error("リッチメニューの作成に失敗しました");
  }

   /**
   * リッチメニューに画像をアップロードする
   * 
   * @param {String} richMenuId - リッチメニューのID
   * @param {Blob} imageBlob - 画像のBlobオブジェクト（JPEGまたはPNG）
   * @returns {Object} - アップロード結果のレスポンス
   */
  uploadRichMenuImage(richMenuId, imageBlob) {
    const url = `https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`;
    
    const contentType = imageBlob.getContentType();
    const headers = {
      'Authorization': 'Bearer ' + this.accessToken,
      'Content-Type': contentType
    };

    const options = {
      method: 'POST',
      headers: headers,
      payload: imageBlob,
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);
    const statusCode = response.getResponseCode();
    if (statusCode === 200) {
      return { message: '画像のアップロードが成功しました',};
    } else {
      throw new Error(response.getContentText());
    }
  }

  /**
   * リッチメニューをユーザーにリンクする
   * @param {string} userId - ユーザーID
   * @param {string} richMenuId - リッチメニューのID
   */
  linkRichMenu(userId,richMenuId){
    const url = `${this.baseEndPoint}user/${userId}/richmenu/${richMenuId}`;
    const option = {
      headers: {
        "Authorization" : `Bearer ${this.accessToken}`
      },
      method: "POST"
    }

    const response = UrlFetchApp.fetch(url,option);
    const code = response.getResponseCode();

    if(code === 200){
      return true;
    }

    throw new Error("リンクに失敗しました");
  }

  /**
   * リッチメニューを配列で取得する
   */
  getRichMenus(){
    const url = `${this.baseEndPoint}richmenu/list`;
    const option = {
      headers: {
        "Authorization" : `Bearer ${this.accessToken}`
      },
      method: "GET",
      muteHttpExceptions: true
    }

    const res = UrlFetchApp.fetch(url,option);
    return JSON.parse(res.getContentText());
  }

  /**
   * リッチメニューのリンクを解除する
   * @param {string} userId - 解除対象となるユーザーのID
   */
  unlinkRichMenu(userId){
    const url = `${this.baseEndPoint}user/${userId}/richmenu`;
    const option = {
      headers: {
        "Authorization" : `Bearer ${this.accessToken}`
      },
      method: "DELETE"
    }

    const response = UrlFetchApp.fetch(url,option);

    const code = response.getResponseCode();

    if(code === 200){
      return {message: "解除しました"};
    }

    throw new Error("解除に失敗しました");
  }

  /**
   * リッチメニューを削除する
   * @param {string} richMenuId - 削除対象のリッチメニューID
   */
  deleteRichMenu(richMenuId){
    const url = `${this.baseEndPoint}richmenu/${richMenuId}`;
    const option = {
      headers: {
        "Authorization" : `Bearer ${this.accessToken}`
      },
      method: "DELETE",
      muteHttpExceptions: true
    }

    const response = UrlFetchApp.fetch(url,option);
    const code = response.getResponseCode();

    if(code === 200){
      return {message: "削除しました"};
    }

    throw new Error("削除に失敗しました");
  }

  /**
   * プッシュメッセージを検証する
   * @param {LineMessage} messages - メッセージ
   */
  validatePushMessage(messages){
    const url = `${this.baseEndPoint}message/validate/push`;
    const option = {
      headers:{
        "Authorization" : `Bearer ${this.accessToken}`,
        "Content-Type": "application/json"
      },
      payload: JSON.stringify(messages),
      method: "POST",
      muteHttpExceptions: true
    }
    const response = UrlFetchApp.fetch(url,option);
    const code = response.getResponseCode();
    const content = response.getContentText();

    if(code === 200){
      return content;
    }
    return content;
    
    throw new Error("検証に失敗しました");
  }

  /**
   * 複数のユーザーにリッチメニューを登録する
   * @param {string} richMenuId - リッチメニューのID
   * @param {Array<string>} userIds - ユーザーID
   */
  linkRichMenuBulk(richMenuId,userIds){
    const url = `${this.baseEndPoint}richmenu/bulk/link`;
    const payload = {
      richMenuId: richMenuId,
      userIds: userIds
    }

    const option = {
      headers:{
        "Authorization": `Bearer ${this.accessToken}`,
        "Content-Type": "application/json"
      },
      payload: JSON.stringify(payload),
      method: "POST",
      muteHttpExceptions: true
    }

    const response = UrlFetchApp.fetch(url,option);
    const code = response.getResponseCode();
    const content = response.getContentText();

    if(code === 200){
      return content;
    }
    return content;

  }

  /**
   * ユーザーのリッチメニューを取得する
   * @param {string} userId - ユーザーID
   */
  getRichMenu(userId){
    const url = `${this.baseEndPoint}user/${userId}/richmenu`;
    const option = {
      method: "GET",
      headers:{
        "Authorization": `Bearer ${this.accessToken}`,
        muteHttpExceptions: true
      }
    }

    const response = UrlFetchApp.fetch(url,option);
    const code = response.getResponseCode();
    const content = response.getContentText();

    if(code === 200){
      return content;
    }
    return content;
  }

}