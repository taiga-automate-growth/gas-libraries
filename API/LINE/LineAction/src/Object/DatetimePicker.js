class DatetimePicker extends Action{
  /**
   * @constructor
   * @param {string} data - Webhookを介して返却される文字列
   * @param {"date" | "time" | "datetime"} mode - アクションモード
   * @param {string} label - ラベル
   */
  constructor(data,mode,label){
    super("datetimepicker");
    this.data = data;
    this.mode = mode;
    this.setLabel(label);
  }

  /**
   * 初期値を設定する
   * @param {Date} - initial
   */
  setInitial(initial){
    const date = Utilities.formatDate(initial,"Asia/Tokyo","yyyy-MM-dd");
    const time = Utilities.formatDate(initial,"Asia/Tokyo","HH:mm");

    if(this.mode === "date"){
      this.initial = date;
      return;
    }
    
    if(this.mode === "time"){
      this.initial = time;
      return;
    }
    
    if(this.mode === "datetime"){
      this.initial = `${date}T${time}`;
      return;
    }
  }

  /**
   * 最大値を設定する
   * @param {Date} max - 最大値
   */
  setMax(max){
    const date = Utilities.formatDate(max,"Asia/Tokyo","yyyy-MM-dd");
    const time = Utilities.formatDate(max,"Asia/Tokyo","HH:mm");

    if(this.mode === "date"){
      this.max = date;
      return;
    }
    
    if(this.mode === "time"){
      this.max = time;
      return;
    }
    
    if(this.mode === "datetime"){
      this.max = `${date}T${time}`;
      return;
    }
  }

  /**
   * 最小値を設定する
   * @param {Date} min - 最小値
   */
  setMin(min){
    const date = Utilities.formatDate(min,"Asia/Tokyo","yyyy-MM-dd");
    const time = Utilities.formatDate(min,"Asia/Tokyo","HH:mm");

    if(this.mode === "date"){
      this.min = date;
      return;
    }
    
    if(this.mode === "time"){
      this.min = time;
      return;
    }
    
    if(this.mode === "datetime"){
      this.min = `${date}T${time}`;
      return;
    }
  }
}