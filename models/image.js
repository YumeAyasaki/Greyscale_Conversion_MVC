class Image {
    constructor(id, name, data, format) {
      this.id = id;
      this.name = name;
      this.data = data;
      this.format = format;
      this.createdAt = Date.now();
    }
  }

module.exports = Image;