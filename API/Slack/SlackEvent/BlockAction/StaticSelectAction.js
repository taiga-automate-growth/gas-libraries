/**
 * static_select_action用クラス
 */
class StaticSelectAction extends BlockAction {
  /**
   * @param {Object} payload - Slackから送信されたBlockActionイベントのペイロード
   */
  constructor(payload) {
    super(payload);
    // static_selectの選択値は actions[0].selected_option.value に格納されている
    this.selectedOption = (payload.actions && payload.actions[0] && payload.actions[0].selected_option)
      ? payload.actions[0].selected_option.value
      : null;
  }

  /**
   * 選択された値を取得
   * @return {string|null}
   */
  getSelectedValue() {
    return this.selectedOption;
  }
}