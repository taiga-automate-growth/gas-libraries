/**
 * Difyを生成する
 * @param {string} apiKey - APIキー
 * @param {string} knowledgeBaseApiKey - ナレッジベースのAPIキー
 * @return {DifyApp}
 */
function create(apiKey, knowledgeBaseApiKey){
  return new Dify(apiKey, knowledgeBaseApiKey);
}