/**
 * BlockActionイベントの基底クラス
 */
class BlockAction {
  /**
   * @param {Object} payload - Slackから送信されたBlockActionイベントのペイロード
   */
  constructor(payload) {
    this.type = payload.type || null;
    this.user = payload.user || null;
    this.actions = payload.actions || [];
    this.channel = payload.channel || null;
    this.team = payload.team || null;
    this.message = payload.message || null;
    this.response_url = payload.response_url || null;
    this.trigger_id = payload.trigger_id || null;
  }

  /**
   * BlockActionの種類を取得
   * @return {string|null}
   */
  getType() {
    return this.type;
  }

  /**
   * アクション情報を取得
   * @return {Array}
   */
  getActions() {
    return this.actions;
  }

  /**
   * ユーザー情報を取得
   * @return {Object|null}
   */
  getUser() {
    return this.user;
  }

  // 必要に応じて他の共通メソッドを追加
} 