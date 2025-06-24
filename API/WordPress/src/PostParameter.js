class PostParameter {
    constructor(title, content) {
      if (!title || !content) throw new Error("titleとcontentは必須です");
  
      this.data = {
        title,
        content,
        status: "draft",  // デフォルト
        meta: {}
      };
    }
  
    status(status) {
      this.data.status = status;
      return this;
    }
  
    categories(categoryIds) {
      this.data.categories = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
      return this;
    }
  
    tags(tagIds) {
      this.data.tags = Array.isArray(tagIds) ? tagIds : [tagIds];
      return this;
    }
  
    excerpt(excerpt) {
      this.data.excerpt = excerpt;
      return this;
    }
  
    slug(slug) {
      this.data.slug = slug;
      return this;
    }
  
    featuredMedia(mediaId) {
      this.data.featured_media = mediaId;
      return this;
    }
  
    author(authorId) {
      this.data.author = authorId;
      return this;
    }
  
    date(isoDate) {
      this.data.date = isoDate;
      return this;
    }
  
    meta(key, value) {
      this.data.meta[key] = value;
      return this;
    }
  
    build() {
      return this.data;
    }
  }
  