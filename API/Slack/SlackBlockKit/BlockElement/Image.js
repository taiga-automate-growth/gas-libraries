class Image {
  constructor(image_url, alt_text) {
    if (!image_url && !slack_file) {
      throw new Error("You must provide either 'image_url' or 'slack_file'.");
    }
    
    // 必須フィールド
    this.type = "image";
    this.image_url = image_url;
    this.alt_text = alt_text;
  }

  // Slack 画像ファイルオブジェクトを設定
  setSlackFile(slack_file) {
    this.slack_file = slack_file;
  }

}
