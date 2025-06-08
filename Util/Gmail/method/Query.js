/**
 * 送信元アドレスを指定する
 * @param {string} fromAddress - 送信元アドレス
 * @return {Gmail}
 */
function fromAddress(fromAddress) {
  throw new Error("Queryのメソッドです"); 
}

/**
 * 宛先を指定する
 * @param {string} toAddress - 宛先アドレス
 * @return {Gmail}
 */
function toAddress(toAddress) {
  throw new Error("Queryのメソッドです");
}

/**
 * CCを指定する
 * @param {Array<string>} cc - CCアドレス
 * @return {Gmail}
 */
function cc(cc = []) {
  throw new Error("Queryのメソッドです");
}

/**
 * BCCを指定する
 * @param {Array<string>} bcc - BCCアドレス
 * @return {Gmail}
 */
function bcc(bcc = []) {
  throw new Error("Queryのメソッドです");
}

/**
 * 件名を指定する
 * @param {string} subject - 件名
 * @return {Gmail}
 */
function subject(subject){
  throw new Error("Queryのメソッドです");
}

/**
 * 
 * @param {Date} after - 検索対象の開始日
 * @return {Gmail}
 */
function after(after) {
  throw new Error("Queryのメソッドです");
}

/**
 * 
 * @param {Date} before - 検索対象の終了日
 * @return {Gmail}
 */
function before(before) {
  throw new Error("Queryのメソッドです");
}

/**
 * 
 * @param {} - 
 * @return {Gmail}
 */
function olderThan(duration) {
  throw new Error("Queryのメソッドです");
}

/**
 * 
 * @param {} - 
 * @return {Gmail}
 */
function newerThan(duration) {
  throw new Error("Queryのメソッドです");
}

/**
 * 
 * @param {} - 
 * @return {Gmail}
 */
function label(label) {
  throw new Error("Queryのメソッドです");
}

/**
 * 
 * @param {} - 
 * @return {Gmail}
 */
function category(category) {
  throw new Error("Queryのメソッドです");
}

/**
 * ユーザーラベルがあるメールのみを指定する
 * @return {Gmail}
 */
function hasLabel(){
  this.text += `has:userlabels`;
  return this;
}

/**
 * ユーザーラベルがないメールのみを指定する
 * @return {Gmail}
 */
function hasNotLabel(){
  this.text += `has:nouserlabels`;
  return this;
}

/**
 * 
 * @param {} - 
 * @return {Gmail}
 */
function build() {
  throw new Error("Queryのメソッドです");
}
