/**
 * コンテンツを生成する（テキスト＋画像）
 * @param {string} prompt - モデルへの指示
 * @param {Array<Blob>} medias - 画像（image/png, image/jpeg）のみ対応
 * @returns {string} 応答テキスト
 */
function generateContent(prompt, medias = []) {
  throw new Error("専用のメソッドです");
}

/**
 * モデルを変更する
 * @param {'gpt-4o' | 'gpt-4-turbo' | 'gpt-3.5-turbo'} model
 * @returns {GPTApp}
 */
function changeModel(model){
  throw new Error("専用のメソッドです");
}