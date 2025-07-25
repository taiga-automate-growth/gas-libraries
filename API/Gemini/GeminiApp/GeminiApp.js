/**
 * GeminiのAPIClientを表すクラス
 * 
 * @class
 */
class GeminiApp {
  /**
   * @constructor
   * @param {string} apikey - APIキー
   * @param { '2.5pro' | '2.0flash' | '2.0flash-lite' | '1.5flash' | '1.5pro' } model - 利用するAIモデル
   */
  constructor(apikey,model){

    /**
     * @private
     * @type {string}
     */
    this.apikey = apikey;

    /**
     * @private
     * @type {string}
     */
    this.model;

    if(model === '2.5pro'){
      this.model = 'gemini-2.5-pro-preview';
    
    }else if(model === '2.0flash'){
      this.model = 'gemini-2.0-flash';

    }else if(model === '2.0flash-lite'){
      this.model = 'gemini-2.0-flash-lite';
      
    }else if(model === '1.5flash'){
      this.model = 'gemini-1.5-flash';
      
    }else if(model === '1.5pro'){
      this.model = 'gemini-1.5-pro';

    }else {
      throw new Error(`不正なモデルが指定されています:${model}`);
    }
    
    /**
     * @private
     * @type {string}
     */
    this.baseUrl = `https://generativelanguage.googleapis.com/`;
  }

  /**
   * コンテンツを生成する
   * @param {string} prompt - モデルへの指示
   * @param {Array<Blob>} medias - モデルに追加で渡す画像、音声、動画のBlob
   */
  generateContent(prompt, medias = []){
    const payload = {
      "contents": [{
        "parts": [{
          "text": prompt
        }]
      }]
    }
    const payloadParts = payload.contents[0].parts;
    medias.forEach(media => {
      if(Object.prototype.toString.call(media) === '[object Blob]') throw new Error('コンテンツがBlob以外の型のため失敗しました');
      if(this.model === '1.0-pro') throw new Error('このモデルはテキストしか入力できません');

      const mimeType = media.getContentType();
      switch(mimeType){
        case 'image/jpeg':
        case 'image/png':
          
          const base64encodedBlob = Utilities.base64Encode(media.getBytes());
          const inlineData = {
            "inline_data": {
              "mime_type": mimeType,
              "data": base64encodedBlob
            }
          }
          payloadParts.unshift(inlineData);
          break;
        
        case 'audio/mpeg':
          const audioFileUri = this.uploadAudio(media);
          const audioFileData = {
            "file_data":{
              "mime_type": "audio/mp3", 
              "file_uri": audioFileUri
            }
          }
          payloadParts.unshift(audioFileData);
          break;

        case 'video/mp4':
          const movieFileUri = this.uploadMovie(media);
          const movieFileData = {
            "file_data":{
              "mime_type": "video/mp4", 
              "file_uri": movieFileUri
            }
          }
          payloadParts.unshift(movieFileData);
          break;

        default:
          throw new Error(`不正なインラインデータ:${mimeType}はGeminiで処理できません`);
      }
    
    });


    const params = {
      'method': 'POST',
      'contentType': 'application/json',
      'payload': JSON.stringify(payload),
      'muteHttpExceptions': true
    }
    
    const endPoint = `${this.baseUrl}/v1beta/models/${this.model}:generateContent?key=${this.apikey}`
    const response = UrlFetchApp.fetch(endPoint, params);
    const responseCode = response.getResponseCode();
    if(responseCode === 200){
      const parsedResponse = JSON.parse(response.getContentText());
      console.log(parsedResponse.candidates[0].content);
      return parsedResponse.candidates[0].content.parts[0].text;
    }

    throw response;
  }

  /**
   * 音声ファイルをアップロードする
   * @private
   * @param {Blob} blob - モデルに追加で渡す音声のBlob
   * @returns {string} ファイルURI
   */
  uploadAudio(blob) {
    const mimeType = blob.getContentType();
    const bytes = blob.getBytes();
    const fileSize = bytes.length;
    const fileName = blob.getName();
  
    // 1. メタデータを送信してアップロードURLを取得
    const metadataUrl = `${this.baseUrl}/upload/v1beta/files?key=${this.apikey}`;
    const metadataOptions = {
      method: 'post',
      headers: {
        'X-Goog-Upload-Protocol': 'resumable',
        'X-Goog-Upload-Command': 'start',
        'X-Goog-Upload-Header-Content-Length': fileSize,
        'X-Goog-Upload-Header-Content-Type': mimeType,
        'Content-Type': 'application/json',
      },
      payload: JSON.stringify({
        file: {
          display_name: fileName
        }
      }),
      muteHttpExceptions: true
    };
  
    // メタデータ送信リクエスト
    const metadataResponse = UrlFetchApp.fetch(metadataUrl, metadataOptions);
    const headers = metadataResponse.getAllHeaders();

    // X-Goog-Upload-URLの取得
    const uploadUrl = headers['x-goog-upload-url'];
  
    if (!uploadUrl) {
      throw new Error('ファイルのアップロードに失敗しました');
    }
  
    // 2. バイナリデータをアップロード
    const uploadOptions = {
      method: 'post',
      headers: {
        'X-Goog-Upload-Offset': '0',
        'X-Goog-Upload-Command': 'upload, finalize'
      },
      payload: bytes,
      muteHttpExceptions: true
    };
  
    const uploadResponse = UrlFetchApp.fetch(uploadUrl, uploadOptions);
    const uploadContent = JSON.parse(uploadResponse.getContentText());
    const fileUri = uploadContent.file.uri;
    return fileUri;
  }
  
