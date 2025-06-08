class GmailQuery {
  constructor() {
    this.text = ""; // クエリ文字列を初期化
  }

  fromAddress(fromAddress) {
    if (fromAddress) this.text += ` from:${fromAddress}`;
    return this;
  }

  toAddress(toAddress) {
    if (toAddress) this.text += ` to:${toAddress}`;
    return this;
  }

  cc(cc = []) {
    if (cc.length > 0) this.text += ` cc:${cc.join(",")}`;
    return this;
  }

  bcc(bcc = []) {
    if (bcc.length > 0) this.text += ` bcc:${bcc.join(",")}`;
    return this;
  }

  subject(subject){
    if (subject) this.text += ` subject:${subject}`;
    return this;
  }

  after(after) {
    if (after) {
      const formattedDate = Utilities.formatDate(after, "Asia/Tokyo", "yyyy/MM/dd");
      this.text += ` after:${formattedDate}`;
    }
    return this;
  }

  before(before) {
    if (before) {
      const formattedDate = Utilities.formatDate(before, "Asia/Tokyo", "yyyy/MM/dd");
      this.text += ` before:${formattedDate}`;
    }
    return this;
  }

  olderThan(duration) {
    if (duration) this.text += ` older_than:${duration}`;
    return this;
  }

  newerThan(duration) {
    if (duration) this.text += ` newer_than:${duration}`;
    return this;
  }

  label(label) {
    if (label) this.text += ` label:${label}`;
    return this;
  }

  category(category) {
    if (category) this.text += ` category:${category}`;
    return this;
  }

  hasLabel(){
    this.text += `has:userlabels`;
    return this;
  }

  hasNotLabel(){
    this.text += `has:nouserlabels`;
    return this;
  }

  build() {
    return this.text.trim(); // 最後に完成したクエリ文字列を返す
  }
}