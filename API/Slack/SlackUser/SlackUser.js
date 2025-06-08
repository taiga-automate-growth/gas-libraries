class SlackUser{
  constructor(userData){
    this.id = userData.id;
    this.teamId = userData.team_id;
    this.name = userData.name;
    this.deleted = userData.deleted;
    this.color = userData.color;
    this.realName = userData.real_name;
    this.tz = userData.tz;
    this.tzLabel = userData.tz_label;
    this.tzOffset = userData.tz_offset;
    this.adminFlag = userData.is_admin;
    this.ownerFlag = userData.is_owner;
    this.primaryOwnerFlag = userData.is_primary_owner;
    this.botFlag = userData.is_bot;
  }

  /**
   * ボットかどうか判定する
   * @return {bool} ボットの場合はtrue,それ以外はfalse
   */
  isBot(){
    return this.botFlag;
  }

  /**
   * 削除済みか判定する
   * @return {bool} 削除済みの場合はtrue,それ以外はfalse
   */
  isDeleted(){
    return this.deleted;
  }
}
