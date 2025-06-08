class AuthController {
    /**
     * 初期画面を表示する
     * @param {Request} request - リクエストオブジェクト
     * @returns {string} 認証URL
     */
    show(request){
        const url = ScriptApp.getService().getUrl();
        console.log("トップ画面を表示します", url);
        return new TopView(url);
    }

    /**
     * 認証を開始する
     * @param {Request} request - リクエストオブジェクト
     * @returns {string} 認証URL
     */
    authorization(request){
        const params = request.getParams();
        const applicationId = params.applicationId;
        const url = ScriptApp.getService().getUrl();
        const state = Utilities.getUuid();
        const oauthUrl = AmazonApp.getAuthorizationUrl(applicationId, url + `?path=redirect`, state);
        const clientId = params.clientId;
        const clientSecret = params.clientSecret;
        CacheService.getUserCache().put("amazon_oauth_cache",JSON.stringify({
            clientId: clientId,
            clientSecret: clientSecret,
            state: state,
        }));
        return new AuthorizationView(oauthUrl);
    }

    /**
     * 認証後のリダイレクト先
     * @param {Request} request - リクエストオブジェクト
     * @returns {string} リダイレクト先
     */
    redirect(request){
        const url = ScriptApp.getService().getUrl();
        try {
            const cache = CacheService.getUserCache();
            const cacheData = JSON.parse(cache.get("amazon_oauth_cache"));
            const clientId = cacheData.clientId;
            const clientSecret = cacheData.clientSecret;
            const stateFromCache = cacheData.state;
            console.log("stateFromCache", stateFromCache);
            const stateFromRequest = request.getParams().state;
            console.log("stateFromRequest", stateFromRequest);
            if (stateFromCache !== stateFromRequest) {
                throw new Error('CSRF検証に失敗しました');
            }
            const code = request.getParams().spapi_oauth_code;
            console.log("code", code);
            const refreshToken = AmazonApp.getRefreshToken(clientId, clientSecret, code, url + `?path=redirect`);
            console.log("refreshToken", refreshToken);
            cache.remove("amazon_oauth_cache");
            return new RedirectView(refreshToken);
        } catch (error) {
            console.log("error", error);
            return RedirectView.error(url);
        }
    }
}
