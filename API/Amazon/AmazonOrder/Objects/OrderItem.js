/**
 * Amazon SP-API Order Item 個別注文アイテムを表現するクラス
 */
class OrderItem {
    /**
     * コンストラクタ
     * @param {Object} orderItemData - SP-APIから取得した個別の注文アイテムデータ
     */
    constructor(orderItemData = {}) {
        // 基本情報
        this.ASIN = orderItemData.ASIN || null;
        this.sellerSKU = orderItemData.SellerSKU || null;
        this.orderItemId = orderItemData.OrderItemId || null;
        this.title = orderItemData.Title || null;
        this.quantityOrdered = parseInt(orderItemData.QuantityOrdered) || 0;
        this.quantityShipped = parseInt(orderItemData.QuantityShipped) || 0;
        
        // 商品情報
        this.productInfo = {
            numberOfItems: orderItemData.ProductInfo?.NumberOfItems || null
        };
        
        // ポイント情報
        this.pointsGranted = {
            pointsNumber: orderItemData.PointsGranted?.PointsNumber || 0,
            pointsMonetaryValue: {
                currencyCode: orderItemData.PointsGranted?.PointsMonetaryValue?.CurrencyCode || null,
                amount: parseFloat(orderItemData.PointsGranted?.PointsMonetaryValue?.Amount) || 0
            }
        };
        
        // 価格情報
        this.itemPrice = {
            currencyCode: orderItemData.ItemPrice?.CurrencyCode || null,
            amount: parseFloat(orderItemData.ItemPrice?.Amount) || 0
        };
        
        this.shippingPrice = {
            currencyCode: orderItemData.ShippingPrice?.CurrencyCode || null,
            amount: parseFloat(orderItemData.ShippingPrice?.Amount) || 0
        };
        
        this.giftWrapPrice = {
            currencyCode: orderItemData.GiftWrapPrice?.CurrencyCode || null,
            amount: parseFloat(orderItemData.GiftWrapPrice?.Amount) || 0
        };
        
        // 税金情報
        this.itemTax = {
            currencyCode: orderItemData.ItemTax?.CurrencyCode || null,
            amount: parseFloat(orderItemData.ItemTax?.Amount) || 0
        };
        
        this.shippingTax = {
            currencyCode: orderItemData.ShippingTax?.CurrencyCode || null,
            amount: parseFloat(orderItemData.ShippingTax?.Amount) || 0
        };
        
        this.giftWrapTax = {
            currencyCode: orderItemData.GiftWrapTax?.CurrencyCode || null,
            amount: parseFloat(orderItemData.GiftWrapTax?.Amount) || 0
        };
        
        // 割引情報
        this.shippingDiscount = {
            currencyCode: orderItemData.ShippingDiscount?.CurrencyCode || null,
            amount: parseFloat(orderItemData.ShippingDiscount?.Amount) || 0
        };
        
        this.promotionDiscount = {
            currencyCode: orderItemData.PromotionDiscount?.CurrencyCode || null,
            amount: parseFloat(orderItemData.PromotionDiscount?.Amount) || 0
        };
        
        this.promotionDiscountTax = {
            currencyCode: orderItemData.PromotionDiscountTax?.CurrencyCode || null,
            amount: parseFloat(orderItemData.PromotionDiscountTax?.Amount) || 0
        };
        
        // 商品状態情報
        this.conditionNote = orderItemData.ConditionNote || null;
        this.conditionId = orderItemData.ConditionId || null;
        this.conditionSubtypeId = orderItemData.ConditionSubtypeId || null;
        
        // 配送情報
        this.scheduledDeliveryStartDate = orderItemData.ScheduledDeliveryStartDate || null;
        this.scheduledDeliveryEndDate = orderItemData.ScheduledDeliveryEndDate || null;
        this.priceDesignation = orderItemData.PriceDesignation || null;
        
        // 税金徴収情報
        this.taxCollection = {
            model: orderItemData.TaxCollection?.Model || null,
            responsibleParty: orderItemData.TaxCollection?.ResponsibleParty || null
        };
        
        // その他の属性
        this.serialNumberRequired = orderItemData.SerialNumberRequired || false;
        this.isTransparency = orderItemData.IsTransparency || false;
        this.iossNumber = orderItemData.IossNumber || null;
        this.storeChainStoreId = orderItemData.StoreChainStoreId || null;
        this.deemedResellerCategory = orderItemData.DeemedResellerCategory || null;
        
        // 関連する注文情報（後から追加される場合）
        this.orderInfo = null;
        
        // 原本データを保持（デバッグ用）
        this._rawData = orderItemData;
    }

    /**
     * 注文情報を設定する
     * @param {Object} orderInfo - 関連する注文情報
     */
    setOrderInfo(orderInfo) {
        this.orderInfo = {
            amazonOrderId: orderInfo.AmazonOrderId || null,
            purchaseDate: orderInfo.PurchaseDate || null,
            orderStatus: orderInfo.OrderStatus || null,
            salesChannel: orderInfo.SalesChannel || null,
            fulfillmentChannel: orderInfo.FulfillmentChannel || null,
            shipServiceLevel: orderInfo.ShipServiceLevel || null,
            marketplaceId: orderInfo.MarketplaceId || null,
            paymentMethod: orderInfo.PaymentMethod || null
        };
    }

    /**
     * アイテムの総金額を計算する（税込み）
     * @returns {number} 総金額
     */
    getTotalAmount() {
        return this.itemPrice.amount + this.shippingPrice.amount + this.giftWrapPrice.amount + 
               this.itemTax.amount + this.shippingTax.amount + this.giftWrapTax.amount -
               this.shippingDiscount.amount - this.promotionDiscount.amount;
    }

