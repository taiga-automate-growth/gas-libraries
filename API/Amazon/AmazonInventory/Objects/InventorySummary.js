/**
 * Amazon SP-API Inventory Summary 個別アイテムを表現するクラス
 */
class InventorySummary {
    /**
     * コンストラクタ
     * @param {Object} inventoryData - SP-APIから取得した個別の在庫データ
     */
    constructor(inventoryData = {}) {
        // 基本情報
        this.sellerSku = inventoryData.sellerSku || null;
        this.fnSku = inventoryData.fnSku || null;
        this.asin = inventoryData.asin || null;
        this.productName = inventoryData.productName || null;
        this.condition = inventoryData.condition || null;

        const details = inventoryData.inventoryDetails;
        
        // 在庫数量情報
        this.totalQuantity = parseInt(inventoryData.totalQuantity) || 0;
        this.fulfillableQuantity = parseInt(details.fulfillableQuantity) || 0;
        this.inboundWorkingQuantity = parseInt(details.inboundWorkingQuantity) || 0;
        this.inboundShippedQuantity = parseInt(details.inboundShippedQuantity) || 0;
        this.inboundReceivingQuantity = parseInt(details.inboundReceivingQuantity) || 0;
        
        // 予約済み
        const reservedQuantity = details.reservedQuantity;
        this.reservedQuantity = parseInt(reservedQuantity.totalReservedQuantity + reservedQuantity.pendingCustomerOrderQuantity + reservedQuantity.pendingTransshipmentQuantity + reservedQuantity.fcProcessingQuantity) || 0;
        
        // 保留中数量
        const unfulfillableQuantity = details.unfulfillableQuantity;
        this.unfulfillableQuantity = parseInt(
            unfulfillableQuantity.totalUnfulfillableQuantity + 
            unfulfillableQuantity.customerDamagedQuantity + 
            unfulfillableQuantity.warehouseDamagedQuantity + 
            unfulfillableQuantity.distributorDamagedQuantity + 
            unfulfillableQuantity.carrierDamagedQuantity + 
            unfulfillableQuantity.defectiveQuantity + 
            unfulfillableQuantity.expiredQuantity
        ) || 0;
        
        // 研究・調査中数量
        this.researchingQuantity = parseInt(details.researchingQuantity.totalResearchingQuantity) || 0;
        
        // 日付情報
        this.lastUpdatedTime = inventoryData.lastUpdatedTime || null;
        
        // 原本データを保持（デバッグ用）
        this._rawData = inventoryData;
    }

    /**
     * JSONデータの配列からInventorySummaryインスタンスの配列を作成する静的メソッド
     * @param {Array} jsonArray - SP-APIレスポンスのJSONデータ配列
     * @returns {Array<InventorySummary>} InventorySummaryインスタンスの配列
     */
    static fromJsonArray(jsonArray) {
        if (!Array.isArray(jsonArray)) {
            return [];
        }
        return jsonArray.map(item => InventorySummary.fromJson(item));
    }

    /**
     * SP-APIレスポンス全体からInventorySummaryインスタンスの配列を作成する静的メソッド
     * @param {Object} response - SP-APIの完全なレスポンス
     * @returns {Array<InventorySummary>} InventorySummaryインスタンスの配列
     */
    static fromApiResponse(response) {
        if (!response || !response.inventorySummaries) {
            return [];
        }
        return InventorySummary.fromJsonArray(response.inventorySummaries);
    }

    /**
     * 利用可能な在庫があるかどうかをチェック
     * @returns {boolean} 利用可能な在庫があるかどうか
     */
    isAvailable() {
        return this.fulfillableQuantity > 0;
    }

    /**
     * 在庫切れかどうかをチェック
     * @returns {boolean} 在庫切れかどうか
     */
    isOutOfStock() {
        return this.totalQuantity === 0;
    }

