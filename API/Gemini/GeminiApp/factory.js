/**
 * Geminiを生成する
 * @param {string} apikey - APIキー
 * @param { '2.5pro' | '2.0flash' | '2.0flash-lite' | '1.5flash' | '1.5pro' } model - 利用するAIモデル
 * @return {GeminiApp}
 */
function create(apikey,model){
    const gemini = new GeminiApp(apikey, model);
    return gemini;
}