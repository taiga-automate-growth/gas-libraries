/**
 * Amazon Order ライブラリ用コード補完サポート
 * これらの関数は実装されていません。インスタンスメソッドを呼び出してください。
 */

/**
 * AmazonOrder ライブラリのメソッド
 */

/**
 * SP-APIレスポンスからOrderインスタンスを作成する
 * @param {Object} response - SP-APIのレスポンス
 * @param {Object} orderInfo - 関連する注文情報（省略可）
 * @returns {Order} Orderインスタンス
 */
function fromApiResponse(response, orderInfo = null) {
    throw new Error("このメソッドはAmazonOrder.fromApiResponse()で呼び出してください");
}

/**
 * 日付別注文アイテム結果からOrderインスタンスを作成する
 * @param {Object} dateResult - getOrderItemsByDateの結果
 * @returns {Order} Orderインスタンス
 */
function fromDateResult(dateResult) {
    throw new Error("このメソッドはAmazonOrder.fromDateResult()で呼び出してください");
}

/**
 * 注文メタデータからOrderインスタンスを作成する
 * @param {Object} orderData - getOrdersで取得した個別の注文データ
 * @returns {Order} Orderインスタンス
 */
function fromOrderData(orderData) {
    throw new Error("このメソッドはAmazonOrder.fromOrderData()で呼び出してください");
}

/**
 * 新しいOrderインスタンスを作成する
 * @param {Object} orderData - 注文データ
 * @returns {Order} Orderインスタンス
 */
function createOrder(orderData) {
    throw new Error("このメソッドはAmazonOrder.createOrder()で呼び出してください");
}

/**
 * 新しいOrderItemインスタンスを作成する
 * @param {Object} orderItemData - SP-APIから取得した個別の注文アイテムデータ
 * @returns {OrderItem} OrderItemインスタンス
 */
function createOrderItem(orderItemData = {}) {
    throw new Error("このメソッドはAmazonOrder.createOrderItem()で呼び出してください");
}

/**
 * OrderItemのCSVヘッダーを取得
 * @returns {string} CSVヘッダー
 */
function getCsvHeader() {
    throw new Error("このメソッドはAmazonOrder.getCsvHeader()で呼び出してください");
}

/**
 * OrderItem クラスのインスタンスメソッド
 */

/**
 * 注文情報を設定する
 * @param {Object} orderInfo - 関連する注文情報
 */
function setOrderInfo(orderInfo) {
    throw new Error("このメソッドはOrderItemインスタンスで呼び出してください");
}

/**
 * アイテムの総金額を計算する（税込み）
 * @returns {number} 総金額
 */
function getTotalAmount() {
    throw new Error("このメソッドはOrderItemインスタンスで呼び出してください");
}

/**
 * 税抜き総金額を計算する
 * @returns {number} 税抜き総金額
 */
function getTotalAmountExcludingTax() {
    throw new Error("このメソッドはOrderItemインスタンスで呼び出してください");
}

/**
 * 総税額を計算する
 * @returns {number} 総税額
 */
function getTotalTaxAmount() {
    throw new Error("このメソッドはOrderItemインスタンスで呼び出してください");
}

/**
 * 出荷済みかどうかをチェック
 * @returns {boolean} 出荷済みかどうか
 */
function isShipped() {
    throw new Error("このメソッドはOrderItemインスタンスで呼び出してください");
}

/**
 * 完全出荷かどうかをチェック
 * @returns {boolean} 完全出荷かどうか
 */
function isFullyShipped() {
    throw new Error("このメソッドはOrderItemインスタンスで呼び出してください");
}

/**
 * 部分出荷かどうかをチェック
 * @returns {boolean} 部分出荷かどうか
 */
function isPartiallyShipped() {
    throw new Error("このメソッドはOrderItemインスタンスで呼び出してください");
}

/**
 * 未出荷数量を取得
 * @returns {number} 未出荷数量
 */
function getUnshippedQuantity() {
    throw new Error("このメソッドはOrderItemインスタンスで呼び出してください");
}

