class Button {
  constructor(text, action_id) {
    if (!text) {
      throw new Error("The 'text' field is required for a button.");
    }

    this.type = "button";
    this.text = text; // Textオブジェクト
    this.action_id = action_id || `action-${Date.now()}`; // action_idが提供されていない場合は自動生成
  }

  // オプションフィールドのセットメソッド
  setUrl(url) {
    this.url = url;
    return this; // チェイニングを可能にする
  }

  setValue(value) {
    this.value = value;
    return this;
  }

  setStyle(style) {
    this.style = style; // 'primary' or 'danger' など
    return this;
  }

  setConfirm(confirm) {
    this.confirm = confirm; // confirmオブジェクト
    return this;
  }

  setAccessibilityLabel(accessibility_label) {
    this.accessibility_label = accessibility_label;
    return this;
  }

}
