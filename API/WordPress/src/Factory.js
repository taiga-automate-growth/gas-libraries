/**
 * WordPressAppを作成する
 * @param {string} siteUrl - WordPressのサイトURL
 * @param {string} userName - WordPressのユーザー名
 * @param {string} appPassword - WordPressのアプリケーションパスワード
 * @returns {WordPressApp} WordPressApp
 */
function create(siteUrl,userName,appPassword){
    return new WordPressApp(siteUrl,userName,appPassword);
}