class Model{
  constructor(){

  }

  /**
   * コンストラクタを返却する
   * @return {this.constructor}
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
      //   foreignKey:,
      //   as:,
      //   class:
      // }
    return [
    ]
  }

  /**
   * モデルを生成
   * @param {Object} params - パラメーター
   * @return {this}
   */
  static create(params){
    try{
      const db = this.db();
      const lastId = db.getLastId("ID");
      let newId = lastId === null ? 1 : Number(lastId) + 1; // 新しいIDを生成
      params[this.pk()] = newId;
      return new this(params);
      
    }catch(e){
      console.error(e);
    }
  }

  /**
   * モデルを一括生成
   * @param {Object} params - パラメーター
   * @return {Array<this>}
   */
  static createAll(params){
    const db = this.db(); // データベースにアクセス
    const lastId = db.getLastId("ID"); // 最後のIDを取得
    let newId = lastId === null ? 1 : Number(lastId) + 1; // 新しいIDを生成
    return params.map(param => {
          param[this.pk()] = newId;
          const obj = new this(param);
          newId++;
          return obj;
      });
  }

  /**
   * IDで取得する
   * @param { string | number } id - ID
   * @return {this}
   */
  static findById(id){
    try{
      const db = this.db();
      const query = db.query()
      .where(this.pk(),"=",[id]);
      const data = db.get(query)[0];

      return new this(data);
    }catch(e){
      console.error(e);
    }
  }

  /**
   * 関連テーブルのIDで復元する
   * @param { string } foreignKeyName - 外部キーのカラム名
   * @param { Array<string> | Array<number> } foreignKey - 外部キー
   * @param {Array<this>}
   */
  static findByRelationIds(foreignKeyName,foreignKey){
    try{
      const db = this.db();
      const query = db.query()
      .where(foreignKeyName,"=",foreignKey);
      return db.get(query).map( data => new this(data));
    }catch(e){
      console.error(e);
    }
  }

  /**
   * 一括で復元する
   * @return {Array<this>}
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
   *
   * @return {Array<this>}
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
        const children = data[relation.as].map(child => new relation.class(child));
        obj.setChildren(relation.as,children);
      });
      return obj;
    });

  }

  /**
     * ページネーションを取得する
     * @param {string} request - リクエストパラメーター（例: "manager=山田&limit=10&page=2"）
     * @return {Object} ページネーション
     */
  static paginate(request){
    const db = this.db();
    const query = db.query();

    // デフォルト値
    let limit = 50;
    let page = 1;

    // クエリパラメータをパース
    const params = request.split("&");
    params.forEach(param => {
      const [key, value] = param.split("=");
      if (key === "limit") {
        limit = Number(value) || 50;
      } else if (key === "page") {
        page = Number(value) || 1;
      } else if (value !== undefined) {
        // 複数値対応
        const values = value.includes(",") ? value.split(",") : [value];
        query.where(key, "=", values);
      }
    });

    // ページネーション用のoffset, limitをクエリにセット
    query.limit(limit);
    query.offset((page - 1) * limit);

    const datas = db.get(query);
    const objects = datas.map(data => new this(data));

    // 総件数取得用クエリ（ページングなし）
    const total = db.count();
    const pages = Math.ceil(total / limit);

    return {
      tasks: objects,
      pagination: {
        total: total,
        pages: pages,
        currentPage: page,
        maxCount: limit
      }
    };
  }

  /**
   * DBを書き換える
   * @param {Array<Object>} objects - パラメーターの配列
   */
  static replace(objects){
    try{
      const lock = LockService.getScriptLock();
      const sucess = lock.tryLock(10000);
      if(sucess){
        const db = this.db();
        db.deleteAll();
        db.set(objects);
      }
      return true;
    }catch(e){
      console.error(e);
      return false;
    }
  }

  /**
   * 保存する
   * @return {boolean} 保存できればtrue,それ以外はfalse
   */
  save(){
      const self = this.self();
      const db = self.db();
      const pk = self.pk();
      const saved = db.get().reduce((acc, row) => {
        acc[row[pk]] = Object.values(row);
        return acc;
      },{});

      saved[this.id] = Object.values(this);
      return self.replace(Object.values(saved));
  }

  /**
   * 一括保存
   * @param {Array<this>} objects - パラメーターの配列
   */
  static save(objects){
      const db = this.db();
      const pk = this.pk();
      const saved = db.get().reduce((acc, row) => {
        acc[row[pk]] = Object.values(row);
        return acc;
      },{});

      objects.forEach(object => {
        saved[object.id] = Object.values(object);
      });
      return this.replace(Object.values(saved));
  }


  update(params){
    const editable = [
      {
        key: "",
        property: ""
      }
    ];
  
    editable.forEach(obj => {
      if (obj.key in params) {
        this[obj.property] = params[obj.key];
      }
    });
  }

  delete(){
      const self = this.self();
      const db = self.db();
      const pk = self.pk();
      const saved = db.get().reduce((acc, row) => {
        acc[row[pk]] = Object.values(row);
        return acc;
      },{});

      delete saved[this.id];
      return self.replace(Object.values(saved));
  }

  static delete(ids){
      const db = this.db();
      const pk = this.pk();
      const saved = db.get().reduce((acc, row) => {
        acc[row[pk]] = Object.values(row);
        return acc;
      },{});

      ids.forEach(id => {
        delete saved[id];
      });
      return this.replace(Object.values(saved));
  }

  /**
   * 子データを紐づける
   * @param {string} childrenName - 子データの名前
   * @param {Array<Object>} children - 子データ
   */
  setChildren(childrenName,children){
    this[childrenName] = children;
  }

}