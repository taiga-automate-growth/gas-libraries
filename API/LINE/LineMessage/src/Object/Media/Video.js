class Video extends Media{
  constructor(originalContentUrl,previewImageUrl){
    super(originalContentUrl);
    this.type = "video";
    this.previewImageUrl = previewImageUrl;
  }

  // トラッキングIDをセットする
  setTrackingId(trackingId){
    this.trackingId = trackingId;
  }

}