    /**
     * 税抜き総金額を計算する
     * @returns {number} 税抜き総金額
     */
    getTotalAmountExcludingTax() {
        return this.itemPrice.amount + this.shippingPrice.amount + this.giftWrapPrice.amount -
               this.shippingDiscount.amount - this.promotionDiscount.amount;
    }

    /**
     * 総税額を計算する
     * @returns {number} 総税額
     */
    getTotalTaxAmount() {
        return this.itemTax.amount + this.shippingTax.amount + this.giftWrapTax.amount - 
               this.promotionDiscountTax.amount;
    }

    /**
     * 出荷済みかどうかをチェック
     * @returns {boolean} 出荷済みかどうか
     */
    isShipped() {
        return this.quantityShipped > 0;
    }

    /**
     * 完全出荷かどうかをチェック
     * @returns {boolean} 完全出荷かどうか
     */
    isFullyShipped() {
        return this.quantityShipped >= this.quantityOrdered;
    }

    /**
     * 部分出荷かどうかをチェック
     * @returns {boolean} 部分出荷かどうか
     */
    isPartiallyShipped() {
        return this.quantityShipped > 0 && this.quantityShipped < this.quantityOrdered;
    }

    /**
     * 未出荷数量を取得
     * @returns {number} 未出荷数量
     */
    getUnshippedQuantity() {
        return Math.max(0, this.quantityOrdered - this.quantityShipped);
    }

    /**
     * FBA商品かどうかをチェック
     * @returns {boolean} FBA商品かどうか
     */
    isFBA() {
        return this.orderInfo?.fulfillmentChannel === "AFN";
    }

    /**
     * 自己配送商品かどうかをチェック
     * @returns {boolean} 自己配送商品かどうか
     */
    isMFN() {
        return this.orderInfo?.fulfillmentChannel === "MFN";
    }

    /**
     * 詳細情報を取得
     * @returns {Object} 詳細情報
     */
    getDetails() {
        return {
            basicInfo: {
                ASIN: this.ASIN,
                sellerSKU: this.sellerSKU,
                orderItemId: this.orderItemId,
                title: this.title
            },
            quantities: {
                ordered: this.quantityOrdered,
                shipped: this.quantityShipped,
                unshipped: this.getUnshippedQuantity()
            },
            amounts: {
                itemPrice: this.itemPrice,
                shippingPrice: this.shippingPrice,
                giftWrapPrice: this.giftWrapPrice,
                totalAmountIncludingTax: this.getTotalAmount(),
                totalAmountExcludingTax: this.getTotalAmountExcludingTax(),
                totalTaxAmount: this.getTotalTaxAmount()
            },
            taxes: {
                itemTax: this.itemTax,
                shippingTax: this.shippingTax,
                giftWrapTax: this.giftWrapTax,
                promotionDiscountTax: this.promotionDiscountTax
            },
            discounts: {
                shippingDiscount: this.shippingDiscount,
                promotionDiscount: this.promotionDiscount
            },
            condition: {
                id: this.conditionId,
                subtypeId: this.conditionSubtypeId,
                note: this.conditionNote
            },
            delivery: {
                scheduledStartDate: this.scheduledDeliveryStartDate,
                scheduledEndDate: this.scheduledDeliveryEndDate,
                priceDesignation: this.priceDesignation
            },
            flags: {
                isShipped: this.isShipped(),
                isFullyShipped: this.isFullyShipped(),
                isPartiallyShipped: this.isPartiallyShipped(),
                isFBA: this.isFBA(),
                isMFN: this.isMFN(),
                serialNumberRequired: this.serialNumberRequired,
                isTransparency: this.isTransparency
            },
            orderInfo: this.orderInfo
        };
    }

    /**
     * CSV行として出力
     * @returns {string} CSV行
     */
    toCsvRow() {
        return [
            this.orderInfo?.amazonOrderId || "",
            this.orderInfo?.purchaseDate || "",
            this.ASIN || "",
            this.sellerSKU || "",
            this.orderItemId || "",
            this.title || "",
            this.quantityOrdered,
            this.quantityShipped,
            this.getUnshippedQuantity(),
            this.itemPrice.amount,
            this.shippingPrice.amount,
            this.itemTax.amount,
            this.shippingTax.amount,
            this.promotionDiscount.amount,
            this.getTotalAmount(),
            this.conditionId || "",
            this.orderInfo?.fulfillmentChannel || "",
            this.orderInfo?.orderStatus || "",
            this.isFullyShipped() ? "完全出荷" : this.isPartiallyShipped() ? "部分出荷" : "未出荷"
        ].join(",");
    }

    /**
     * CSVヘッダーを取得する静的メソッド
     * @returns {string} CSVヘッダー
     */
    static getCsvHeader() {
        return [
            "注文ID",
            "注文日",
            "ASIN",
            "SKU",
            "注文アイテムID",
            "商品名",
            "注文数量",
            "出荷数量",
            "未出荷数量",
            "商品価格",
            "配送料",
            "商品税",
            "配送税",
            "プロモーション割引",
            "総額",
            "商品状態",
            "フルフィルメント",
            "注文ステータス",
            "出荷状況"
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
        return `OrderItem(SKU: ${this.sellerSKU}, 数量: ${this.quantityOrdered}, 金額: ${this.getTotalAmount()})`;
    }

    /**
     * 原本データを取得（デバッグ用）
     * @returns {Object} 原本データ
     */
    getRawData() {
        return this._rawData;
    }
} 