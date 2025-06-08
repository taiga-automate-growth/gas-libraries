class TopView{
    constructor(url){
        const template = HtmlService.createTemplateFromFile("src/Views/Html/Top");
        template.url = url;
        const html = template.evaluate();
        return html;
    }
}