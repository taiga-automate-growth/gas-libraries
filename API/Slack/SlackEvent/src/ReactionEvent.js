/**
 * リアクションイベント（reaction）
 */
class ReactionAddedEvent extends SlackEvent {
  constructor(event) {
    super("reaction_added", new Date().getTime());
    this.reaction = event.reaction;
    this.user = event.user;
    this.itemUser = event.item_user;
    this.itemType = event.item.type;
    this.itemChannel = event.item.channel;
    this.itemTs = event.item.ts;
    this.eventTs = event.event_ts;
  }

  getReaction() {
    return this.reaction;
  }

  getUser() {
    return this.user;
  }

  getItemType() {
    return this.itemType;
  }

  getChannelId() {
    return this.itemChannel;
  }

  getItemTs() {
    return this.itemTs;
  }

  getItemUser() {
    return this.itemUser;
  }

  getEventTs() {
    return this.eventTs;
  }
}

/**
 * リアクションを取得する
 * @return {string}
 */
function getReaction(){
  throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * ユーザーを取得する
 * @return {string}
 */
function getUser(){
  throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * アイテムのタイプを取得する
 * @return {string}
 */
function getItemType(){
  throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * アイテムのチャンネルを取得する
 * @return {string}
 */
function getChannelId(){
  throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * アイテムのタイムスタンプを取得する
 * @return {string}
 */
function getItemTs(){
  throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * アイテムのユーザーを取得する
 * @return {string}
 */
function getItemUser(){
  throw new Error("インスタンスメソッドではないので呼び出せません");
}

/**
 * イベントのタイムスタンプを取得する
 * @return {string}
 */
function getEventTs(){
  throw new Error("インスタンスメソッドではないので呼び出せません");
}
