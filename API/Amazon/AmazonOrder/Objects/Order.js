/**
 * Amazon SP-API Order 注文全体を管理するクラス
 */
class Order {
    /**
     * コンストラクタ
     * @param {string} amazonOrderId - Amazon注文ID
     * @param {Array<Object>} orderItemsData - SP-APIから取得した注文アイテムデータの配列
     * @param {Object} orderInfo - 関連する注文情報（省略可）
     */
    constructor(orderData = {}) {
         // 基本的な注文情報
         this.amazonOrderId = orderData.AmazonOrderId || null;
         this.purchaseDate = orderData.PurchaseDate || null;
         this.lastUpdateDate = orderData.LastUpdateDate || null;
         this.orderStatus = orderData.OrderStatus || null;
         this.fulfillmentChannel = orderData.FulfillmentChannel || null;
         this.salesChannel = orderData.SalesChannel || null;
         
         // アイテム数情報
         this.numberOfItemsShipped = parseInt(orderData.NumberOfItemsShipped) || 0;
         this.numberOfItemsUnshipped = parseInt(orderData.NumberOfItemsUnshipped) || 0;
         
         // 支払い情報
         this.paymentMethod = orderData.PaymentMethod || null;
         this.paymentMethodDetails = orderData.PaymentMethodDetails || [];
         
         // マーケットプレイス情報
         this.marketplaceId = orderData.MarketplaceId || null;
         
         // 配送情報
         this.shipmentServiceLevelCategory = orderData.ShipmentServiceLevelCategory || null;
         this.shipmentServiceLevel = orderData.ShipmentServiceLevel || null;
         this.orderType = orderData.OrderType || null;
         this.earliestShipDate = orderData.EarliestShipDate || null;
         this.latestShipDate = orderData.LatestShipDate || null;
         
         // フラグ情報
         this.isBusinessOrder = orderData.IsBusinessOrder || false;
         this.isPrime = orderData.IsPrime || false;
         this.isAccessPointOrder = orderData.IsAccessPointOrder || false;
         this.isGlobalExpressEnabled = orderData.IsGlobalExpressEnabled || false;
         this.isPremiumOrder = orderData.IsPremiumOrder || false;
         this.isSoldByAB = orderData.IsSoldByAB || false;
         this.isIBA = orderData.IsIBA || false;
         
         // 配送先住所情報
         this.shippingAddress = {
             name: orderData.ShippingAddress?.Name || null,
             addressLine1: orderData.ShippingAddress?.AddressLine1 || null,
             addressLine2: orderData.ShippingAddress?.AddressLine2 || null,
             addressLine3: orderData.ShippingAddress?.AddressLine3 || null,
             city: orderData.ShippingAddress?.City || null,
             county: orderData.ShippingAddress?.County || null,
             district: orderData.ShippingAddress?.District || null,
             stateOrRegion: orderData.ShippingAddress?.StateOrRegion || null,
             municipality: orderData.ShippingAddress?.Municipality || null,
             postalCode: orderData.ShippingAddress?.PostalCode || null,
             countryCode: orderData.ShippingAddress?.CountryCode || null,
             phone: orderData.ShippingAddress?.Phone || null,
             addressType: orderData.ShippingAddress?.AddressType || null
         };
         
         // 購入者情報
         this.buyerInfo = {
             buyerEmail: orderData.BuyerInfo?.BuyerEmail || null,
             buyerName: orderData.BuyerInfo?.BuyerName || null,
             buyerCounty: orderData.BuyerInfo?.BuyerCounty || null,
             buyerTaxInfo: {
                 companyLegalName: orderData.BuyerInfo?.BuyerTaxInfo?.CompanyLegalName || null,
                 taxingRegion: orderData.BuyerInfo?.BuyerTaxInfo?.TaxingRegion || null,
                 taxClassifications: orderData.BuyerInfo?.BuyerTaxInfo?.TaxClassifications || []
             },
             purchaseOrderNumber: orderData.BuyerInfo?.PurchaseOrderNumber || null
         };
         
         // その他の情報（拡張用）
         this.defaultShipFromLocationAddress = orderData.DefaultShipFromLocationAddress || null;
         this.fulfillmentInstruction = orderData.FulfillmentInstruction || null;
         this.isISPU = orderData.IsISPU || false;
         this.isAccessPointOrder = orderData.IsAccessPointOrder || false;
         this.marketplaceTaxInfo = orderData.MarketplaceTaxInfo || null;
         this.sellerDisplayName = orderData.SellerDisplayName || null;
         
         // 注文アイテム（空で初期化）
         this.orderItems = [];
         
         // 追加の注文情報（後方互換性のため）
         this.orderInfo = orderData.OrderInfo || null;
         
                  // 原本データを保持（デバッグ用）
         this._rawData = orderData;

        // 作成日時を記録
        this.createdAt = new Date();
    }

