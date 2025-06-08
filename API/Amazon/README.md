# GASのライブラリ

## Amazon SP-API関連ライブラリ

| ライブラリ名 | 説明 | ライブラリID |
|-------------|------|-------------|
| **AmazonApp** | Amazon SP-APIのメイン統合ライブラリ<br/>・認証・アクセストークン管理<br/>・在庫サマリー取得<br/>・注文データ取得<br/>・SKUリスト取得<br/>・レート制限対応 | `[ライブラリIDをここに入力]` |
| **AmazonInventory** | Amazon在庫管理専用ライブラリ<br/>・InventorySummaryクラス<br/>・InventorySummariesクラス<br/>・在庫データの構造化・分析機能 | `[ライブラリIDをここに入力]` |
| **AmazonOrder** | Amazon注文管理専用ライブラリ<br/>・Orderクラス（注文全体）<br/>・OrderItemクラス（個別注文アイテム）<br/>・注文データの統計・分析機能<br/>・CSV出力機能 | `[ライブラリIDをここに入力]` |

## 使用方法

### 1. ライブラリの追加
Google Apps Scriptエディタで以下の手順でライブラリを追加してください：

1. 左側メニューの「ライブラリ」をクリック
2. 「ライブラリを追加」をクリック
3. 上記テーブルのライブラリIDを入力
4. 「検索」をクリック
5. 最新バージョンを選択して「保存」

### 2. 基本的な使用例

```javascript
// AmazonAppライブラリの初期化
const amazon = new AmazonApp(
    refreshToken,    // リフレッシュトークン
    clientId,        // クライアントID
    clientSecret,    // クライアントシークレット
    'JP',           // 国コード
    'MyApp',        // アプリ名
    '1.0',          // アプリバージョン
    'ja-JP'         // 言語
);

// 在庫サマリー取得
const inventories = amazon.getInventorySummaries();

// 注文データ取得（日付指定）
const orderItems = amazon.getOrderItemsByDate('2024-01-15');

// SKUリスト取得
const skuList = amazon.getSkuList();
```

### 3. 各ライブラリの詳細

#### AmazonApp（メインライブラリ）
- Amazon SP-APIとの通信を担当
- 認証、レート制限、エラーハンドリングを自動処理
- 全ての基本機能を提供

#### AmazonInventory（在庫管理）
- 在庫データの構造化と分析に特化
- ページネーション対応
- 在庫統計情報の自動計算

#### AmazonOrder（注文管理）
- 注文データの詳細分析に特化
- 注文アイテムの検索・フィルタリング
- 売上統計とCSV出力機能

## 注意事項

- **レート制限**: SP-APIのレート制限を自動的に遵守します
- **エラーハンドリング**: 適切なエラーメッセージとログ出力を提供
- **日付制限**: Amazon SP-APIは現在時刻から2分前までのデータのみ取得可能です

## サポート

# GASのライブラリ

## Amazon SP-API関連ライブラリ

| ライブラリ名 | 説明 | ライブラリID |
|-------------|------|-------------|
| **AmazonApp** | Amazon SP-APIのメイン統合ライブラリ<br/>・認証・アクセストークン管理<br/>・在庫サマリー取得<br/>・注文データ取得<br/>・SKUリスト取得<br/>・レート制限対応 | `[ライブラリIDをここに入力]` |
| **AmazonInventory** | Amazon在庫管理専用ライブラリ<br/>・InventorySummaryクラス<br/>・InventorySummariesクラス<br/>・在庫データの構造化・分析機能 | `[ライブラリIDをここに入力]` |
| **AmazonOrder** | Amazon注文管理専用ライブラリ<br/>・Orderクラス（注文全体）<br/>・OrderItemクラス（個別注文アイテム）<br/>・注文データの統計・分析機能<br/>・CSV出力機能 | `[ライブラリIDをここに入力]` |

## 使用方法

### 1. ライブラリの追加
Google Apps Scriptエディタで以下の手順でライブラリを追加してください：

1. 左側メニューの「ライブラリ」をクリック
2. 「ライブラリを追加」をクリック
3. 上記テーブルのライブラリIDを入力
4. 「検索」をクリック
5. 最新バージョンを選択して「保存」

### 2. 基本的な使用例

```javascript
// AmazonAppライブラリの初期化
const amazon = new AmazonApp(
    refreshToken,    // リフレッシュトークン
    clientId,        // クライアントID
    clientSecret,    // クライアントシークレット
    'JP',           // 国コード
    'MyApp',        // アプリ名
    '1.0',          // アプリバージョン
    'ja-JP'         // 言語
);

// 在庫サマリー取得
const inventories = amazon.getInventorySummaries();

// 注文データ取得（日付指定）
const orderItems = amazon.getOrderItemsByDate('2024-01-15');

// SKUリスト取得
const skuList = amazon.getSkuList();
```

### 3. 各ライブラリの詳細

#### AmazonApp（メインライブラリ）
- Amazon SP-APIとの通信を担当
- 認証、レート制限、エラーハンドリングを自動処理
- 全ての基本機能を提供

#### AmazonInventory（在庫管理）
- 在庫データの構造化と分析に特化
- ページネーション対応
- 在庫統計情報の自動計算

#### AmazonOrder（注文管理）
- 注文データの詳細分析に特化
- 注文アイテムの検索・フィルタリング
- 売上統計とCSV出力機能

## 注意事項

- **レート制限**: SP-APIのレート制限を自動的に遵守します
- **エラーハンドリング**: 適切なエラーメッセージとログ出力を提供
- **日付制限**: Amazon SP-APIは現在時刻から2分前までのデータのみ取得可能です

## サポート

各ライブラリには詳細なJSDocコメントが含まれており、Google Apps Scriptエディタでコード補完が利用できます。