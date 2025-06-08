/**
 * Slackからイベントを受信する
 * @param {Event} e - Slack Events APIから送信されたPOSTリクエストイベント
 * @param {Properties} scriptProperties - クライアント側で取得したScriptProperties
 * @return {SlackEvent}
 */
function receive(e, scriptProperties) {
  if (!e.hasOwnProperty('postData')) {
    console.error("postDataが含まれていません");
    return;
  }
  const postData = JSON.parse(e.postData.getDataAsString());

  // event_id を取得
  const eventId = postData.event_id || (postData.event && postData.event.event_id);
  if (eventId && scriptProperties) {
    const key = `slack_event_${eventId}`;
    if (scriptProperties.getProperty(key)) {
      // すでに処理済み
      console.log(`イベントID ${eventId} は既に処理済みです`);
      return null;
    }
    // 未処理なので保存
    scriptProperties.setProperty(key, "1");
  }

  // Slackの検証リクエスト（URL verification）
  if (postData.type === "url_verification") {
    return new VerificationEvent(postData);
  }

  // Block Actionsイベント対応
  if (postData.type === "block_actions") {
    const actionType = postData.actions && postData.actions[0] && postData.actions[0].type;
    switch (actionType) {
      case "static_select":
        return new StaticSelectAction(postData);
      case "datepicker":
        return new DatepickerAction(postData);
      default:
        return new BlockAction(postData);
    }
  }

  // Slackイベント（リアクションのみ対応）
  if (postData.event && postData.event.type === "reaction_added") {
    return new ReactionAddedEvent(postData.event);
  }

  // 対象外イベント
  return null;
}