  /**
   * 動画ファイルをアップロードする
   * @private
   * @param {Blob} blob - モデルに追加で渡す動画のBlob
   * @returns {string} ファイルURI
   */
  uploadMovie(blob) {
    const mimeType = blob.getContentType();
    const bytes = blob.getBytes();
    const fileSize = bytes.length;
    const fileName = blob.getName();

    // 1. メタデータを送信してアップロードURLを取得
    const metadataUrl = `${this.baseUrl}/upload/v1beta/files?key=${this.apikey}`;
    const metadataOptions = {
      method: 'post',
      headers: {
        'X-Goog-Upload-Protocol': 'resumable',
        'X-Goog-Upload-Command': 'start',
        'X-Goog-Upload-Header-Content-Length': fileSize,
        'X-Goog-Upload-Header-Content-Type': mimeType,
        'Content-Type': 'application/json',
      },
      payload: JSON.stringify({
        file: {
          display_name: fileName
        }
      }),
      muteHttpExceptions: true
    };

    // メタデータ送信リクエスト
    const metadataResponse = UrlFetchApp.fetch(metadataUrl, metadataOptions);
    const headers = metadataResponse.getAllHeaders();

    // X-Goog-Upload-URLの取得
    const uploadUrl = headers['x-goog-upload-url'];
    

    if (!uploadUrl) {
      throw new Error('ファイルのアップロードに失敗しました');
    }

    // 2. バイナリデータをアップロード
    const uploadOptions = {
      method: 'post',
      headers: {
        'X-Goog-Upload-Offset': '0',
        'X-Goog-Upload-Command': 'upload, finalize'
      },
      payload: bytes,
      muteHttpExceptions: true
    };

    const uploadResponse = UrlFetchApp.fetch(uploadUrl, uploadOptions);
    const uploadContent = JSON.parse(uploadResponse.getContentText());
    const fileUri = uploadContent.file.uri;

    // 3. アップロードした動画の状態を確認
    let state = uploadContent.file.state;
    while (state === "PROCESSING") {
      console.log("アップロード中...");
      Utilities.sleep(5000); // 5秒待機
      const checkStatusResponse = UrlFetchApp.fetch(`${fileUri}?key=${this.apikey}`);
      const checkStatusContent = JSON.parse(checkStatusResponse.getContentText());
      state = checkStatusContent.state;
    }

    if (state !== "ACTIVE") {
      throw new Error('動画のアップロードに失敗しました。最終状態: ' + state);
    }

    return fileUri;
  }

  /**
   * モデルを変更する
   * @param {'1.5flash' | '1.5pro' | '1.0pro'} model - 利用するAIモデル
   * @return {GeminiApiClient}
   */
  changeModel(model){
    if(model === '1.5flash'){
      this.model = 'gemini-1.5-flash';
      
    }else if(model === '1.5pro'){
      this.model = 'gemini-1.5-pro';

    }else if(model === '1.0pro'){
      this.model = 'gemini-1.0-pro';
    
    }else{
      throw new Error(`不正なモデルが指定されています:${model}`);
    }

    return this;
  }

  /**
   * JSONとして取得する
   * 
   * @param {string} contents - コンテンツ
   * @return {string}
   */
  getAsJson(contents){
    let cleaned = contents.trim();

    // 2. 先頭が ```json や ``` なら除去
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.substring(7); // "```json".length === 7
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.substring(3); // "```".length === 3
    }

    // 3. 末尾が ``` なら除去
    if (cleaned.endsWith("```")) {
      cleaned = cleaned.substring(0, cleaned.length - 3);
    }

    // 4. トリムして整形
    cleaned = cleaned.trim();

    // 5. JSONとしてパース
    try {
      const json = JSON.parse(cleaned);
      return json;
    } catch (e) {
      console.error("JSONパース失敗:", e);
      return null;
    }
  }
}