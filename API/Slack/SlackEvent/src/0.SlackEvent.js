/**
 * Slackイベントの基底クラス
 */
class SlackEvent {
  constructor(type, timestamp, headers = {}) {
    this.type = type;
    this.timestamp = timestamp;
    this.headers = headers;
  }

  isVerification() {
    return this.type === "verification";
  }

  isReactionAdded() {
    return this.type === "reaction_added";
  }

  getType() {
    return this.type;
  }

  getTimestamp() {
    return this.timestamp;
  }

  /**
   * リトライイベントかどうかを判定する
   * @return {boolean}
   */
  isRetry() {
    return (
      this.headers["X-Slack-Retry-Num"] !== undefined ||
      this.headers["x-slack-retry-num"] !== undefined
    );
  }
}

/**
 * 検証イベントかどうかを判定する
 * @return {boolean}
 */
function isVerification() {
  throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * リアクション追加イベントかどうかを判定す
 * @return {boolean}
 */
function isReactionAdded() {
  throw new Error("インスタンスメソッドではないので呼び出せません");
}

function getType() {
  throw new Error("インスタンスメソッドではないので呼び出せません");
}

function getTimestamp() {
  throw new Error("インスタンスメソッドではないので呼び出せません");
}
