// =============================================================================
// InventorySummaries クラスのインスタンスメソッド（コード補完用）
// =============================================================================

/**
 * 次ページのトークンがあるかどうかをチェック
 * @returns {boolean} 次ページのトークンがあるかどうか
 */
function hasNextToken() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 次ページのトークンを取得
 * @returns {string|null} 次ページのトークン
 */
function getNextToken() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * InventorySummaryを複数追加する
 * @param {...Object} summaryData - 追加するInventorySummaryのデータ（可変長引数）
 */
function addInventorySummaries(...summaryData) {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 次ページのレスポンスを処理して追加する
 * @param {Object} response - SP-APIの次ページレスポンス
 */
function addNextPageResponse(response) {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * InventorySummaryコレクションを取得
 * @returns {Array<InventorySummary>} InventorySummaryの配列
 */
function getInventories() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 在庫アイテム数を取得
 * @returns {number} 在庫アイテム数
 */
function getCount() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 取得したページ数を取得
 * @returns {number} 取得したページ数
 */
function getPageCount() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 特定のSKUでInventorySummaryを検索
 * @param {string} sellerSku - 検索するSKU
 * @returns {InventorySummary|null} 該当するInventorySummary、見つからない場合はnull
 */
function findBySku(sellerSku) {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 特定のASINでInventorySummaryを検索
 * @param {string} asin - 検索するASIN
 * @returns {InventorySummary|null} 該当するInventorySummary、見つからない場合はnull
 */
function findByAsin(asin) {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 条件に合致するInventorySummaryをフィルタリング
 * @param {Function} predicate - フィルタ条件の関数
 * @returns {Array<InventorySummary>} フィルタされたInventorySummaryの配列
 */
function filter(predicate) {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 在庫ありのアイテムを取得
 * @returns {Array<InventorySummary>} 在庫ありのアイテム
 */
function getInStockItems() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 在庫切れのアイテムを取得
 * @returns {Array<InventorySummary>} 在庫切れのアイテム
 */
function getOutOfStockItems() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 在庫少のアイテムを取得
 * @param {number} threshold - 在庫少の閾値（デフォルト: 5）
 * @returns {Array<InventorySummary>} 在庫少のアイテム
 */
function getLowStockItems(threshold = 5) {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * Granularityタイプを取得
 * @returns {string|null} Granularityタイプ
 */
function getGranularityType() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * GranularityIDを取得
 * @returns {string|null} GranularityID
 */
function getGranularityId() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 在庫サマリー統計を取得
 * @returns {Object} 在庫統計情報
 */
function getStatistics() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * CSV形式で全在庫データを出力
 * @returns {string} CSV形式のデータ
 */
function toCSV() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 在庫アイテムをマップ処理
 * @param {Function} mapper - マップ処理の関数
 * @returns {Array} マップ処理された結果の配列
 */
function map(mapper) {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 在庫アイテムに対して処理を実行
 * @param {Function} callback - 各アイテムに対して実行する関数
 */
function forEach(callback) {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 文字列表現
 * @returns {string} 文字列表現
 */
function toString() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

/**
 * 全レスポンスデータを取得（デバッグ用）
 * @returns {Array<Object>} 全レスポンスデータ
 */
function getAllResponses() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummariesインスタンスから呼び出してください。");
}

// =============================================================================
// InventorySummary クラスのインスタンスメソッド（コード補完用）
// =============================================================================

/**
 * 利用可能な在庫があるかどうかをチェック
 * @returns {boolean} 利用可能な在庫があるかどうか
 */
function isAvailable() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummaryインスタンスから呼び出してください。");
}

/**
 * 在庫切れかどうかをチェック
 * @returns {boolean} 在庫切れかどうか
 */
function isOutOfStock() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummaryインスタンスから呼び出してください。");
}

/**
 * 在庫が少ないかどうかをチェック
 * @param {number} threshold - 在庫少の閾値（デフォルト: 5）
 * @returns {boolean} 在庫が少ないかどうか
 */
function isLowStock(threshold = 5) {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummaryインスタンスから呼び出してください。");
}

/**
 * 入荷中の在庫があるかどうかをチェック
 * @returns {boolean} 入荷中の在庫があるかどうか
 */
function hasInboundInventory() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummaryインスタンスから呼び出してください。");
}

/**
 * 在庫のステータスを取得
 * @returns {string} 在庫ステータス
 */
function getStockStatus() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummaryインスタンスから呼び出してください。");
}

/**
 * 在庫価値を計算
 * @param {number} unitPrice - 単価
 * @returns {number} 在庫価値
 */
function calculateValue(unitPrice) {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummaryインスタンスから呼び出してください。");
}

/**
 * 利用可能在庫の価値を計算
 * @param {number} unitPrice - 単価
 * @returns {number} 利用可能在庫の価値
 */
function calculateFulfillableValue(unitPrice) {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummaryインスタンスから呼び出してください。");
}

/**
 * 在庫の詳細情報を取得
 * @returns {Object} 在庫詳細情報
 */
function getDetails() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummaryインスタンスから呼び出してください。");
}

/**
 * CSV行として出力
 * @returns {string} CSV行
 */
function toCsvRow() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummaryインスタンスから呼び出してください。");
}

/**
 * JSON形式で出力
 * @returns {Object} JSON形式のデータ
 */
function toJson() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummaryインスタンスから呼び出してください。");
}

/**
 * 原本データを取得（デバッグ用）
 * @returns {Object} 原本データ
 */
function getRawData() {
    throw new Error("インスタンスメソッドではないため、直接呼び出し不可。InventorySummaryインスタンスから呼び出してください。");
}

// =============================================================================
// InventorySummary クラスの静的メソッド（コード補完用）
// =============================================================================

/**
 * CSVヘッダーを取得する静的メソッド
 * @returns {string} CSVヘッダー
 */
function getCsvHeader() {
    throw new Error("静的メソッドではないため、直接呼び出し不可。InventorySummary.getCsvHeader()を使用してください。");
}