    /**
     * SP-APIレスポンスからOrderインスタンスを作成する静的メソッド
     * @param {Object} response - SP-APIのレスポンス
     * @param {Object} orderInfo - 関連する注文情報（省略可）
     * @returns {Order} Orderインスタンス
     */
    static fromApiResponse(response, orderInfo = null) {
        const json = typeof response === 'string' ? JSON.parse(response) : response;
        
        const amazonOrderId = json.payload?.AmazonOrderId;
        const orderItemsData = json.payload?.OrderItems || [];
        
        // 基本的な注文データを作成
        const orderData = {
            AmazonOrderId: amazonOrderId,
            OrderInfo: orderInfo
        };
        
        const order = new Order(orderData);
        
        // 注文アイテムを追加
        if (Array.isArray(orderItemsData)) {
            orderItemsData.forEach(itemData => {
                const orderItem = new OrderItem(itemData);
                if (orderInfo) {
                    orderItem.setOrderInfo(orderInfo);
                }
                order.orderItems.push(orderItem);
            });
        }
        
        return order;
    }

         /**
      * 注文アイテムを追加する
      * @param {Array<OrderItem>} orderItems - 追加する注文アイテム
      */
     addOrderItem(orderItems) {
         this.orderItems.push(...orderItems);
     }

     /**
      * Amazon注文IDを取得する
      * @returns {string} Amazon注文ID
      */
     getAmazonOrderId() {
         return this.amazonOrderId;
     }

    /**
     * 注文メタデータからOrderインスタンスを作成する静的メソッド
     * @param {Object} orderData - getOrdersで取得した個別の注文データ
     * @returns {Order} Orderインスタンス
     */
    static fromOrderData(orderData) {
        if (!orderData || !orderData.AmazonOrderId) {
            throw new Error("有効な注文データが必要です（AmazonOrderIdが必須）");
        }

        // 注文メタデータからOrderインスタンスを作成
        return new Order(orderData);
    }

    /**
     * 日付別注文アイテム結果からOrderインスタンスを作成する静的メソッド
     * @param {Object} dateResult - getOrderItemsByDateの結果
     * @returns {Order} Orderインスタンス
     */
    static fromDateResult(dateResult) {
        // 日付別集約用の特別な注文データを作成
        const orderData = {
            AmazonOrderId: "BULK_" + dateResult.date
        };
        
        const order = new Order(orderData);
        
        // 個別の注文アイテムを追加
        if (dateResult.orderItems && Array.isArray(dateResult.orderItems)) {
            dateResult.orderItems.forEach(itemData => {
                const orderItem = new OrderItem(itemData);
                if (itemData.OrderInfo) {
                    orderItem.setOrderInfo(itemData.OrderInfo);
                }
                order.orderItems.push(orderItem);
            });
        }

        // メタデータを追加
        order.dateMetadata = {
            date: dateResult.date,
            ordersCount: dateResult.ordersCount,
            orderItemsCount: dateResult.orderItemsCount,
            summary: dateResult.summary
        };

        return order;
    }

