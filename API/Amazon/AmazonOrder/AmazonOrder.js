/**
 * Amazon Order ライブラリ メインエクスポート
 * Amazon SP-API の Order および OrderItem 関連機能を提供
 */
const AmazonOrder = {
    /**
     * SP-APIレスポンスからOrderインスタンスを作成する
     * @param {Object} response - SP-APIのレスポンス
     * @param {Object} orderInfo - 関連する注文情報（省略可）
     * @returns {Order} Orderインスタンス
     */
    fromApiResponse: function(response, orderInfo = null) {
        return Order.fromApiResponse(response, orderInfo);
    },

    /**
     * 日付別注文アイテム結果からOrderインスタンスを作成する
     * @param {Object} dateResult - getOrderItemsByDateの結果
     * @returns {Order} Orderインスタンス
     */
    fromDateResult: function(dateResult) {
        return Order.fromDateResult(dateResult);
    },

    /**
     * 注文メタデータからOrderインスタンスを作成する
     * @param {Object} orderData - getOrdersで取得した個別の注文データ
     * @returns {Order} Orderインスタンス
     */
    fromOrderData: function(orderData) {
        return Order.fromOrderData(orderData);
    },

    /**
     * 注文データからOrderインスタンスを作成する（別名）
     * @param {Object} orderData - 注文データ
     * @returns {Order} Orderインスタンス
     */
    create: function(orderData) {
        return new Order(orderData);
    },

    /**
     * 新しいOrderインスタンスを作成する
     * @param {Object} orderData - 注文データ
     * @returns {Order} Orderインスタンス
     */
    createOrder: function(orderData) {
        return new Order(orderData);
    },

    /**
     * 新しいOrderItemインスタンスを作成する
     * @param {Object} orderItemData - SP-APIから取得した個別の注文アイテムデータ
     * @returns {OrderItem} OrderItemインスタンス
     */
    createOrderItem: function(orderItemData = {}) {
        return new OrderItem(orderItemData);
    },

    /**
     * 注文アイテムデータからOrderItemインスタンスを作成する（別名）
     * @param {Object} itemData - 注文アイテムデータ
     * @returns {OrderItem} OrderItemインスタンス
     */
    createItem: function(itemData) {
        return new OrderItem(itemData);
    },

    /**
     * OrderItemのCSVヘッダーを取得
     * @returns {string} CSVヘッダー
     */
    getCsvHeader: function() {
        return OrderItem.getCsvHeader();
    },

    /**
     * Order クラスの直接参照（上級者向け）
     */
    Order: Order,

    /**
     * OrderItem クラスの直接参照（上級者向け）
     */
    OrderItem: OrderItem,

    /**
     * ライブラリのバージョン情報
     */
    version: "1.0.0",

    /**
     * ライブラリの説明
     */
    description: "Amazon SP-API Order management library for Google Apps Script"
}; 