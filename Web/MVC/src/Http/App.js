class App {
    constructor() {
        /**
         * @type {Router}
         */
        this.router = new Router();
    }

    boot() {
        // ここでルートを定義する
    }
    run(event) {
        const request = new Request(event);
        console.log(request);
        logger.log(`セッションID:${JSON.stringify(request.getSessionId())}\nパス：${JSON.stringify(request.getPath())}`)
        return this.router.routing(request);
    }
}