    /**
     * 注文情報を設定する
     * @param {Object} orderInfo - 注文情報
     */
    setOrderInfo(orderInfo) {
        this.orderInfo = orderInfo;
        this.orderItems.forEach(item => {
            item.setOrderInfo(orderInfo);
        });
    }

    /**
     * OrderItemの配列を取得
     * @returns {Array<OrderItem>} OrderItemの配列
     */
    getItems() {
        return this.orderItems;
    }

    /**
     * 注文アイテム数を取得
     * @returns {number} 注文アイテム数
     */
    getCount() {
        return this.orderItems.length;
    }

    /**
     * 特定のSKUでOrderItemを検索
     * @param {string} sellerSKU - 検索するSKU
     * @returns {Array<OrderItem>} 該当するOrderItemの配列
     */
    findBySKU(sellerSKU) {
        return this.orderItems.filter(item => item.sellerSKU === sellerSKU);
    }

    /**
     * 特定のASINでOrderItemを検索
     * @param {string} asin - 検索するASIN
     * @returns {Array<OrderItem>} 該当するOrderItemの配列
     */
    findByASIN(asin) {
        return this.orderItems.filter(item => item.ASIN === asin);
    }

    /**
     * 条件に合致するOrderItemをフィルタリング
     * @param {Function} predicate - フィルタ条件の関数
     * @returns {Array<OrderItem>} フィルタされたOrderItemの配列
     */
    filter(predicate) {
        return this.orderItems.filter(predicate);
    }

    /**
     * 出荷済みアイテムを取得
     * @returns {Array<OrderItem>} 出荷済みアイテム
     */
    getShippedItems() {
        return this.filter(item => item.isShipped());
    }

    /**
     * 未出荷アイテムを取得
     * @returns {Array<OrderItem>} 未出荷アイテム
     */
    getUnshippedItems() {
        return this.filter(item => !item.isShipped());
    }

    /**
     * 完全出荷アイテムを取得
     * @returns {Array<OrderItem>} 完全出荷アイテム
     */
    getFullyShippedItems() {
        return this.filter(item => item.isFullyShipped());
    }

    /**
     * 部分出荷アイテムを取得
     * @returns {Array<OrderItem>} 部分出荷アイテム
     */
    getPartiallyShippedItems() {
        return this.filter(item => item.isPartiallyShipped());
    }

    /**
     * FBAアイテムを取得
     * @returns {Array<OrderItem>} FBAアイテム
     */
    getFBAItems() {
        return this.filter(item => item.isFBA());
    }

    /**
     * 自己配送アイテムを取得
     * @returns {Array<OrderItem>} 自己配送アイテム
     */
    getMFNItems() {
        return this.filter(item => item.isMFN());
    }

    /**
     * 総注文数量を計算
     * @returns {number} 総注文数量
     */
    getTotalQuantityOrdered() {
        return this.orderItems.reduce((sum, item) => sum + item.quantityOrdered, 0);
    }

    /**
     * 総出荷数量を計算
     * @returns {number} 総出荷数量
     */
    getTotalQuantityShipped() {
        return this.orderItems.reduce((sum, item) => sum + item.quantityShipped, 0);
    }

    /**
     * 総未出荷数量を計算
     * @returns {number} 総未出荷数量
     */
    getTotalQuantityUnshipped() {
        return this.orderItems.reduce((sum, item) => sum + item.getUnshippedQuantity(), 0);
    }

    /**
     * 総金額を計算（税込み）
     * @returns {number} 総金額
     */
    getTotalAmount() {
        return this.orderItems.reduce((sum, item) => sum + item.getTotalAmount(), 0);
    }

    /**
     * 税抜き総金額を計算
     * @returns {number} 税抜き総金額
     */
    getTotalAmountExcludingTax() {
        return this.orderItems.reduce((sum, item) => sum + item.getTotalAmountExcludingTax(), 0);
    }

    /**
     * 総税額を計算
     * @returns {number} 総税額
     */
    getTotalTaxAmount() {
        return this.orderItems.reduce((sum, item) => sum + item.getTotalTaxAmount(), 0);
    }

