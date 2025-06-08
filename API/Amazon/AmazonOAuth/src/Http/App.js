class App {
    constructor() {
        /**
         * @type {Router}
         */
        this.router = new Router();
    }

    boot() {
        // ここでルートを定義する
        this.router.get("/", AuthController, "show");
        this.router.post("authorization", AuthController, "authorization");
        this.router.get("redirect", AuthController, "redirect");
    }
    run(event) {
        const request = new Request(event);
        console.log(request);
        return this.router.routing(request);
    }
}
