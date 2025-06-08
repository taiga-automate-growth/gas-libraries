/**
 * Slackユーザーを作成する
 * @param {object} userData - ユーザーのデータ 
 * @return {SlackUser}
 */
function create(userData){
  return new SlackUser(userData);
}
