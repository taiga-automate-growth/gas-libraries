class Button{
  constructor(text,actions = []){
    this.type = "buttons";
    this.text = text;
    this.actions = actions;
  }

  // サムネイルを設定
  setThumbnail(thumbnailImageUrl = null){
    this.thumbnailImageUrl = thumbnailImageUrl;
  }

  // アスペクト比を設定
  setimageAspectRatio(imageAspectRatio = null){
    this.imageAspectRatio = imageAspectRatio;
  }

  // サムネイルサイズを設定
  setimageSize(imageSize = null){
    this.imageSize = imageSize;
  }

  // サムネイル背景色を設定
  setimageBackgroundColor(imageBackgroundColor = null){
    this.imageBackgroundColor = imageBackgroundColor;
  }

  // タイトルを設定
  setTitle(title = null){
    this.title = title;
  }

  // デフォルトアクションを設定
  setdefaultAction(defaultAction = null){
    this.defaultAction = defaultAction;
  }

}