/**
 * コンテンツを生成する
 * @param {string} prompt - モデルへの指示
 * @param {Array<Blob>} media - モデルに追加で渡す画像、音声、動画のBlob
 * @return {GeminiApp}
 */
function generateContent(prompt, media = []){
    throw new Error('GeminiAppのダミーメソッドです');
}

/**
 * モデルを変更する
 * @param { '2.5pro' | '2.0flash' | '2.0flash-lite' | '1.5flash' | '1.5pro' } model - 利用するAIモデル
 * @return {GeminiApiClient}
 */
function changeModel(model){
    throw new Error('GeminiAppのダミーメソッドです');
}

/**
 * JSONとして取得する
 * 
 * @param {string} contents - コンテンツ
 * @return {string}
 */
function getAsJson(contents){
    throw new Error('GeminiAppのダミーメソッドです');
}