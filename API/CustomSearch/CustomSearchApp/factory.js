/**
 * @param {string} apiKey - Google Custom Search API の API キー
 * @param {string} searchEngineId - カスタム検索エンジンの ID (Search Engine ID)
 * @return {CustomSearchApp}
 */
function create(apiKey,searchEngineId) {
  return new CustomSearchApiClient(apiKey,searchEngineId);
}
