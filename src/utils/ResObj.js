class ResObj {
  constructor(message, data = null) {
    this.code = 20000;
    this.message = message;
    if (data !== null) {
      this.data = data;
    }
  }
}

module.exports = ResObj;
