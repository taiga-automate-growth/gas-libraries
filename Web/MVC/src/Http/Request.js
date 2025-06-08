class Request{
    constructor(e){
        console.log(e);
        /**
         * @private
         * @type {object}
         */
        this.event = e;
        /**
         * @private
         * @type {string}
         */
        this.method;

        if(e.method === "GET" || (e.method === "POST" && "method" in e.parameter && e.parameter.method.toUpperCase() === "GET")){
          this.method = "GET"
        }else{
          this.method = "POST"
        }

        /**
         * @private
         * @type {string}
         */
        this.path = "pathInfo" in e ? e.pathInfo: "path" in e.parameters ? e.parameters.path.join("/") : "" ;
        

        /**
         * @private
         * @type {Object}
         */
        this.query = e.parameter || {};
        
        /**
         * @private
         * @type {Object}
         */
        this.body;

        if(this.method === "POST"){
          if(e.postData.type && e.postData.type === "application/x-www-form-urlencoded"){
            console.log(e.parameter);
            let current = {}; // トップレベルのオブジェクト

            Object.keys(e.parameter).forEach(name => {
                const keys = name.split("."); // キーを分割
                const value = e.parameter[name]; // 値を取得
                let nested = current; // ネストを進めるための一時変数

                keys.forEach((key, i) => {
                    if (i === keys.length - 1) {
                        // 最後のキーの場合
                        if (nested[key] === undefined) {
                            nested[key] = value;
                        } else if (Array.isArray(nested[key])) {
                            nested[key].push(value);
                        } else {
                            nested[key] = [nested[key], value];
                        }
                    } else {
                        // 中間キーの場合
                        if (nested[key] === undefined) {
                            nested[key] = {};
                        }
                        // 次の階層に進む
                        nested = nested[key];
                    }
                });
            });

            this.body = current;
          }else{
            this.body = JSON.parse(e.postData.contents);
          }
        }

        /**
         * @private
         * @type {Object}
         */
        this.params = { ...this.query, ...this.body };
    }

    getMethod(){
        return this.method;
    }

    getPath(){
        return this.path;
    }

    getQuery(){
        return this.query;
    }

    getBody(){
        return this.body;
    }

    getParams(){
        return this.params;
    }

    has(key){
      if(key in this.params) return true;
      return false;
    }

    getSessionId(){
      if(this.has("sessionId")){
        return this.params.sessionId;
      }else{
        return null;
      }
    }
}