    /**
     * 在庫が少ないかどうかをチェック
     * @param {number} threshold - 在庫少の閾値（デフォルト: 5）
     * @returns {boolean} 在庫が少ないかどうか
     */
    isLowStock(threshold = 5) {
        return this.totalQuantity > 0 && this.totalQuantity <= threshold;
    }

    /**
     * 入荷中の在庫があるかどうかをチェック
     * @returns {boolean} 入荷中の在庫があるかどうか
     */
    hasInboundInventory() {
        return (this.inboundWorkingQuantity + this.inboundShippedQuantity + this.inboundReceivingQuantity) > 0;
    }

    /**
     * 在庫のステータスを取得
     * @returns {string} 在庫ステータス
     */
    getStockStatus() {
        if (this.isOutOfStock()) {
            return this.hasInboundInventory() ? "在庫切れ（入荷予定あり）" : "在庫切れ";
        } else if (this.isLowStock()) {
            return "在庫少";
        } else if (this.isAvailable()) {
            return "在庫あり";
        } else {
            return "不明";
        }
    }

    /**
     * 在庫価値を計算
     * @param {number} unitPrice - 単価
     * @returns {number} 在庫価値
     */
    calculateValue(unitPrice) {
        return this.totalQuantity * (unitPrice || 0);
    }

    /**
     * 利用可能在庫の価値を計算
     * @param {number} unitPrice - 単価
     * @returns {number} 利用可能在庫の価値
     */
    calculateFulfillableValue(unitPrice) {
        return this.fulfillableQuantity * (unitPrice || 0);
    }

    /**
     * 在庫の詳細情報を取得
     * @returns {Object} 在庫詳細情報
     */
    getDetails() {
        return {
            sellerSku: this.sellerSku,
            asin: this.asin,
            productName: this.productName,
            condition: this.condition,
            status: this.getStockStatus(),
            quantities: {
                total: this.totalQuantity,
                fulfillable: this.fulfillableQuantity,
                reserved: this.reservedQuantity,
                unfulfillable: this.unfulfillableQuantity,
                inbound: {
                    working: this.inboundWorkingQuantity,
                    shipped: this.inboundShippedQuantity,
                    receiving: this.inboundReceivingQuantity,
                    total: this.inboundWorkingQuantity + this.inboundShippedQuantity + this.inboundReceivingQuantity
                },
                researching: this.researchingQuantity
            },
            lastUpdated: this.lastUpdatedTime
        };
    }

    /**
     * CSV行として出力
     * @returns {string} CSV行
     */
    toCsvRow() {
        return [
            this.sellerSku || "",
            this.asin || "",
            this.productName || "",
            this.totalQuantity,
            this.fulfillableQuantity,
            this.reservedQuantity,
            this.unfulfillableQuantity,
            this.inboundWorkingQuantity + this.inboundShippedQuantity + this.inboundReceivingQuantity,
            this.condition || "",
            this.getStockStatus(),
            this.lastUpdatedTime || ""
        ].join(",");
    }

    /**
     * CSVヘッダーを取得する静的メソッド
     * @returns {string} CSVヘッダー
     */
    static getCsvHeader() {
        return [
            "SKU",
            "ASIN",
            "商品名",
            "合計在庫数",
            "利用可能在庫数",
            "予約済み数量",
            "不良在庫数",
            "入荷中数量",
            "条件",
            "ステータス",
            "最終更新日"
        ].join(",");
    }

    /**
     * JSON形式で出力
     * @returns {Object} JSON形式のデータ
     */
    toJson() {
        return this.getDetails();
    }

    /**
     * 文字列表現
     * @returns {string} 文字列表現
     */
    toString() {
        return `InventorySummary(SKU: ${this.sellerSku}, 在庫: ${this.totalQuantity}, 利用可能: ${this.fulfillableQuantity})`;
    }

    /**
     * 原本データを取得（デバッグ用）
     * @returns {Object} 原本データ
     */
    getRawData() {
        return this._rawData;
    }
}
