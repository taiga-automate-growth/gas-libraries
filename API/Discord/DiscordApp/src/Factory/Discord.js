/**
 * Discordを生成する
 * @param {string} webhookUrl - WebhookのURL
 * @return {DiscordApp}
 */
function create(webhookUrl){
  return new DiscordApp(webhookUrl);
}