function doGet(e){
    e.method = "GET";
    const app = new App();
    app.boot();
    return app.run(e);
}

function doPost(e){
    e.method = "POST";
    const app = new App();
    app.boot();
    return app.run(e);
}