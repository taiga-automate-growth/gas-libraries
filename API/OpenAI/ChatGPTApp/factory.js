/**
 * ChatGPTを生成する
 * @param {string} apiKey - OpenAIのAPIキー
 * @param {'gpt-4o' | 'gpt-4-turbo' | 'gpt-3.5-turbo'} model - 使用するモデル名
 * @return {ChatGPTApp}
 */
function create(apiKey, model = 'gpt-4o'){
  return new ChatGPTApp(apiKey,model);
}
