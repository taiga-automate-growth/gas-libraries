/**
 * datepicker_action用クラス
 */
class DatepickerAction extends BlockAction {
  /**
   * @param {Object} payload - Slackから送信されたBlockActionイベントのペイロード
   */
  constructor(payload) {
    super(payload);
    // datepickerの選択値は actions[0].selected_date に格納されている
    this.selectedDate = (payload.actions && payload.actions[0] && payload.actions[0].selected_date)
      ? payload.actions[0].selected_date
      : null;
  }

  /**
   * 選択された日付を取得
   * @return {string|null} 例: "2024-06-01"
   */
  getSelectedDate() {
    return this.selectedDate;
  }
}