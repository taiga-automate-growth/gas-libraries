class LineBot{
  constructor(accessToken){
    this.officialAccount = LineApp.create(accessToken); // 公式アカウントを取得
    this.route = {
      "postback": [],
      "message": {
          "text": []
      },
      "follow": []
    };
  }

  /**
   * ポストバックタイプのルートを登録する
   * 
   * @param {string} path - 条件となるパス
   * @param {Object} controller - 呼び出すコントローラー
   * @param {string} method - 呼び出すメソッド
   */
  postback(data,controller,method){
    this.route.postback.push({
      "path": data,
      "controller": controller,
      "method": method
    });
    return this;
  }

  /**
   * メッセージタイプのルートを登録する
   * 
   * @param {string} search - 条件となる文字列
   * @param { "equals" | "contains" | "startsWith" | "endsWith" | "notEquals" } compare - 比較演算子
   * @param {Object} controller - 呼び出すコントローラー
   * @param {string} method - 呼び出すメソッド
   */
  textMessage(search, compare, controller, method){
      this.route.message.text.push({
          "search": search,
          "compare": compare,
          "controller": controller,
          "method": method
      })
      return this;
  }

  /**
   * フォローイベントのルートを登録する
   * 
   * @param {Object} controller - 呼び出すコントローラー
   * @param {string} method - 呼び出すメソッド
   */
  follow(controller, method){
    this.route.follow.push({
      "controller": controller,
      "method": method
    });
    return this;
  }

  /**
   * 応答する
   * 
   * @param {Object} e - LINEのWebhookイベント（doPostの引数）
   */
  response(e) {
    const event = LineEvent.receive(e); // 自作ラッパーでイベント整形
    this.officialAccount.loading(event.getSenderId(), 60); // ローディング表示（任意）

    // ポストバックイベントの場合
    if (event.isPostback()) {
      const data = event.getPostbackData(); // ポストバックデータを取得
      if(!("path" in data)) return; // pathが含まれていなければ終了

      // パスに一致する処理を実行する
      for (let route of this.route.postback) {
        if (route.path === data.path) {
          return route.controller[route.method](event);
        }
      }
      return;
    }

    // テキストメッセージの場合
    if (event.isTextMessage()) {
      const text = event.getText(); // テキストを取得

      // 条件に一致する処理を実行する
      for (let route of this.route.message.text) {
        let matched = false;
        switch (route.compare) {
          case "equals":
            matched = (text === route.search);
            break;
          case "notEquals":
            matched = (text !== route.search);
            break;
          case "contains":
            matched = text.includes(route.search);
            break;
          case "startsWith":
            matched = text.startsWith(route.search);
            break;
          case "endsWith":
            matched = text.endsWith(route.search);
            break;
        }
        if (matched) {
          return route.controller[route.method](event);
        }
      }
      return;
    }

    if (event.isFollow()) {
      for (let route of this.route.follow) {
        return route.controller[route.method](event);
      }
      return;
    }

    // 該当ルートなし
    console.log("No matching route found for type:", type);
  }


}