    /**
     * ユニークSKU数を取得
     * @returns {number} ユニークSKU数
     */
    getUniqueSKUCount() {
        const skuSet = new Set();
        this.orderItems.forEach(item => {
            if (item.sellerSKU) {
                skuSet.add(item.sellerSKU);
            }
        });
        return skuSet.size;
    }

    /**
     * SKU別数量サマリーを取得
     * @returns {Object} SKU別数量サマリー
     */
    getSKUSummary() {
        const skuSummary = {};
        this.orderItems.forEach(item => {
            if (item.sellerSKU) {
                if (!skuSummary[item.sellerSKU]) {
                    skuSummary[item.sellerSKU] = {
                        sellerSKU: item.sellerSKU,
                        ASIN: item.ASIN,
                        title: item.title,
                        quantityOrdered: 0,
                        quantityShipped: 0,
                        totalAmount: 0,
                        items: []
                    };
                }
                skuSummary[item.sellerSKU].quantityOrdered += item.quantityOrdered;
                skuSummary[item.sellerSKU].quantityShipped += item.quantityShipped;
                skuSummary[item.sellerSKU].totalAmount += item.getTotalAmount();
                skuSummary[item.sellerSKU].items.push(item);
            }
        });
        return skuSummary;
    }

    /**
     * 統計情報を取得
     * @returns {Object} 統計情報
     */
    getStatistics() {
        return {
            basicInfo: {
                amazonOrderId: this.amazonOrderId,
                itemsCount: this.getCount(),
                uniqueSKUCount: this.getUniqueSKUCount(),
                createdAt: this.createdAt
            },
            quantities: {
                totalOrdered: this.getTotalQuantityOrdered(),
                totalShipped: this.getTotalQuantityShipped(),
                totalUnshipped: this.getTotalQuantityUnshipped()
            },
            amounts: {
                totalAmountIncludingTax: this.getTotalAmount(),
                totalAmountExcludingTax: this.getTotalAmountExcludingTax(),
                totalTaxAmount: this.getTotalTaxAmount()
            },
            shippingStatus: {
                shippedItemsCount: this.getShippedItems().length,
                unshippedItemsCount: this.getUnshippedItems().length,
                fullyShippedItemsCount: this.getFullyShippedItems().length,
                partiallyShippedItemsCount: this.getPartiallyShippedItems().length
            },
            fulfillment: {
                fbaItemsCount: this.getFBAItems().length,
                mfnItemsCount: this.getMFNItems().length
            },
            orderInfo: this.orderInfo,
            dateMetadata: this.dateMetadata || null
        };
    }

    /**
     * CSV形式で全注文アイテムデータを出力
     * @returns {string} CSV形式のデータ
     */
    toCSV() {
        if (this.orderItems.length === 0) {
            return OrderItem.getCsvHeader();
        }

        const header = OrderItem.getCsvHeader();
        const rows = this.orderItems.map(item => item.toCsvRow());
        return [header, ...rows].join("\n");
    }

    /**
     * 注文アイテムをマップ処理
     * @param {Function} mapper - マップ処理の関数
     * @returns {Array} マップ処理された結果の配列
     */
    map(mapper) {
        return this.orderItems.map(mapper);
    }

    /**
     * 注文アイテムに対して処理を実行
     * @param {Function} callback - 各アイテムに対して実行する関数
     */
    forEach(callback) {
        this.orderItems.forEach(callback);
    }

    /**
     * JSON形式で出力
     * @returns {Object} JSON形式のデータ
     */
    toJson() {
        return {
            amazonOrderId: this.amazonOrderId,
            statistics: this.getStatistics(),
            items: this.orderItems.map(item => item.toJson())
        };
    }

    getAmazonOrderId(){
        return this.amazonOrderId;
    }

    /**
     * 文字列表現
     * @returns {string} 文字列表現
     */
    toString() {
        return `Order(注文ID: ${this.amazonOrderId}, アイテム数: ${this.getCount()}, 総額: ${this.getTotalAmount()})`;
    }
} 