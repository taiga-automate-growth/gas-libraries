class StaticSelect {
  /**
   * @param {string} placeholder - プレースホルダーとして表示するテキスト
   * @param {string} action_id - アクションID（省略時は自動生成）
   */
  constructor(placeholder, action_id) {
    if (!placeholder) {
      throw new Error("The 'placeholder' field is required for a static select.");
    }

    this.type = "static_select";
    this.placeholder = {
      type: "plain_text",
      text: placeholder,
      emoji: true
    };
    this.action_id = action_id || `action-${Date.now()}`;
    this.options = [];
  }

  /**
   * 選択肢を追加
   * @param {Object} option - { text: string, value: string }
   */
  addOption(text, value) {
    if (!text || !value) {
      throw new Error("Each option must have 'text' and 'value'.");
    }
    this.options.push({
      text: {
        type: "plain_text",
        text: text,
        emoji: true
      },
      value: value
    });
    return this;
  }

  /**
   * 複数の選択肢を一度に追加
   * @param {Array} optionsArray - [{ text: string, value: string }, ...]
   */
  setOptions(optionsArray) {
    if (!Array.isArray(optionsArray)) {
      throw new Error("setOptions expects an array.");
    }
    optionsArray.forEach(option => this.addOption(option));
    return this;
  }
}