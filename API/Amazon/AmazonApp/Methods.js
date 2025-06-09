/**
 * 認可エンドポイントURLを返す（SP-API用）
 * @param {string} applicationId - アプリケーションID
 * @param {string} redirectUri - コールバックURL
 * @param {string} state - 任意のstate値
 * @returns {string} 認可エンドポイントURL
 */
function getAuthorizationUrl(applicationId, redirectUri, state = "") {
    const baseUrl = "https://sellercentral.amazon.co.jp/apps/authorize/consent";
    const params = [
        `application_id=${encodeURIComponent(applicationId)}`,
        state ? `state=${encodeURIComponent(state)}` : "",
        `version=beta`,
        `redirect_uri=${encodeURIComponent(redirectUri)}`
    ].filter(Boolean).join("&");
    return `${baseUrl}?${params}`;
}

/**
 * 認可コードからアクセストークン・リフレッシュトークンを取得
 * @param {string} clientId
 * @param {string} clientSecret
 * @param {string} code
 * @param {string} redirectUri
 * @returns {Object} { refreshToken, accessToken }
 */
function getRefreshToken(clientId, clientSecret, code, redirectUri) {
    const url = "https://api.amazon.com/auth/o2/token";
    const payload = {
        grant_type: "authorization_code",
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri
    };
    const options = {
        method: "post",
        contentType: "application/x-www-form-urlencoded",
        payload: Object.keys(payload).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(payload[k])}`).join("&")
    };
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    return result.refresh_token
}

/**
 * リフレッシュトークンからAmazonAppを生成
 * @param {string} refreshToken　リフレッシュトークン
 * @param {string} clientId　クライアントID
 * @param {string} clientSecret　クライアントシークレット
 * @param {"JP"|"US"} country　国
 * @param {string} appName　アプリケーション名
 * @param {string} appVersion　アプリケーションバージョン
 * @param {"JavaScript"|"TypeScript"|"Java"|"PHP"|"Python"|"Ruby"} language　言語
 * @returns {AmazonApp}
 */
function create(refreshToken,clientId,clientSecret,country,appName,appVersion,language){
    return new AmazonApp(refreshToken,clientId,clientSecret,country,appName,appVersion,language);
}

/**
 * 在庫を取得（ページネーション対応）
 * @returns {InventorySummaries} InventorySummariesインスタンス
 */
function getInventorySummaries(){
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。AmazonAppインスタンスから呼び出してください。");
}

/**
 * 在庫を取得
 * @deprecated getInventorySummaries()を使用してください
 * @returns {Object} 在庫
 */
function getInventories(){
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。AmazonAppインスタンスから呼び出してください。");
}

/**
 * 注文を取得する（ページネーション・レート制限対応）
 * @param {Object} options - 検索オプション
 * @returns {Array<Object>} 注文の配列
 */
function getOrders(options){
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。AmazonAppインスタンスから呼び出してください。");
}

/**
 * 特定の注文の注文アイテムを取得する（レート制限対応）
 * @param {string} orderId - 注文ID
 * @param {string} nextToken - 次ページのトークン（省略可）
 * @returns {Object} 注文アイテムのレスポンス
 */
function getOrderItems(orderId, nextToken){
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。AmazonAppインスタンスから呼び出してください。");
}

/**
 * 特定の注文の全注文アイテムを取得する（ページネーション・レート制限対応）
 * @param {string} orderId - 注文ID
 * @returns {Array<Object>} 注文アイテムの配列
 */
function getAllOrderItems(orderId){
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。AmazonAppインスタンスから呼び出してください。");
}

/**
 * 複数の注文の注文アイテムを一括取得する（レート制限対応）
 * @param {Array<string>} orderIds - 注文IDの配列
 * @param {Function} progressCallback - 進捗コールバック関数（省略可）
 * @returns {Object} 注文IDをキーとした注文アイテムのマップ
 */
function getBulkOrderItems(orderIds, progressCallback){
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。AmazonAppインスタンスから呼び出してください。");
}

/**
 * 特定の日付の注文アイテムを全て取得する（レート制限対応）
 * @param {string} date - 取得したい日付（YYYY-MM-DD形式）
 * @param {Object} options - 追加オプション
 * @returns {Object} 日付の注文アイテム情報
 */
function getOrderItemsByDate(date, options){
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。AmazonAppインスタンスから呼び出してください。");
}

/**
 * 複数日の注文アイテムを一括取得する（レート制限対応）
 * @param {Array<string>} dates - 日付の配列（YYYY-MM-DD形式）
 * @param {Object} options - 追加オプション
 * @returns {Object} 日付をキーとした注文アイテム情報のマップ
 */
function getBulkOrderItemsByDates(dates, options){
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。AmazonAppインスタンスから呼び出してください。");
}

/**
 * レート制限対応のスリープ処理
 * @private
 * @param {number} seconds - スリープ時間（秒）
 */
function sleep(seconds){
    throw new Error("プライベートメソッドのため、直接呼び出し不可。");
}

/**
 * リクエストヘッダーを作成する
 * @private
 * @returns {Object} リクエストヘッダー
 */
function createRequestHeaders(){
    throw new Error("プライベートメソッドのため、直接呼び出し不可。");
}

/**
 * セラーIDを取得
 * @returns {string} セラーID
 */
function getSellerId(){
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。AmazonAppインスタンスから呼び出してください。");
}

/**
 * 全ての出品SKUを取得する（searchListingsItems API使用）
 * @param {Object} options - 追加オプション
 * @param {number} options.maxResults - 1回のリクエストで取得する最大件数（デフォルト: 20）
 * @param {Array<string>} options.includedData - 含めるデータタイプ（デフォルト: ["summaries"]）
 * @param {string} options.status - リスティングのステータスフィルタ（デフォルト: "ACTIVE"）
 * @returns {Array<string>} SKUの配列
 */
function getSkuList(options){
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。AmazonAppインスタンスから呼び出してください。");
}

/**
 * 特定のSKUのリスティングアイテムを取得する
 * @param {string} sellerId - セラーID
 * @param {string} sku - SKU
 * @returns {Object} リスティングアイテム情報
 */
function getSku(sellerId, sku){
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。AmazonAppインスタンスから呼び出してください。");
}