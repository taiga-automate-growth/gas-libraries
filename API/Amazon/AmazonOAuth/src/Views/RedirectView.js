class RedirectView{
    constructor(refreshToken){
      const template = HtmlService.createTemplateFromFile("src/Views/Html/Redirect");
      template.refreshToken = refreshToken;
      const html = template.evaluate();
      return html;
    }
    static error(url){
      const template = HtmlService.createTemplateFromFile("src/Views/Html/RedirectError");
      template.url = url;
      const html = template.evaluate();
      return html;
    }
  }