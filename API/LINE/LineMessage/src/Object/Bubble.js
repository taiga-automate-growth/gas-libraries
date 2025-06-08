class Bubble extends Message{
  constructor(){
    super("bubble");
  }

  setHeader(header){
    if(header.isBox()){
      this.header = header;
    }
  }

  setHero(hero){
    if(hero.isBox() || hero.isImage() || hero.isVideo()){
      this.hero = hero;
    }
  }

  setBody(body){
    if(body.isBox()){
      this.body = body;
    }
  }

  setFooter(footer){
    if(footer.isBox()){
      this.footer = footer;
    }
  }
}