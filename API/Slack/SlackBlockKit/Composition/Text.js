class TextComposition {
  constructor(type, text) {
    // type は 'mrkdwn' または 'plain_text' のみ有効
    if (!['mrkdwn', 'plain_text'].includes(type)) {
      throw new Error("Type must be either 'mrkdwn' or 'plain_text'.");
    }
    this.type = type;
    this.text = text;
  }

  // emoji をセットするメソッド
  setEmoji(emoji) {
    if (this.type === 'plain_text') {
      this.emoji = emoji;
    } else {
      throw new Error("emoji can only be set for 'plain_text' type.");
    }
  }

  // verbatim をセットするメソッド
  setVerbatim(verbatim) {
    if (this.type === 'mrkdwn') {
      this.verbatim = verbatim;
    } else {
      throw new Error("verbatim can only be set for 'mrkdwn' type.");
    }
  }

}
