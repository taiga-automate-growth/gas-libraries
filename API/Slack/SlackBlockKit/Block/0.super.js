class Block {
  constructor(type) {
    if (this.constructor === Block) {
      throw new Error("Block is an abstract class and cannot be instantiated directly.");
    }
    this.type = type;
  }
}
