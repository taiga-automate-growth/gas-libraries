class SlackApp{
  constructor(botToken,userToken = ""){
    this.botToken = botToken;
    this.userToken = userToken;
    this.baseUrl = "https://slack.com/api";
  }

  /**
   * メッセージを送信する
   * @param {string} message - フォールバック用メッセージ（通知など）
   * @param {string} channelId - チャンネルID
   * @param {Array<object>} blocks - Block Kitのblocks配列
   * @param {Array<object>} attachments - 任意の旧attachments配列（使わないことが多い）
   * @return {object}
   */
  postMessage(message, channelId, blocks = [], attachments = []) {
    const url = `${this.baseUrl}/chat.postMessage`;
    const headers = {
      authorization: `Bearer ${this.botToken}`,
      "content-type": "application/json"
    };

    const payload = {
      channel: channelId,
      text: message
    };

    if (blocks.length > 0) {
      payload.blocks = blocks;
    }

    if (attachments.length > 0) {
      payload.attachments = attachments;
    }

    const options = {
      method: "post",
      headers: headers,
      payload: JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(url, options);
    const contents = JSON.parse(response.getContentText());

    if (contents.ok) {
      return contents;
    }

    throw new Error(contents.error);
  }


  /**
   * ワークスペース内の全てのユーザーを取得する
   * @return {Array<SlackUser>} 
   */
  getUsers(){
    if(this.userToken === "") throw new Error("ユーザートークンが設定されていません");
    const url = `${this.baseUrl}/users.list`;
    const headers = {
      authorization: `Bearer ${this.userToken}`,
      "content-type": "application/json"
    };

    const options = {
      method: "get",
      headers: headers
    };

    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());

    if (data.ok) {
      return data.members.map(member => {
        return SlackUser.create(member);
      });
    }

    throw new Error(data.error);

  }

  /**
   * BOTとのダイレクトメッセージを開く
   * @param {string} userId - DMを送るユーザーのID 
   */
  openDM(userId){
    const url = `${this.baseUrl}/conversations.open`;
    const headers = {
      authorization: `Bearer ${this.botToken}`,
      "content-type": "application/json"
    };

    const payload = {
      users: userId // 対象ユーザーのID
    };

    const options = {
      method: "post",
      headers: headers,
      payload: JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());

    if (data.ok) {
      const dmChannelId = data.channel.id; // ここで取得される
      return dmChannelId;
    }

    throw new Error(data.error);

  }

  /**
   * ファイル付きメッセージを送信する
   * @param {string} channel - メッセージを送信するチャンネルのID
   * @param {string} message - メッセージの内容
   * @param {Blob} file - ファイル
   * @param {string} fileName - ファイル名
   * @return {Object}
   */
  postMessageWithFile(channel, message, file, fileName){
    const [uploadUrl,fileId] = this.getFileUploadUrl(fileName,file.getBytes().length);

    this.uploadFileData(file,uploadUrl);

    return this.completeFileUpload(fileId,channel,message);
    
  }

  /**
   * ファイルをアップロードするURLを取得する
   * @param {string} filename - ファイル名
   * @param {number} length - ファイルサイズ
   * @return {Array<string>} ファイルアップロードURL,ファイルID
   */
  getFileUploadUrl(filename,length){
    const url = `${this.baseUrl}/files.getUploadURLExternal`;
    const headers = {
      Authorization: `Bearer ${this.botToken}`
    }
    const payload = {
      filename: filename,
      length: length.toString()
    }
    const option = {
      method: "GET",
      headers: headers,
      payload: payload
    }
    const response = UrlFetchApp.fetch(url,option);
    const content = JSON.parse(response.getContentText());
    if(content.ok){
      return [content.upload_url,content.file_id];
    }else{
      Logger.log(`エラーが発生しました: ${content.error}`);
      return null;
    }
  }

  /**
   * ファイルデータをアップロードする
   */
  uploadFileData(file,uploadUrl){
    const option = {
      method: "POST",
      payload:file
    }
    const response = UrlFetchApp.fetch(uploadUrl,option);
    return response.getContentText();
  }

  /**
   * ファイルのアップロードを完了する
   * @param {string} fileId - ファイルID
   */
  completeFileUpload(fileId,channelId = "",message = ""){
    const url = `${this.baseUrl}/files.completeUploadExternal`
    const option = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.botToken}`,
        "Content-Type": "application/json" // JSON形式の指定
      },
      payload: JSON.stringify({
        files: [{ id: fileId }],
        channel_id: channelId,
        initial_comment: message
      })
    }
    const response = UrlFetchApp.fetch(url,option);
    const content = JSON.parse(response.getContentText());
    if(!content.ok){
      throw new Error(content.error);
    }
    return content;
  }

  getMessage(channelId,messageTs){
    const url = `${this.baseUrl}/conversations.history?channel=${channelId}&latest=${messageTs}&inclusive=true&limit=1`;
    const headers = {
      authorization: `Bearer ${this.botToken}`,
      "content-type": "application/json"
    };

    const options = {
      method: "get",
      headers: headers,
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(response.getContentText());

    if (json.ok && json.messages && json.messages.length > 0) {
      return json.messages[0].text;
    } else {
      throw new Error("メッセージ取得に失敗しました: " + response.getContentText());
    }
  }
}