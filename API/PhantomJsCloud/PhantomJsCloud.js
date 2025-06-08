/**
 * PhantomJsCloudを表すクラス
 * 
 * @class
 */
class PhantomJsCloud{

  /**
   * @param {string} apiKey - APIキー
   */
  constructor(apiKey){
    this.apiKey = apiKey;
  }
  
  /**
   * @param {string} url - コンテンツを取得したいURL
   * @return {string} HTMLコンテンツ
   */
  getContent(url){
    const option ={
      url: url,
      renderType: "HTML",
      outputAsJson: true,
      requestSettings: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
        maxWeight: 300000
      }
    };

    const payload = JSON.stringify(option);
    const requestJson = encodeURIComponent(payload);
    
    const endPoint = "https://phantomjscloud.com/api/browser/v2/" + this.apiKey + "/?request=" + requestJson;
    
    const response = UrlFetchApp.fetch(endPoint);

    const json = JSON.parse(response.getContentText());

    const source = json["content"]["data"];
    return source;
  }
}

/**
 * @param {string} apiKey - PhantomJSCloudのAPIキー
 * @return {PhantomJsCloud} PhantomJsCloudインスタンス
 */
function create(apiKey){
  return new PhantomJsCloud(apiKey);
}

/**
 * @param {string} url - コンテンツを取得したいURL
 * @return {string} HTMLコンテンツ
 */
function getContent(url){
  throw new Error('PhantomJsCloudインスタンス専用のメソッドのため利用できません');
}