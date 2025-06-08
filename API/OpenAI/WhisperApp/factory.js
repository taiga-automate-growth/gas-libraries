/**
 * Whisperを生成
 * @param {string} apiKey - APIKEY
 * @return {WhisperApp}
 */
function create(apiKey){
  return new WhisperApp(apiKey);
}