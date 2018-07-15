export class EventHandler {

  constructor(type, callback) {
    this.type = type;
    this.callback = callback;
  }

  handle(message) {
    if (message instanceof this.type) {
      this.callback.call(null, message);
    }
  }
}