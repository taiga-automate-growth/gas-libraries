class Dify{
  /**
   * @param {string} apiKey - DifyのAPIキー
   * @param {string} knowledgeBaseApiKey - ナレッジベースのAPIキー
   */
  constructor(apiKey,knowledgeBaseApiKey){
    /**
     * @private
     * @type {string}
     */
    this.apiKey = apiKey;

    /**
     * @private
     * @type {string}
     */
    this.knowledgeBaseApiKey = knowledgeBaseApiKey;

    /**
     * @private
     * @type {string}
     */
    this.baseUrl = "https://api.dify.ai/v1";
  }
  
  /**
   * メッセージを送信する
   * @param {string} message - メッセージ本文
   * @return {Array<object>} 処理結果 
   */
  postMessage(message){
    const payload = {
      "inputs": {},
      "query": message,
      "response_mode": "streaming",
      "conversation_id": "",
      "user": "abc-123",
      "files": []
    }

    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`
    }

    const option = {
      "method": "POST",
      "headers": headers,
      "payload": JSON.stringify(payload)
    }

    try{
      const url = `${this.baseUrl}/chat-messages`
      const response = UrlFetchApp.fetch(url,option);
      const contents = response.getContentText();
      const datas = contents.split("\n\n").filter(data => data !== "");
      const target = datas[datas.length - 2].substring(6);
      return JSON.parse(target);
    }catch(e){
      throw e;
    }
  }

  /**
   * ナレッジを新規作成する
   * @param {string} name - ナレッジ名
   * @param {"only_me"|"all_team_members"|"partial_members"} permission - 権限
   * @return {object} ナレッジ
   */
  createKnowledge(name, permission = "only_me"){
    const url = `${this.baseUrl}/datasets`;
    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${this.knowledgeBaseApiKey}`
    }
    const payload = {
      name: name,
      permission: permission
    }
    const option = {
      "method": "POST",
      "headers": headers,
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": true
    }

    try{
      const response = UrlFetchApp.fetch(url,option);
      const code = response.getResponseCode();
      if(code === 409) throw new Error('この名前のナレッジは既に存在します');
      return JSON.parse(response.getContentText());
    }catch(e){
      throw e;
    }
  }

  /**
   * ナレッジベースを取得する
   * @param {number} page - ページ番号
   * @param {number} limit - 取得上限
   * @return {Array<object>} ナレッジの配列
   */
  getKnowledgeBases(page = 1, limit = 20){
    const url = `${this.baseUrl}/datasets?page=${page}&limit=${limit}`;
    const headers = {
      "Authorization": `Bearer ${this.knowledgeBaseApiKey}`
    }
    const option = {
      "method": "GET",
      "headers": headers
    }
    try{
      const response = UrlFetchApp.fetch(url,option).getContentText();
      return JSON.parse(response).data;
    }catch(e){
      throw e;
    }
  }

  /**
   * ドキュメントを取得する
   * @param {string} knowledgeId - ナレッジID
   * @return {object} ナレッジ
   */
  getDocuments(knowledgeId){
    const url = `${this.baseUrl}/datasets/${knowledgeId}/documents`;
    const headers = {
      "Authorization": `Bearer ${this.knowledgeBaseApiKey}`
    }
    const option = {
      "method": "GET",
      "headers": headers
    }

    try{
      const response = UrlFetchApp.fetch(url,option).getContentText();
      return JSON.parse(response);
    }catch(e){
      throw e;
    }
  }

  /**
   * テキストからドキュメントを作成する
   * @param {string} knowledgeId - ナレッジのID
   * @param {string} name - ドキュメントの名称
   * @param {string} text - ナレッジの内容
   * @param {"high_quality" | "economy"} indexingTechnique - インデックスの種別
   * @return {object} 作成したドキュメント
   */
  createDocumentByText(knowledgeId,name,text,indexingTechnique = "high_quality"){
    const url = `${this.baseUrl}/datasets/${knowledgeId}/document/create_by_text`;
    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${this.knowledgeBaseApiKey}`
    }
    const payload = {
      name: name,
      text: text,
      indexing_technique: indexingTechnique,
      process_rule: {
        mode: "automatic"
      }
    }
    const option = {
      "method": "POST",
      "headers": headers,
      "payload": JSON.stringify(payload)
    }
    try{
      const response = UrlFetchApp.fetch(url,option).getContentText();
      return JSON.parse(response);
    }catch(e){
      throw e;
    }
  }

  /**
   * ドキュメントを更新する
   * @param {string} knowledgeId - ナレッジID
   * @param {string} documentId - ドキュメントID
   * @param {string} name - ドキュメントの名称
   * @param {string} text - ドキュメントの内容
   * @return {object} 更新したドキュメント 
   */
  updateDocuments(knowledgeId,documentId,name,text){
    const url = `${this.baseUrl}/datasets/${knowledgeId}/documents/${documentId}/update_by_text`;
    const headers = {
      "Authorization": `Bearer ${this.knowledgeBaseApiKey}`,
      "Content-Type": "application/json"
    }
    const payload = {
      "name": name,
      "text": text
    };
    const option = {
      "method": "POST",
      "headers": headers,
      "payload": JSON.stringify(payload)
    }

    const response = UrlFetchApp.fetch(url,option).getContentText();
    return JSON.parse(response);
  }

  /**
   * セグメントを取得する
   * @param {string} knowledgeId - ナレッジID
   * @param {string} documentId - ドキュメントID
   * @return {Array<object>} セグメントの配列
   */
  getSegments(knowledgeId,documentId){
    const url = `${this.baseUrl}/datasets/${knowledgeId}/documents/${documentId}/segments`;
    const headers = {
      "Authorization": `Bearer ${this.knowledgeBaseApiKey}`,
      "Content-Type": "application/json"
    }

    const option = {
      "method": "GET",
      "headers": headers,
    }

    const response = UrlFetchApp.fetch(url,option).getContentText();
    return JSON.parse(response);
  }

}