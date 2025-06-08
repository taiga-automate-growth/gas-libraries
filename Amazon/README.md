# 🛒 Amazon SP-API ライブラリ群

Amazon Seller Partner API (SP-API) を Google Apps Script で簡単に利用するためのライブラリ集です。

---

## 📦 ライブラリ構成

### **[AmazonApp](./AmazonApp/README.md)** - メイン統合ライブラリ
🔧 **機能**: 認証・API通信・レート制限管理
- Amazon SP-APIの認証とアクセストークン管理
- 在庫サマリー取得 (`getInventorySummaries()`)
- 注文データ取得 (`getOrders()`, `getOrderItems()`, `getOrderItemsByDate()`)
- SKUリスト取得 (`getSkuList()`)
- レート制限自動対応 (Orders API: 0.5 req/s, Listings API: 5 req/s)

### **[AmazonInventory](./AmazonInventory/README.md)** - 在庫管理専用ライブラリ
📦 **機能**: 在庫データの構造化と分析
- `InventorySummary` クラス: 個別在庫アイテム表現
- `InventorySummaries` クラス: 在庫コレクション管理
- ページネーション対応の在庫データ取得
- 在庫統計情報の自動計算

### **[AmazonOrder](./AmazonOrder/README.md)** - 注文管理専用ライブラリ
📋 **機能**: 注文データの詳細分析
- `Order` クラス: 注文全体の情報管理
- `OrderItem` クラス: 個別注文アイテム表現
- 注文データの検索・フィルタリング機能
- 売上統計とCSV出力機能
- 日付別注文アイテム取得とデータ結合

---

## 🚀 基本的な使用パターン

### 1️⃣ シンプル使用 (AmazonAppのみ)
```javascript
// メインライブラリだけで基本機能を使用
const amazon = new AmazonApp(refreshToken, clientId, clientSecret, 'JP', 'MyApp', '1.0', 'ja-JP');

// 在庫取得
const inventories = amazon.getInventorySummaries();

// 注文取得
const orders = amazon.getOrderItemsByDate('2024-01-15');
```

### 2️⃣ 高度な使用 (専用ライブラリ併用)
```javascript
// メインライブラリで生データ取得
const amazon = new AmazonApp(/* ... */);
const response = UrlFetchApp.fetch(url, options);

// 専用ライブラリで構造化
const inventories = new InventorySummaries(response);
const order = AmazonOrder.fromApiResponse(response);

// 高度な分析・操作
const statistics = order.calculateStatistics();
const csvData = order.toCsv();
```

---

## ⚠️ 重要な注意事項

### 🔐 認証情報の管理
- **リフレッシュトークン**: Amazon Developer Consoleから取得
- **クライアントID/シークレット**: アプリケーション登録時に発行
- **機密情報**: PropertiesServiceで安全に保管

### ⏱️ API制限事項
- **レート制限**: Orders API (0.5 req/s), Listings API (5 req/s)
- **データ制限**: 現在時刻から2分前までのデータのみ取得可能
- **タイムアウト**: 大量データ取得時は適切な間隔を設定

### 🌍 対応マーケットプレイス
- **日本**: `JP` (amazon.co.jp)
- **アメリカ**: `US` (amazon.com)
- **その他**: 国コードを指定して利用可能

---

## 📚 詳細ドキュメント

各ライブラリの詳細な使用方法については、個別のREADMEファイルを参照してください：

- **[AmazonApp詳細](./AmazonApp/README.md)** - API通信と基本機能
- **[AmazonInventory詳細](./AmazonInventory/README.md)** - 在庫管理機能
- **[AmazonOrder詳細](./AmazonOrder/README.md)** - 注文管理機能

---

## 🔧 開発・貢献

このライブラリ群は継続的に開発・改善されています。バグ報告や機能要望がありましたら、お気軽にお知らせください。 