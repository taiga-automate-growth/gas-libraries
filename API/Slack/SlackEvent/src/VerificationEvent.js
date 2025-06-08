/**
 * 検証イベント（verification）
 */
class VerificationEvent extends SlackEvent {
  constructor(event) {
    super("verification", new Date().getTime());
    this.challenge = event.challenge;
    this.token = event.token;
  }

  getChallenge() {
    return this.challenge;
  }

  getToken() {
    return this.token;
  }
}

/**
 * 検証トークンを取得する
 * @return {string}
 */
function getToken(){
  throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * 検証チャレンジを取得する
 * @return {string}
 */
function getChallenge(){
  throw new Error("インスタンスメソッドではないので呼び出せません");
}