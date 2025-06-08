class Section extends Block {
  constructor() {
    super("section");
  }

  setText(text) {
    if (
      typeof text !== "object" ||
      !["plain_text", "mrkdwn"].includes(text.type) ||
      typeof text.text !== "string"
    ) {
      throw new Error("Section.setText(): `text` must be an object with type and text properties");
    }

    this.text = text;
    return this;
  }

  // accessory にセットするのは Button, Image など、1つの BlockElement だけ
  setAccessory(accessory) {
    if (this.accessory) {
      throw new Error("Only one accessory can be added.");
    }

    const validAccessoryTypes = ['Button', 'Image', 'Datepicker', 'StaticSelect']; // 必要なアクセサリークラスをリストアップ
    if (!validAccessoryTypes.includes(accessory.constructor.name)) {
      throw new Error("Accessory must be a valid BlockElement (Button, Image, etc.).");
    }

    this.accessory = accessory;
    return this;
  }

  // fields をセットするためのメソッド
  setFields(fields) {
    if (!Array.isArray(fields)) {
      throw new Error("Fields must be an array of TextComposition objects.");
    }

    if (fields.length > 10) {
      throw new Error("The maximum number of fields is 10.");
    }

    fields.forEach(field => {
      if (!(field instanceof TextComposition)) {
        throw new Error("Each field must be a TextComposition object.");
      }
    });

    this.fields = fields;
    return this;
  }
}
