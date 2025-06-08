/**
 * Amazon SP-API Inventory Summaries コレクションを管理するクラス（ページネーション対応）
 */
class InventorySummaries {
    /**
     * コンストラクタ
     * @param {Object} response - SP-APIの最初のレスポンス
     */
    constructor(response) {
        // レスポンスからJSONを解析
        const json = JSON.parse(response.getContentText());
        
        // Granularity情報（payloadの中にある）
        this.granularity = {
            granularityType: null,
            granularityId: null
        };
        
        if (json.payload && json.payload.granularity) {
            this.granularity.granularityType = json.payload.granularity.granularityType || null;
            this.granularity.granularityId = json.payload.granularity.granularityId || null;
        }

        // Pagination情報（トップレベルにある）
        this.pagination = {
            nextToken: null
        };
        
        if (json.pagination) {
            this.pagination.nextToken = json.pagination.nextToken || null;
        }

        // InventorySummaryコレクション
        this.inventorySummaries = [];
        
        // 最初のレスポンスからInventorySummaryを作成（payload.inventorySummariesから）
        if (json.payload && json.payload.inventorySummaries && Array.isArray(json.payload.inventorySummaries)) {
            this.addInventorySummaries(...json.payload.inventorySummaries);
        }

        // 元データを保持（デバッグ用）
        this._responses = [json];
    }

    /**
     * 次ページのトークンがあるかどうかをチェック
     * @returns {boolean} 次ページのトークンがあるかどうか
     */
    hasNextToken() {
        return this.pagination.nextToken !== null && this.pagination.nextToken !== undefined;
    }

    /**
     * 次ページのトークンを取得
     * @returns {string|null} 次ページのトークン
     */
    getNextToken() {
        return this.pagination.nextToken;
    }

    /**
     * InventorySummaryを複数追加する
     * @param {...Object} summaryData - 追加するInventorySummaryのデータ（可変長引数）
     */
    addInventorySummaries(...summaryData) {
        summaryData.forEach(data => {
            if (data && typeof data === 'object') {
                this.inventorySummaries.push(new InventorySummary(data));
            }
        });
    }

    /**
     * 次ページのレスポンスを処理して追加する
     * @param {Object} response - SP-APIの次ページレスポンス
     */
    addNextPageResponse(response) {
        const json = JSON.parse(response.getContentText());
        
        // ページネーション情報を更新
        if (json.pagination) {
            this.pagination.nextToken = json.pagination.nextToken || null;
        } else {
            this.pagination.nextToken = null;
        }

        // 新しいInventorySummaryを追加（payload.inventorySummariesから）
        if (json.payload && json.payload.inventorySummaries && Array.isArray(json.payload.inventorySummaries)) {
            this.addInventorySummaries(...json.payload.inventorySummaries);
        }

        // デバッグ用にレスポンスを保持
        this._responses.push(json);
    }

    /**
     * InventorySummaryコレクションを取得
     * @returns {Array<InventorySummary>} InventorySummaryの配列
     */
    getInventories() {
        return this.inventorySummaries;
    }

    /**
     * 在庫アイテム数を取得
     * @returns {number} 在庫アイテム数
     */
    getCount() {
        return this.inventorySummaries.length;
    }

    /**
     * 取得したページ数を取得
     * @returns {number} 取得したページ数
     */
    getPageCount() {
        return this._responses.length;
    }

    /**
     * 特定のSKUでInventorySummaryを検索
     * @param {string} sellerSku - 検索するSKU
     * @returns {InventorySummary|null} 該当するInventorySummary、見つからない場合はnull
     */
    findBySku(sellerSku) {
        return this.inventorySummaries.find(item => item.sellerSku === sellerSku) || null;
    }

    /**
     * 特定のASINでInventorySummaryを検索
     * @param {string} asin - 検索するASIN
     * @returns {InventorySummary|null} 該当するInventorySummary、見つからない場合はnull
     */
    findByAsin(asin) {
        return this.inventorySummaries.find(item => item.asin === asin) || null;
    }

    /**
     * 条件に合致するInventorySummaryをフィルタリング
     * @param {Function} predicate - フィルタ条件の関数
     * @returns {Array<InventorySummary>} フィルタされたInventorySummaryの配列
     */
    filter(predicate) {
        return this.inventorySummaries.filter(predicate);
    }

