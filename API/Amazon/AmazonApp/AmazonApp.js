class AmazonApp {
    constructor(refreshToken, clientId, clientSecret, country, appName, appVersion, language) {
        // 引数が undefined, null, 空文字のいずれかならエラーを投げる
        if (
            !refreshToken ||
            !clientId ||
            !clientSecret ||
            !country ||
            !appName ||
            !appVersion ||
            !language
        ) {
            throw new Error("全ての引数（refreshToken, clientId, clientSecret, country, appName, appVersion, language）を空でなく指定してください。");
        }
        this.refreshToken = refreshToken;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        if(country === "JP"){
            this.marketplaceId = "A1VC38T7YXB528";
        }
        this.appName = appName;
        this.appVersion = appVersion;
        this.language = language;
        this.baseUrl = "https://sellingpartnerapi-fe.amazon.com";
    }

    /**
     * リクエストヘッダーを作成する
     * @private
     */
    createRequestHeaders(){
        if(this.accessToken && this.accessToken !== ""){
            return {
                "x-amz-access-token": this.accessToken,
                "x-amz-date": Utilities.formatDate(new Date(), "UTC", "yyyyMMdd'T'HHmmss'Z'"),
                "user-agent": `${this.appName}/${this.appVersion} (Language=${this.language})`
            };
        }
        const url = "https://api.amazon.com/auth/o2/token";
        const payload = {
            grant_type: "refresh_token",
            refresh_token: this.refreshToken,
            client_id: this.clientId,
            client_secret: this.clientSecret
        };
    
        const formEncoded = Object.entries(payload)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join("&");
    
        const options = {
            method: "post",
            contentType: "application/x-www-form-urlencoded",
            payload: formEncoded,
            muteHttpExceptions: true
        };
    
        const response = UrlFetchApp.fetch(url, options);
        const data = JSON.parse(response.getContentText());
    
        if (!data.access_token) {
            throw new Error("アクセストークンの取得に失敗しました: " + response.getContentText());
        }
    
        this.accessToken = data.access_token;

        return {
            "x-amz-access-token": this.accessToken,
            "x-amz-date": Utilities.formatDate(new Date(), "UTC", "yyyyMMdd'T'HHmmss'Z'"),
            "user-agent": `${this.appName}/${this.appVersion} (Language=${this.language})`
          };
          
    }

    /**
     * 在庫を取得（FBA）- ページネーション対応
     * @returns {InventorySummaries} InventorySummariesインスタンス
     */
    getInventorySummaries() {
        const headers = this.createRequestHeaders(); // トークン取得

        const endpoint = "/fba/inventory/v1/summaries";
        let url = `${this.baseUrl}${endpoint}?granularityType=Marketplace&granularityId=${this.marketplaceId}&marketplaceIds=${this.marketplaceId}&details=true`;

        const options = {
            method: "get",
            headers: headers,
            muteHttpExceptions: true
        };
        
        // 最初のページを取得してInventorySummariesインスタンスを作成
        const response = UrlFetchApp.fetch(url, options);
        const inventorySummaries = AmazonInventory.create(response);
        
        // 次ページがある限り取得を続ける
        while (inventorySummaries.hasNextToken()) {
            const nextToken = inventorySummaries.getNextToken();
            const nextUrl = `${url}&nextToken=${encodeURIComponent(nextToken)}`;
            
            const nextResponse = UrlFetchApp.fetch(nextUrl, options);
            inventorySummaries.addNextPageResponse(nextResponse);
        }
        
        return inventorySummaries;
    }

    /**
     * 在庫を取得（FBA）- 従来の互換性のため
     * @deprecated getInventorySummaries()を使用してください
     */
    getInventories() {
        const headers = this.createRequestHeaders(); // トークン取得

        const endpoint = "/fba/inventory/v1/summaries";
        const url = `${this.baseUrl}${endpoint}?granularityType=Marketplace&granularityId=${this.marketplaceId}&marketplaceIds=${this.marketplaceId}&details=true`;

        const options = {
            method: "get",
            headers: headers,
            muteHttpExceptions: true
        };
        const response = UrlFetchApp.fetch(url, options);
        const json = JSON.parse(response.getContentText());
        return json;
    }



    /**
     * レート制限対応のスリープ処理
     * @private
     * @param {number} seconds - スリープ時間（秒）
     */
    sleep(seconds) {
        Utilities.sleep(seconds * 1000);
    }

    /**
     * 注文を取得する（ページネーション・レート制限対応）
     * @param {Object} options - 検索オプション
     * @param {string} options.createdAfter - 注文作成日時の開始（ISO8601形式）例: "2023-01-01T00:00:00Z"
     * @param {string} options.createdBefore - 注文作成日時の終了（ISO8601形式）例: "2023-12-31T23:59:59Z"
     * @param {string} options.lastUpdatedAfter - 最終更新日時の開始（ISO8601形式）
     * @param {string} options.lastUpdatedBefore - 最終更新日時の終了（ISO8601形式）
     * @param {Array<string>} options.orderStatuses - 注文ステータスの配列 例: ["Unshipped", "PartiallyShipped", "Shipped"]
     * @param {Array<string>} options.fulfillmentChannels - フルフィルメントチャンネル 例: ["MFN", "AFN"]
     * @param {number} options.maxResultsPerPage - 1ページあたりの最大結果数（デフォルト: 50, 最大: 100）
     * @returns {Array<Object>} 注文の配列
     */
    getOrders(options = {}) {
        const headers = this.createRequestHeaders();
        
        // デフォルト値の設定
        const {
            createdAfter,
            createdBefore,
            lastUpdatedAfter,
            lastUpdatedBefore,
            orderStatuses = [],
            fulfillmentChannels = [],
            maxResultsPerPage = 50
        } = options;

        // 必須パラメータのチェック
        if (!createdAfter && !lastUpdatedAfter) {
            throw new Error("createdAfterまたはlastUpdatedAfterのいずれかが必要です");
        }

        // 日付パラメータのバリデーション
        const currentDate = new Date();
        const twoMinutesAgo = new Date(currentDate.getTime() - 2 * 60 * 1000);

        // createdAfter/createdBefore のチェック
        if (createdAfter) {
            const createdAfterDate = new Date(createdAfter);
            if (createdAfterDate > currentDate) {
                throw new Error(`createdAfter（${createdAfter}）に未来の日時は指定できません`);
            }
        }

        if (createdBefore) {
            const createdBeforeDate = new Date(createdBefore);
            if (createdBeforeDate > twoMinutesAgo) {
                const recommendedDate = new Date(twoMinutesAgo.getTime() - 24 * 60 * 60 * 1000);
                throw new Error(
                    `createdBefore（${createdBefore}）は現在時刻に近すぎます。` +
                    `Amazon SP-APIでは現在時刻から少なくとも2分前までのデータしか取得できません。` +
                    `${recommendedDate.toISOString()} 以前の日時を指定してください。`
                );
            }
        }

        // lastUpdatedAfter/lastUpdatedBefore のチェック
        if (lastUpdatedAfter) {
            const lastUpdatedAfterDate = new Date(lastUpdatedAfter);
            if (lastUpdatedAfterDate > currentDate) {
                throw new Error(`lastUpdatedAfter（${lastUpdatedAfter}）に未来の日時は指定できません`);
            }
        }

        if (lastUpdatedBefore) {
            const lastUpdatedBeforeDate = new Date(lastUpdatedBefore);
            if (lastUpdatedBeforeDate > twoMinutesAgo) {
                const recommendedDate = new Date(twoMinutesAgo.getTime() - 24 * 60 * 60 * 1000);
                throw new Error(
                    `lastUpdatedBefore（${lastUpdatedBefore}）は現在時刻に近すぎます。` +
                    `Amazon SP-APIでは現在時刻から少なくとも2分前までのデータしか取得できません。` +
                    `${recommendedDate.toISOString()} 以前の日時を指定してください。`
                );
            }
        }

        const endpoint = "/orders/v0/orders";
        
        // クエリパラメータの構築
        const queryParams = [];
        queryParams.push(`MarketplaceIds=${this.marketplaceId}`);
        
        if (createdAfter) queryParams.push(`CreatedAfter=${encodeURIComponent(createdAfter)}`);
        if (createdBefore) queryParams.push(`CreatedBefore=${encodeURIComponent(createdBefore)}`);
        if (lastUpdatedAfter) queryParams.push(`LastUpdatedAfter=${encodeURIComponent(lastUpdatedAfter)}`);
        if (lastUpdatedBefore) queryParams.push(`LastUpdatedBefore=${encodeURIComponent(lastUpdatedBefore)}`);
        if (orderStatuses.length > 0) queryParams.push(`OrderStatuses=${orderStatuses.join(',')}`);
        if (fulfillmentChannels.length > 0) queryParams.push(`FulfillmentChannels=${fulfillmentChannels.join(',')}`);
        queryParams.push(`MaxResultsPerPage=${maxResultsPerPage}`);

        let url = `${this.baseUrl}${endpoint}?${queryParams.join('&')}`;
        
        const requestOptions = {
            method: "get",
            headers: headers,
            muteHttpExceptions: true
        };

        const allOrders = [];
        let nextToken = null;
        let pageCount = 0;

        do {
            // レート制限対応: Orders APIは0.5 requests/second
            if (pageCount > 0) {
                console.log(`注文取得 - ページ ${pageCount + 1} の前にスリープします...`);
                this.sleep(2.1); // 2.1秒待機（0.5 requests/secondを遵守）
            }

            let currentUrl = url;
            if (nextToken) {
                currentUrl += `&NextToken=${encodeURIComponent(nextToken)}`;
            }

            console.log(`注文取得中... ページ ${pageCount + 1}`);
            const response = UrlFetchApp.fetch(currentUrl, requestOptions);
            const json = JSON.parse(response.getContentText());

            if (response.getResponseCode() !== 200) {
                console.error("注文取得エラー:", json);
                throw new Error(`注文取得に失敗しました: ${response.getResponseCode()} - ${response.getContentText()}`);
            }

            if (json.payload && json.payload.Orders) {
                json.payload.Orders.forEach(order => {
                    const orderInstance = AmazonOrder.create(order);
                    allOrders.push(orderInstance);
                });
                console.log(`ページ ${pageCount + 1}: ${json.payload.Orders.length}件の注文を取得`);
            }

            nextToken = json.payload && json.payload.NextToken ? json.payload.NextToken : null;
            pageCount++;

        } while (nextToken);

        console.log(`注文取得完了: 総${allOrders.length}件, ${pageCount}ページ`);
        return allOrders;
    }

    /**
     * 特定の注文の注文アイテムを取得する（レート制限対応）
     * @param {string} orderId - 注文ID
     * @param {string} nextToken - 次ページのトークン（省略可）
     * @returns {Object} 注文アイテムのレスポンス
     */
    getOrderItems(orderId, nextToken = null) {
        if (!orderId) {
            throw new Error("orderIdが必要です");
        }

        const headers = this.createRequestHeaders();
        const endpoint = `/orders/v0/orders/${orderId}/orderItems`;
        
        let url = `${this.baseUrl}${endpoint}`;
        if (nextToken) {
            url += `?NextToken=${encodeURIComponent(nextToken)}`;
        }

        const options = {
            method: "get",
            headers: headers,
            muteHttpExceptions: true
        };

        // レート制限対応: OrderItems APIは0.5 requests/second
        this.sleep(2.1); // 2.1秒待機

        console.log(`注文アイテム取得中... OrderID: ${orderId}`);
        const response = UrlFetchApp.fetch(url, options);
        const json = JSON.parse(response.getContentText());

        if (response.getResponseCode() !== 200) {
            console.error("注文アイテム取得エラー:", json);
            throw new Error(`注文アイテム取得に失敗しました: ${response.getResponseCode()} - ${response.getContentText()}`);
        }

        // Order インスタンスとして返却
        return AmazonOrder.createItem(json);
    }

    /**
     * 特定の注文の全注文アイテムを取得する（ページネーション・レート制限対応）
     * @param {string} orderId - 注文ID
     * @returns {Order} Order インスタンス
     */
    getAllOrderItems(orderId) {
        if (!orderId) {
            throw new Error("orderIdが必要です");
        }

        const allOrderItems = [];
        let nextToken = null;
        let pageCount = 0;

        do {
            // 最初のページ以外はスリープ（最初のページは上位メソッドでスリープ済み）
            if (pageCount > 0) {
                console.log(`注文アイテム取得 - ページ ${pageCount + 1} の前にスリープします...`);
                this.sleep(2.1); // 2.1秒待機
            }

            // 生のJSONレスポンスを取得（Orderインスタンス化前）
            const headers = this.createRequestHeaders();
            const endpoint = `/orders/v0/orders/${orderId}/orderItems`;
            
            let url = `${this.baseUrl}${endpoint}`;
            if (nextToken) {
                url += `?NextToken=${encodeURIComponent(nextToken)}`;
            }

            const options = {
                method: "get",
                headers: headers,
                muteHttpExceptions: true
            };

            this.sleep(2.1); // レート制限対応
            const response = UrlFetchApp.fetch(url, options);
            const json = JSON.parse(response.getContentText());

            if (response.getResponseCode() !== 200) {
                console.error("注文アイテム取得エラー:", json);
                throw new Error(`注文アイテム取得に失敗しました: ${response.getResponseCode()} - ${response.getContentText()}`);
            }
            
            if (json.payload && json.payload.OrderItems) {
                json.payload.OrderItems.forEach(item => {
                    allOrderItems.push(AmazonOrder.createItem(item));
                });
                console.log(`OrderID ${orderId} - ページ ${pageCount + 1}: ${json.payload.OrderItems.length}件のアイテムを取得`);
            }

            nextToken = json.pagination && json.pagination.NextToken ? json.pagination.NextToken : null;
            pageCount++;

        } while (nextToken);

        console.log(`OrderID ${orderId} - 注文アイテム取得完了: 総${allOrderItems.length}件, ${pageCount}ページ`);
        
        // 統合されたデータでOrderインスタンスを作成
        return allOrderItems;
    }

    /**
     * 複数の注文の注文アイテムを一括取得する（レート制限対応）
     * @param {Array<string>} orderIds - 注文IDの配列
     * @param {Function} progressCallback - 進捗コールバック関数（省略可）
     * @returns {Object} 注文IDをキーとしたOrderインスタンスのマップ
     */
    getBulkOrderItems(orderIds, progressCallback = null) {
        if (!Array.isArray(orderIds) || orderIds.length === 0) {
            throw new Error("orderIdsが必要です（配列）");
        }

        const ordersMap = {};
        const totalOrders = orderIds.length;

        console.log(`${totalOrders}件の注文アイテムを取得開始...`);

        for (let i = 0; i < orderIds.length; i++) {
            const orderId = orderIds[i];
            
            try {
                if (progressCallback) {
                    progressCallback(i + 1, totalOrders, orderId);
                }

                console.log(`進捗: ${i + 1}/${totalOrders} - OrderID: ${orderId}`);
                
                const order = this.getAllOrderItems(orderId);
                ordersMap[orderId] = order;
                
            } catch (error) {
                console.error(`OrderID ${orderId} の注文アイテム取得でエラー:`, error);
                ordersMap[orderId] = {
                    error: error.message,
                    amazonOrderId: orderId,
                    orderItems: []
                };
            }
        }

        console.log(`注文アイテム一括取得完了: ${totalOrders}件の注文を処理`);
        return ordersMap;
    }

    /**
     * 特定の日付の注文アイテムを全て取得する（レート制限対応）
     * @param {string} date - 取得したい日付（YYYY-MM-DD形式）例: "2023-12-01"
     * @param {Object} options - 追加オプション
     * @param {Array<string>} options.orderStatuses - 注文ステータスフィルタ（省略可）
     * @param {Array<string>} options.fulfillmentChannels - フルフィルメントチャンネルフィルタ（省略可）
     * @param {Function} options.progressCallback - 進捗コールバック関数（省略可）
     * @returns {Object} 日付の注文アイテム情報
     */
    getOrderItemsByDate(date, options = {}) {
        if (!date) {
            throw new Error("日付が必要です（YYYY-MM-DD形式）");
        }

        // 日付の妥当性チェック
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            throw new Error("日付はYYYY-MM-DD形式で指定してください（例: 2023-12-01）");
        }

        // 日付の範囲チェック
        const inputDate = new Date(date + 'T00:00:00Z');
        const currentDate = new Date();
        
        // 未来の日付チェック
        if (inputDate > currentDate) {
            throw new Error(`未来の日付（${date}）は指定できません。現在日時以前の日付を指定してください。`);
        }

        // Amazon SP-APIの制限：現在時刻から2分前までのデータのみ取得可能
        const twoMinutesAgo = new Date(currentDate.getTime() - 2 * 60 * 1000);
        const requestEndDateTime = new Date(date + 'T23:59:59Z');
        
        if (requestEndDateTime > twoMinutesAgo) {
            const recommendedDate = new Date(twoMinutesAgo.getTime() - 24 * 60 * 60 * 1000); // 1日前を推奨
            const recommendedDateStr = recommendedDate.toISOString().split('T')[0];
            throw new Error(
                `指定された日付（${date}）は現在時刻に近すぎます。` +
                `Amazon SP-APIでは現在時刻から少なくとも2分前までのデータしか取得できません。` +
                `${recommendedDateStr} 以前の日付を指定してください。`
            );
        }

        const {
            orderStatuses = ["Unshipped", "PartiallyShipped", "Shipped", "Canceled", "Unfulfillable"],
            fulfillmentChannels = [],
            progressCallback = null
        } = options;

        // ISO8601形式の日時範囲を作成
        const startDateTime = `${date}T00:00:00Z`;
        const endDateTime = `${date}T23:59:59Z`;

        console.log(`=== ${date} の注文アイテム取得開始 ===`);
        console.log(`検索範囲: ${startDateTime} ～ ${endDateTime}`);

        // 1. 指定日の注文を取得
        console.log("📋 ステップ1: 注文データを取得中...");
        const orders = this.getOrders({
            createdAfter: startDateTime,
            createdBefore: endDateTime,
            orderStatuses: orderStatuses,
            fulfillmentChannels: fulfillmentChannels,
            maxResultsPerPage: 100
        });

        console.log(`✅ ${orders.length}件の注文を取得しました`);

        if (orders.length === 0) {
            console.log(`${date} には注文がありませんでした`);
            return null;
        }

        // 2. 注文アイテムを取得
        const result = [];
        orders.forEach(order => {
            console.log(order);
            const orderId = order.getAmazonOrderId();
            console.log(orderId);
            const orderItems = this.getAllOrderItems(orderId);
            console.log(`${orderId}の注文アイテムを取得しました${JSON.stringify(orderItems)}`);
            orderItems.forEach(item => item.setOrderInfo(order));
            result.push(...orderItems);
        });

        return result;
    }

    /**
     * 複数日の注文アイテムを一括取得する（レート制限対応）
     * @param {Array<string>} dates - 日付の配列（YYYY-MM-DD形式）
     * @param {Object} options - 追加オプション
     * @param {Array<string>} options.orderStatuses - 注文ステータスフィルタ（省略可）
     * @param {Array<string>} options.fulfillmentChannels - フルフィルメントチャンネルフィルタ（省略可）
     * @param {Function} options.progressCallback - 進捗コールバック関数（省略可）
     * @returns {Object} 日付をキーとした注文アイテム情報のマップ
     */
    getBulkOrderItemsByDates(dates, options = {}) {
        if (!Array.isArray(dates) || dates.length === 0) {
            throw new Error("日付の配列が必要です");
        }

        const {
            orderStatuses,
            fulfillmentChannels,
            progressCallback = null
        } = options;

        const results = {};
        const totalDates = dates.length;

        console.log(`📅 ${totalDates}日分の注文アイテムを取得開始...`);

        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            
            try {
                if (progressCallback) {
                    progressCallback(`日付進捗: ${i + 1}/${totalDates}`, date);
                }

                console.log(`\n📅 処理中の日付: ${date} (${i + 1}/${totalDates})`);
                
                const result = this.getOrderItemsByDate(date, {
                    orderStatuses,
                    fulfillmentChannels
                });
                
                results[date] = result;
                
            } catch (error) {
                console.error(`❌ ${date} の処理でエラー:`, error);
                results[date] = {
                    date: date,
                    error: error.message,
                    ordersCount: 0,
                    orderItemsCount: 0,
                    orders: [],
                    orderItems: []
                };
            }
        }

        // 全体サマリーを作成
        const overallSummary = {
            totalDates: totalDates,
            successfulDates: Object.values(results).filter(r => !r.error).length,
            totalOrders: Object.values(results).reduce((sum, r) => sum + (r.ordersCount || 0), 0),
            totalOrderItems: Object.values(results).reduce((sum, r) => sum + (r.orderItemsCount || 0), 0),
            totalQuantity: Object.values(results).reduce((sum, r) => sum + (r.summary?.totalQuantity || 0), 0)
        };

        console.log(`\n🎉 複数日処理完了`);
        console.log(`📊 全体サマリー:`);
        console.log(`   - 処理日数: ${overallSummary.totalDates}日`);
        console.log(`   - 成功日数: ${overallSummary.successfulDates}日`);
        console.log(`   - 総注文数: ${overallSummary.totalOrders}件`);
        console.log(`   - 総注文アイテム数: ${overallSummary.totalOrderItems}件`);
        console.log(`   - 総数量: ${overallSummary.totalQuantity}個`);

        return {
            results: results,
            summary: overallSummary
        };
    }

    /**
     * 販売パートナーのセラーIDを取得する
     * @returns {string} セラーID
     */
    getSellerId(){
        const headers = this.createRequestHeaders();
        const endpoint = "/sellers/v1/marketplaceParticipations";
        const url = `${this.baseUrl}${endpoint}`;
        const options = {
            method: "get",
            headers: headers,
            muteHttpExceptions: true
        };

        console.log("セラーID取得中...");
        const response = UrlFetchApp.fetch(url, options);
        const json = JSON.parse(response.getContentText());
        console.log(JSON.stringify(json));

        if (response.getResponseCode() !== 200) {
            console.error("セラーID取得エラー:", json);
            throw new Error(`セラーID取得に失敗しました: ${response.getResponseCode()} - ${response.getContentText()}`);
        }

        // 最初のマーケットプレイス参加情報からセラーIDを取得
        if (json.payload && json.payload.length > 0) {
            const sellerId = json.payload[0].marketplace.countryCode === this.country ? 
                json.payload[0].marketplace.id : 
                json.payload.find(p => p.marketplace.countryCode === this.country)?.marketplace?.id;
                
            if (!sellerId) {
                // セラーIDが見つからない場合は最初の参加情報を使用
                return json.payload[0].marketplace.id;
            }
            return sellerId;
        }

        throw new Error("セラーIDが取得できませんでした");
    }

    /**
     * 全ての出品SKUを取得する（searchListingsItems API使用）
     * @param {string} sellerId - セラーID
     * @param {Object} options - 追加オプション
     * @param {number} options.pageSize - 1回のリクエストで取得する最大件数（デフォルト: 20）
     * @param {"BUYABLE" | "DISCOVERABLE"} options.withStatus - ステータスを含めるかどうか（デフォルト: なし)
     * @param {Array<string>} options.includedData - 含めるデータタイプ（デフォルト: ["summaries"]）
     * @param {string} options.status - リスティングのステータスフィルタ（デフォルト: "ACTIVE"）
     * @returns {Array<string>} SKUの配列
     */
    getSkuList(sellerId, options = {}){
        const {
            pageSize = 20,
            includedData = ["summaries"],
            status = "ACTIVE",
        } = options;

        console.log(`セラーID: ${sellerId} の出品リストを取得開始...`);

        const headers = this.createRequestHeaders();
        const endpoint = `/listings/2021-08-01/items/${sellerId}`;
        // クエリパラメータの構築
        const queryParams = [];

        if (options.withStatus) {
            queryParams.push(`withStatus=${withStatus}`);
        }
        queryParams.push(`pageSize=${pageSize}`);
        queryParams.push(`marketplaceIds=${this.marketplaceId}`);
        if (includedData.length > 0) {
            queryParams.push(`includedData=${includedData.join(',')}`);
        }
        if (status) {
            queryParams.push(`status=${status}`);
        }

        let baseUrl = `${this.baseUrl}${endpoint}?${queryParams.join('&')}`;
        
        const options_request = {
            method: "get",
            headers: headers,
            muteHttpExceptions: true
        };

        const allSkus = [];
        let nextToken = null;
        let pageCount = 0;

        do {
            // レート制限対応: Listings Items APIは5 requests/second
            if (pageCount > 0) {
                console.log(`SKU取得 - ページ ${pageCount + 1} の前にスリープします...`);
                this.sleep(0.21); // 5 requests/secondを遵守（200ms + 10ms margin）
            }

            let currentUrl = baseUrl;
            if (nextToken) {
                currentUrl += `&nextToken=${encodeURIComponent(nextToken)}`;
            }

            console.log(`SKU取得中... ページ ${pageCount + 1}`);
            const response = UrlFetchApp.fetch(currentUrl, options_request);
            const json = JSON.parse(response.getContentText());

            if (response.getResponseCode() !== 200) {
                console.error("SKU取得エラー:", json);
                throw new Error(`SKU取得に失敗しました: ${response.getResponseCode()} - ${response.getContentText()}`);
            }

            if (json && json.items && Array.isArray(json.items)) {
                const skusFromPage = json.items.map(item => item.sku).filter(sku => sku);
                allSkus.push(...skusFromPage);
                console.log(`ページ ${pageCount + 1}: ${skusFromPage.length}件のSKUを取得`);
            }

            nextToken = json.pagination && json.pagination.nextToken ? json.pagination.nextToken : null;
            pageCount++;

        } while (nextToken);

        console.log(`SKU取得完了: 総${allSkus.length}件, ${pageCount}ページ`);
        return allSkus;
    }

    /**
     * 特定のSKUのリスティングアイテムを取得する
     * @param {string} sellerId - セラーID
     * @param {string} sku - SKU
     * @returns {Object} リスティングアイテム情報
     */
    getSku(sellerId, sku){
        const headers = this.createRequestHeaders();
        const endpoint = `/listings/2021-08-01/items/${sellerId}/${sku}?marketplaceIds=${this.marketplaceId}`;
        const url = `${this.baseUrl}${endpoint}`;
        const options = {
            method: "get",
            headers: headers,
            muteHttpExceptions: true
        };

        const response = UrlFetchApp.fetch(url, options);
        const json = JSON.parse(response.getContentText());

        if (response.getResponseCode() !== 200) {
            console.error(`SKU詳細取得エラー (${sku}):`, json);
            return null;
        }

        // レート制限対応: 5 requests/second を遵守するため最低210ms待機
        this.sleep(0.21);

        return json;
    }
}