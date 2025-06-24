/**
 * 投稿データを作成する
 * @param {string} title - 投稿タイトル
 * @param {string} content - 投稿内容
 * @returns {WordPressApp} WordPressApp
 */
function postParameter(title,content){
    throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * 投稿ステータスを設定する
 * @param {"draft"|"publish"|"future"|"pending"|"private"} status - 投稿ステータス
 * @returns {WordPressApp} WordPressApp
 */
function status(status){
    throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * カテゴリを設定する
 * @param {string} categoryIds - カテゴリID
 * @returns {WordPressApp} WordPressApp
 */
function categories(categoryIds){
    throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * タグを設定する
 * @param {Array<string>} tagIds - タグID
 * @returns {WordPressApp} WordPressApp
 */
function tags(tagIds){
    throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * 抜粋を設定する
 * @param {string} excerpt - 抜粋
 * @returns {WordPressApp} WordPressApp
 */
function excerpt(excerpt){
    throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * スラッグを設定する
 * @param {string} slug - スラッグ
 * @returns {WordPressApp} WordPressApp
 */
function slug(slug){
    throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * メディアを設定する
 * @param {string} mediaId - メディアID
 * @returns {WordPressApp} WordPressApp
 */
function featuredMedia(mediaId){
    throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * 投稿者を設定する
 * @param {string} authorId - 投稿者ID
 * @returns {WordPressApp} WordPressApp
 */
function author(authorId){
    throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * 日付を設定する
 * @param {string} isoDate - ISO日付
 * @returns {WordPressApp} WordPressApp
 */
function date(isoDate){
    throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * メタデータを設定する
 * @param {string} key - メタデータキー
 * @param {string} value - メタデータ値
 * @returns {WordPressApp} WordPressApp
 */
function meta(key,value){
    throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * メディアを作成する
 * @param {DriveApp.File} file - メディアファイル
 */
function createMedia(file){
    throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * 投稿を更新する
 * @param {string} postId - 投稿ID
 * @param {WordPressApp} postParameter - 投稿パラメータ
 */
function updatePost(postId,postParameter){
    throw new Error("インスタンスメソッドではないので呼び出せません");
}