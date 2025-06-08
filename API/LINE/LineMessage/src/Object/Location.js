class Location extends Message{
  constructor(title,address,latitude,longitude){
    super();
    this.type = "location";
    this.title = title;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
  }

}