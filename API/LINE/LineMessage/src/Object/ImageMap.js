class ImageMap extends Message{
  constructor(baseUrl,altText,baseSizeWidth,baseSizeHeight,actions){
    super();
    this.type = "imagemap";
    this.baseUrl = baseUrl;
    this.altText = altText;
    this.baseSize = {
      baseSizeWidth,
      baseSizeHeight
    }
    this.actions = actions;
    this.video = {};
    this.externalLink = {};
  }

  // ビデオプロパティにコンテンツのURLをセット
  setOriginalContentUrl(originalContentUrl){
    this.video.originalContentUrl = originalContentUrl;
  }

  // ビデオプロパティにサムネイルURLをセット
  setPreviewImageUrl(previewImageUrl){
    this.video.previewImageUrl = previewImageUrl;
  }

  // ビデオプロパティにエリアオブジェクトをセット
  setArea(area){
    this.video.area = area;
  }

  // 動画再生後に表示されるラベルの遷移先URLを設定
  setLinkUrl(linkUrl){
    this.externalLink.linkUrl = linkUrl;
  }

  // 動画再生後に表示されるラベルの設定
  setLabel(label){
    this.externalLink.label = label;
  }

}
