class Flex extends Message{
  constructor(altText,contents){
    super("flex");
    this.altText = altText;
    this.contents = contents;
  }
}