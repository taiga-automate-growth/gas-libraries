class Parameter {
  constructor() {
    this.formatType = "pdf"; // デフォルト形式
  }

  /**
   * エクスポート形式を指定
   * @param {"pptx"|"odp"|"pdf"|"txt"|"png"|"svg"|"jpg"|"jpeg"} format 
   */
  format(format) {
    format = format.toLowerCase();
    switch (format) {
      case "pptx":
      case "odp":
      case "pdf":
      case "txt":
      case "png":
      case "svg":
        this.formatType = format;
        break;
      case "jpg":
      case "jpeg":
        this.formatType = "jpeg";
        break;
      default:
        this.formatType = "pptx"; // fallback
        break;
    }
    return this;
  }

  /**
   * 実際にエクスポートに使うURLの一部
   */
  build() {
    return this.formatType;
  }

  /**
   * 拡張子として使う値
   */
  getExtension() {
    return this.formatType === "jpeg" ? "jpg" : this.formatType;
  }
}
