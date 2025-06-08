/**
 * メッセージを送信する
 * @param {string} message - メッセージ本文
 * @return {Array<object>} 処理結果 
 */
function postMessage(message){
  throw new Error("ダミーメソッドです");
}


/**
 * ナレッジを新規作成する
 * @param {string} name - ナレッジ名
 * @param {"only_me"|"all_team_members"|"partial_members"} permission - 権限
 * @return {object} ナレッジ
 */
function createKnowledge(name, permission = "only_me"){
  throw new Error("ダミーメソッドです");
}


/**
 * ナレッジベースを取得する
 * @param {number} page - ページ番号
 * @param {number} limit - 取得上限
 * @return {Array<object>} ナレッジの配列
 */
function getKnowledgeBases(page = 1, limit = 20){
  throw new Error("ダミーメソッドです");
}


/**
 * ドキュメントを取得する
 * @param {string} knowledgeId - ナレッジID
 * @return {object} ナレッジ
 */
function getDocuments(knowledgeId){
  throw new Error("ダミーメソッドです");
}


/**
 * テキストからドキュメントを作成する
 * @param {string} knowledgeId - ナレッジのID
 * @param {string} name - ドキュメントの名称
 * @param {string} text - ナレッジの内容
 * @param {"high_quality" | "economy"} indexingTechnique - インデックスの種別
 * @return {object} 作成したドキュメント
 */
function createDocumentByText(knowledgeId,name,text,indexingTechnique = "high_quality"){
  throw new Error("ダミーメソッドです");
}


/**
 * ドキュメントを更新する
 * @param {string} knowledgeId - ナレッジID
 * @param {string} documentId - ドキュメントID
 * @param {string} name - ドキュメントの名称
 * @param {string} text - ドキュメントの内容
 * @return {object} 更新したドキュメント 
 */
function updateDocuments(knowledgeId,documentId,name,text){
  throw new Error("ダミーメソッドです");
}


/**
 * セグメントを取得する
 * @param {string} knowledgeId - ナレッジID
 * @param {string} documentId - ドキュメントID
 * @return {Array<object>} セグメントの配列
 */
function getSegments(knowledgeId,documentId){
  throw new Error("ダミーメソッドです");
}