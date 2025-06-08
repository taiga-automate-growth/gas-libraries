/**
 * @constructor
 * @param {string} data - Webhookを介して返却される文字列
 * @param {"date" | "time" | "datetime"} mode - アクションモード
 * @param {string} label - ラベル
 * @return {LineAction}
 */
function createDatetimePicker(data,mode,label){
  return new DatetimePicker(data,mode,label);
}