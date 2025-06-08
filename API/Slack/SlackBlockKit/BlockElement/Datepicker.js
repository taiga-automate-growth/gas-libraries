class Datepicker {
  /**
   * @param {string} placeholder - プレースホルダーとして表示するテキスト
   * @param {string} action_id - アクションID（省略時は自動生成）
   */
  constructor(placeholder, action_id) {
    if (!placeholder) {
      throw new Error("The 'placeholder' field is required for a datepicker.");
    }

    this.type = "datepicker";
    this.placeholder = {
      type: "plain_text",
      text: placeholder,
      emoji: true
    };
    this.action_id = action_id || `action-${Date.now()}`;
  }

  /**
   * 初期日付をセット
   * @param {Date} date - Dateオブジェクト
   */
  setInitialDate(date) {
    if (date.constructor.name !== "Date" || isNaN(date.getTime())) {
      throw new Error("Date must be a valid Date object.");
    }
    // GASのUtilities.formatDateを使用してYYYY-MM-DD形式に変換
    this.initial_date = Utilities.formatDate(date, "Asia/Tokyo", "yyyy-MM-dd");
    return this;
  }

  /**
   * confirmダイアログをセット
   * @param {Object} confirmObj - Block Kitのconfirmオブジェクト
   */
  setConfirm(confirmObj) {
    this.confirm = confirmObj;
    return this;
  }
}