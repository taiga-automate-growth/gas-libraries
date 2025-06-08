# 📚 GASライブラリ

Google Apps Script用のライブラリ集です。外部API連携、GAS固有処理、WEBアプリ開発に便利な機能を提供します。

---

## 🏷️ ライブラリ分類

### 🌐 API
各種外部WEB APIのクライアントライブラリ群

#### 💬 チャット

| API | 説明 |
|-------------|------------|
| **[LINE Messaging API](./API/LINE/README.md)** | LINE公式アカウント向けAPI統合ライブラリ。メッセージ配信、リッチメニュー管理、ユーザー情報取得機能を提供 |
| **[Chatwork API](./API/Chatwork/README.md)** | Chatworkビジネスチャット向けAPI統合ライブラリ。メッセージ送信やWEBHOOKイベント受信を提供。 |
| **[Discord API](./API/Discord/README.md)** | Discord向けBot・Webhook統合ライブラリ。メッセージ送信を提供|
| **[Slack API](./API/Slack/README.md)** | Slack向けBot・アプリ統合ライブラリ。メッセージ送信、チャンネル管理、ファイル共有機能を提供 |

---

#### 🤖 AI

| API | 説明 |
|-------------|------------|
| **[Dify API](./API/Dify/README.md)** | DifyプラットフォームAI統合ライブラリ。ワークフロー実行、チャットボット連携、AIアプリケーション管理機能を提供 |
| **[Gemini API](./API/Gemini/README.md)** | Google Gemini AI統合ライブラリ。テキスト生成、画像解析、マルチモーダルAI処理機能を提供 |
| **[OpenAI API](./API/OpenAI/README.md)** | OpenAI GPT統合ライブラリ。テキスト生成、チャット機能、埋め込みベクトル生成機能を提供 |

---

#### その他

| API | 説明 |
|-------------|------------|
| **[Amazon SP-API](./API/Amazon/README.md)** | Amazonセラーセントラル向けAPI統合ライブラリ群。認証管理、在庫管理、注文管理、SKU管理機能を提供 |
| **[Custom Search API](./API/CustomSearch/README.md)** | Google Custom Search API統合ライブラリ。カスタム検索エンジンによるWEB検索、画像検索機能を提供 |
| **[PhantomJsCloud API](./API/PhantomJsCloud/README.md)** | PhantomJsCloud統合ライブラリ。ヘッドレスブラウザによるスクレイピング、PDF生成、スクリーンショット機能を提供 |

---

### ⚙️ Util  
GAS固有の処理を内包したライブラリ

---

### 🌍 WEB
WEBアプリとしてデプロイする場合に便利なライブラリ
- UI/UXコンポーネント
- 認証・セッション管理

---

## 🚀 使用方法

### ライブラリの追加手順

1. **Google Apps Scriptエディタ**を開く
2. 左側メニューの**ライブラリ**をクリック
3. **ライブラリを追加**をクリック
4. 上記表の**ライブラリID**を入力
5. **検索**をクリック
6. **最新バージョン**を選択して**保存**


## 📞 サポート

- **📖 コード補完**: 各ライブラリには詳細なJSDocコメントが含まれています
- **🔍 型情報**: Google Apps Scriptエディタでコード補完が利用できます
- **📚 ドキュメント**: 各ライブラリの詳細な使用方法は個別のドキュメントを参照してください