    /**
     * 在庫ありのアイテムを取得
     * @returns {Array<InventorySummary>} 在庫ありのアイテム
     */
    getInStockItems() {
        return this.filter(item => item.isAvailable());
    }

    /**
     * 在庫切れのアイテムを取得
     * @returns {Array<InventorySummary>} 在庫切れのアイテム
     */
    getOutOfStockItems() {
        return this.filter(item => item.isOutOfStock());
    }

    /**
     * 在庫少のアイテムを取得
     * @param {number} threshold - 在庫少の閾値（デフォルト: 5）
     * @returns {Array<InventorySummary>} 在庫少のアイテム
     */
    getLowStockItems(threshold = 5) {
        return this.filter(item => item.isLowStock(threshold));
    }

    /**
     * Granularityタイプを取得
     * @returns {string|null} Granularityタイプ
     */
    getGranularityType() {
        return this.granularity.granularityType;
    }

    /**
     * GranularityIDを取得
     * @returns {string|null} GranularityID
     */
    getGranularityId() {
        return this.granularity.granularityId;
    }

    /**
     * 在庫サマリー統計を取得
     * @returns {Object} 在庫統計情報
     */
    getStatistics() {
        const totalItems = this.getCount();
        const inStockItems = this.getInStockItems().length;
        const outOfStockItems = this.getOutOfStockItems().length;
        const lowStockItems = this.getLowStockItems().length;

        const totalQuantity = this.inventorySummaries.reduce((sum, item) => sum + item.totalQuantity, 0);
        const totalFulfillableQuantity = this.inventorySummaries.reduce((sum, item) => sum + item.fulfillableQuantity, 0);

        return {
            totalItems,
            inStockItems,
            outOfStockItems,
            lowStockItems,
            totalQuantity,
            totalFulfillableQuantity,
            pageCount: this.getPageCount(),
            granularity: this.granularity,
            hasNextToken: this.hasNextToken()
        };
    }

    /**
     * CSV形式で全在庫データを出力
     * @returns {string} CSV形式のデータ
     */
    toCSV() {
        if (this.inventorySummaries.length === 0) {
            return InventorySummary.getCsvHeader();
        }

        const header = InventorySummary.getCsvHeader();
        const rows = this.inventorySummaries.map(item => item.toCsvRow());
        return [header, ...rows].join("\n");
    }

    /**
     * 在庫アイテムをマップ処理
     * @param {Function} mapper - マップ処理の関数
     * @returns {Array} マップ処理された結果の配列
     */
    map(mapper) {
        return this.inventorySummaries.map(mapper);
    }

    /**
     * 在庫アイテムに対して処理を実行
     * @param {Function} callback - 各アイテムに対して実行する関数
     */
    forEach(callback) {
        this.inventorySummaries.forEach(callback);
    }

    /**
     * 文字列表現
     * @returns {string} 文字列表現
     */
    toString() {
        return `InventorySummaries(アイテム数: ${this.getCount()}, ページ数: ${this.getPageCount()}, 次ページあり: ${this.hasNextToken()})`;
    }

    /**
     * 全レスポンスデータを取得（デバッグ用）
     * @returns {Array<Object>} 全レスポンスデータ
     */
    getAllResponses() {
        return this._responses;
    }

    /**
     * レスポンス構造の詳細をデバッグ出力
     * @returns {Object} デバッグ情報
     */
    debugResponseStructure() {
        const firstResponse = this._responses[0];
        return {
            hasPayload: !!firstResponse.payload,
            hasInventorySummaries: !!(firstResponse.payload && firstResponse.payload.inventorySummaries),
            inventorySummariesCount: firstResponse.payload && firstResponse.payload.inventorySummaries ? firstResponse.payload.inventorySummaries.length : 0,
            hasPagination: !!firstResponse.pagination,
            hasGranularity: !!(firstResponse.payload && firstResponse.payload.granularity),
            responseKeys: Object.keys(firstResponse),
            payloadKeys: firstResponse.payload ? Object.keys(firstResponse.payload) : []
        };
    }
} 