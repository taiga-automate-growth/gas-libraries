class Router {
    constructor() {
        this.routes = {};
        this.currentRoute;
    }

    // GETメソッド用のルートを定義する
    get(path, controller, method) {
        if(path in this.routes){
            this.routes[path]["GET"] = {controller, method}
        }else{
            this.routes[path] = { "GET": {controller, method}};
        }
        this.currentRoute = this.routes[path]["GET"];
        return this;
    }

    post(path, controller, method) {
        if(path in this.routes){
            this.routes[path]["POST"] = {controller, method}
        }else{
            this.routes[path] = { "POST": {controller, method}};
        }
        this.currentRoute = this.routes[path]["GET"];
        return this;
    }

    /**
     * パスにミドルウェアを指定する
     * @param {Array<Middleware>} middlewares - ミドルウェアオブジェクトの配列
     */
    middleware(middlewares) {
        // 現在のルートにミドルウェアを追加
        if (this.currentRoute) {
            this.currentRoute.middlewares = middlewares;
        }
        return this;  // チェーン可能にする
    }

    // パスに一致するルートを見つけてコントローラーのメソッドを呼び出す
    /**
     * 
     * @param {Request} request 
     * @returns 
     */
    routing(request) {
        const path = request.getPath();
        const method = request.getMethod();
        for (let routePath in this.routes) {
            // 動的パスの対応（例: /companies/{id}）
            const routeMatch = this.matchRoute(path, routePath);
            if (routeMatch) {
                const route = this.routes[routePath][method];
                if(route === undefined) throw new Error("Route not found");
                console.log("route:",route);

                // ミドルウェアをすべて実行
                if(route.middlewares){
                  for (const middleware of route.middlewares) {
                      try{
                        const result = new middleware().handle(request);
                        console.log(result);
                        console.log(result.isPass())
                        if(!result.isPass()){
                            // logger.log("リダイレクトします",JSON.stringify(result.redirectEvent));
                            const redirectResult = redirect(result.redirectEvent);
                            return redirectResult;
                        }
                      }catch(e){
                        console.log(e);
                        throw new Error("Middleware execution failed");
                      }
                  }
                }
                const controllerClass = route.controller;
                const action = route.method;
                const params = routeMatch.params;
                const controllerInstance = new controllerClass();

                // リクエストパラメーターをコントローラーに渡して実行
                return controllerInstance[action](request, params);
            }
        }
        throw new Error("Route not found");
    }

    // パスとルートを比較し、プレースホルダーを解析する
    matchRoute(path, routePath) {
        const pathParts = path.split('/');
        const routeParts = routePath.split('/');

        if (pathParts.length !== routeParts.length) return null;

        const params = {};
        for (let i = 0; i < pathParts.length; i++) {
            if (routeParts[i].startsWith('{') && routeParts[i].endsWith('}')) {
                const paramName = routeParts[i].slice(1, -1);
                params[paramName] = pathParts[i];
            } else if (pathParts[i] !== routeParts[i]) {
                return null;
            }
        }

        return { params };
    }
}
