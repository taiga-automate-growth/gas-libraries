class Gmail{
  constructor(){
    this.client = GmailApp;
  }

  /**
   * メールを取得する
   * @param {GmailQuery} query - クエリ
   * @return {Array<GmailApp.GmailThread>}
   */
  get(query){
    return this.client.search(query.build());
  }
}