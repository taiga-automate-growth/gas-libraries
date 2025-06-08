class View{
  static list(practices){
    const template = HtmlService.createTemplateFromFile("src/Views//Html/List");
    template.objects = practices;
    template.filters = [
      {
        name: "",
        placeholder: "",
        type: "text"
      },
      {
        name: "",
        type: "checkbox",
        category: "", // チェックボックスのname
        options: [
          { label: "", value: "" }
        ]
      }
    ]
    const html = template.evaluate()
    return html;
  }
}