/**
 * FBA商品かどうかをチェック
 * @returns {boolean} FBA商品かどうか
 */
function isFBA() {
    throw new Error("このメソッドはOrderItemインスタンスで呼び出してください");
}

/**
 * 自己配送商品かどうかをチェック
 * @returns {boolean} 自己配送商品かどうか
 */
function isMFN() {
    throw new Error("このメソッドはOrderItemインスタンスで呼び出してください");
}

/**
 * 詳細情報を取得
 * @returns {Object} 詳細情報
 */
function getDetails() {
    throw new Error("このメソッドはOrderItemインスタンスで呼び出してください");
}

/**
 * CSV行として出力
 * @returns {string} CSV行
 */
function toCsvRow() {
    throw new Error("このメソッドはOrderItemインスタンスで呼び出してください");
}

/**
 * JSON形式で出力
 * @returns {Object} JSON形式のデータ
 */
function toJson() {
    throw new Error("このメソッドはOrderItemインスタンスで呼び出してください");
}

/**
 * Order クラスのインスタンスメソッド
 */

/**
 * OrderItemの配列を取得
 * @returns {Array<OrderItem>} OrderItemの配列
 */
function getItems() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 注文アイテム数を取得
 * @returns {number} 注文アイテム数
 */
function getCount() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 特定のSKUでOrderItemを検索
 * @param {string} sellerSKU - 検索するSKU
 * @returns {Array<OrderItem>} 該当するOrderItemの配列
 */
function findBySKU(sellerSKU) {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 特定のASINでOrderItemを検索
 * @param {string} asin - 検索するASIN
 * @returns {Array<OrderItem>} 該当するOrderItemの配列
 */
function findByASIN(asin) {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 条件に合致するOrderItemをフィルタリング
 * @param {Function} predicate - フィルタ条件の関数
 * @returns {Array<OrderItem>} フィルタされたOrderItemの配列
 */
function filter(predicate) {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 出荷済みアイテムを取得
 * @returns {Array<OrderItem>} 出荷済みアイテム
 */
function getShippedItems() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 未出荷アイテムを取得
 * @returns {Array<OrderItem>} 未出荷アイテム
 */
function getUnshippedItems() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 完全出荷アイテムを取得
 * @returns {Array<OrderItem>} 完全出荷アイテム
 */
function getFullyShippedItems() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 部分出荷アイテムを取得
 * @returns {Array<OrderItem>} 部分出荷アイテム
 */
function getPartiallyShippedItems() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * FBAアイテムを取得
 * @returns {Array<OrderItem>} FBAアイテム
 */
function getFBAItems() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 自己配送アイテムを取得
 * @returns {Array<OrderItem>} 自己配送アイテム
 */
function getMFNItems() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 総注文数量を計算
 * @returns {number} 総注文数量
 */
function getTotalQuantityOrdered() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 総出荷数量を計算
 * @returns {number} 総出荷数量
 */
function getTotalQuantityShipped() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 総未出荷数量を計算
 * @returns {number} 総未出荷数量
 */
function getTotalQuantityUnshipped() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * ユニークSKU数を取得
 * @returns {number} ユニークSKU数
 */
function getUniqueSKUCount() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * SKU別数量サマリーを取得
 * @returns {Object} SKU別数量サマリー
 */
function getSKUSummary() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 統計情報を取得
 * @returns {Object} 統計情報
 */
function getStatistics() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * CSV形式で全注文アイテムデータを出力
 * @returns {string} CSV形式のデータ
 */
function toCSV() {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 注文アイテムをマップ処理
 * @param {Function} mapper - マップ処理の関数
 * @returns {Array} マップ処理された結果の配列
 */
function map(mapper) {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}

/**
 * 注文アイテムに対して処理を実行
 * @param {Function} callback - 各アイテムに対して実行する関数
 */
function forEach(callback) {
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
} 

/**
 * 注文IDを取得
 * @returns {string} 注文ID
 */
function getAmazonOrderId(){
    throw new Error("このメソッドはOrderインスタンスで呼び出してください");
}