class Model{
  constructor(){

  }

  /**
   * コンストラクタを返却する
   */
  self(){
    return this.constructor;
  }

  /**
   * PKを取得する
   * @return {string} 主キー
   */
  static pk(){
    return "ID";
  }

  /**
   * DBを取得する
   * @return {SheetDAO}
   */
  static db(){
    return SheetDAO.create(dbId,"");
  }

    /**
   * 関連テーブルを定義
   */
  static relation(){
      // {
      //   table:,
      //   localKey:,
      //   foreignKey:
      //   as:
      // }
    return [
    ]
  }

  /**
   * モデルを生成
   * @param {Object} params - パラメーター
   * @return {}
   */
  static create(params){
    try{
      const db = this.db();
      const lastId = db.getLastId("ID");
      let newId = lastId === null ? 1 : Number(lastId) + 1; // 新しいIDを生成
      return new this([newId]);
      
    }catch(e){
      console.error(e);
    }
  }

  /**
   * 関連テーブルのIDで復元する
   * @param { string } foreignKeyName - 外部キーのカラム名
   * @param { Array<string> | Array<number> } foreignKey - 外部キー
   * @return {Array<Table>}
   */
  static findByRelationIds(foreignKeyName,foreignKey){
    try{
      const self = this.self();
      const db = self.db();
      const query = db.query(foreignKeyName,"一致",foreignKey);
      return db.get([query]).map( data => new this(data));
    }catch(e){
      console.error(e);
    }
  }

  /**
   * モデルを一括生成
   * @param {Object} params - パラメーター
   * @return {Array<>}
   */
  static createAll(params){
    const db = this.db(); // データベースにアクセス
    const lastId = db.getLastId("ID"); // 最後のIDを取得
    let newId = lastId === null ? 1 : Number(lastId) + 1; // 新しいIDを生成
    return Object.keys(params.object).map(index => {
        const obj = new this([newId]);
        newId++;
        return obj;
    });
  }

  /**
   * IDで取得する
   * @param { string | number } id - ID
   * @return {Property}
   */
  static findById(id){
    try{
      const db = this.db();
      const query = db.query()
      .where(this.pk(),"=",[id])
      .join("Modelプロパティ","ID","モデルID","properties",
        db.query()
        .join("カラム","対応カラム","ID","column")
      );
      const data = db.get(query)[0];
      const model = new this(data);
      model.setChildren("properties",data.properties.map(property => {
          const prop = new Property(property);
          prop.setParent("column",new Column(property.column[0]));
          return prop;
        })
      );
      return model;
    }catch(e){
      console.error(e);
    }
  }

  /**
   * 一括で復元する
   * @return {Array<>}
   */
  static all(){
    const db = this.db();
    const datas = db.get();
    return datas.map(data => {
      return new this(data);
    });
  }


  /**
   * 子データも含めた条件を一括で復元する
   */
  static allWithChildren(){
    const db = this.db();
    const query = db.query()
    this.relation().forEach(relation => {
      query.join(relation.table,relation.localKey,relation.foreignKey,relation.as);
    });

    const datas = db.get(query);
    return datas.map(data => {
      const obj = new this(data);
      this.relation().forEach(relation => {
        obj.setChildren(relation.as,data[relation.as]);
      });
      return obj;
    });

  }

  /**
   * 保存する
   * @return {boolean} 保存できればtrue,それ以外はfalse
   */
  save(){
    try{
      const lock = LockService.getDocumentLock();
      const sucess = lock.tryLock(10000);
      if(sucess){
        const self = this.self();
        const db = self.db();
        const pk = self.pk();
        const saved = db.get().reduce((acc, row) => {
          acc[row[pk]] = Object.values(row);
          return acc;
        },{});

        saved[this.id] = Object.values(this);
        db.deleteAll();
        db.set(Object.values(saved));
        return true;
    }
    }catch(e){
      console.error(e);
      return false;
    }
  }

  /**
   * 一括保存
   * @param {Array<>} objects - パラメーターの配列
   */
  static saveAll(objects){

    try {
      const lock = LockService.getDocumentLock();
      const sucess = lock.tryLock(10000);
      if(sucess){
        const db = this.db();
        const pk = this.pk();
        const saved = db.get().reduce((acc, row) => {
          acc[row[pk]] = Object.values(row);
          return acc;
        },{});

        objects.forEach(object => {
          saved[object.id] = Object.values(object);
          console.log(saved)
        });
        db.deleteAll();
        db.set(Object.values(saved));
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  update(params){
    const keys = [];

    keys.forEach(key => {
      if (key in params) {
        this[key] = params[key];
      }
    });
  }

  delete(){
    try{
      const lock = LockService.getDocumentLock();
      const sucess = lock.tryLock(10000);
      if(sucess){
        const self = this.self();
        const db = self.db();
        const pk = self.pk();
        const saved = db.get().reduce((acc, row) => {
          acc[row[pk]] = Object.values(row);
          return acc;
        },{});

        delete saved[this.id];
        db.deleteAll();
        db.set(Object.values(saved));
        return true;
    }
    }catch(e){
      console.error(e);
      return false;
    }
  }

  /**
   * 全てのプロパティを配列として取得する
   * @return {Array<string>}
   */
  getAsArray(){
    return Object.values(this);
  }

}