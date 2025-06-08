class DocumentLogger{
  constructor(docId){
    this.doc = DocumentApp.openById(docId).getBody();
  }

  log(content){
    const timestamp = Utilities.formatDate(new Date(), 'Asia/Tokyo','yyyy/MM/dd - HH:mm:ss');
    const text = `
    【${timestamp}】
    ${content}

    ----------------------------------------------------------------
    
    `
    this.doc.appendParagraph(text);
  }

  clear(){
    this.doc.clear();
  }
}
