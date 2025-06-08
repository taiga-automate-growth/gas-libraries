class AuthorizationView{
    constructor(url){
      const template = HtmlService.createTemplateFromFile("src/Views/Html/Authorization");
      template.authorizationUrl = url;
      const html = template.evaluate();
      return html;
    }
  }