import {EventHandler} from "./event.handler";

export class EventAggregator {
  
  constructor() {
    this.eventLookup = {};
    this.messageHandlers = [];
  }

  publish(event, data) {
    let subscribers;
    let i;

    if (!event) {
      throw new Error('Event was invalid.');
    }

    if (typeof event === 'string') {
      subscribers = this.eventLookup[event];
      if (subscribers) {
        subscribers = subscribers.slice();
        i = subscribers.length;

        while (i--) {
          invokeCallback(subscribers[i], data, event);
        }
      }
    } else {
      subscribers = this.messageHandlers.slice();
      i = subscribers.length;

      while (i--) {
        invokeHandler(subscribers[i], event);
      }
    }
  }

  subscribe(event, callback) {
    let handler;
    let subscribers;

    if (!event) {
      throw new Error('Event channel/type was invalid.');
    }

    if (typeof event === 'string') {
      handler = callback;
      subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);
    } else {
      handler = new EventHandler(event, callback);
      subscribers = this.messageHandlers;
    }

    subscribers.push(handler);

    return {
      dispose() {
        let idx = subscribers.indexOf(handler);
        if (idx !== -1) {
          subscribers.splice(idx, 1);
        }
      }
    };
  }

  subscribeOnce(event, callback) {
    let subscription = this.subscribe(event, (a, b) => {
      subscription.dispose();
      return callback(a, b);
    });

    return subscription;
  }
}

function invokeCallback(callback, data, event) {
  try {
    callback(data, event);
  } catch (e) {
    console.error(e);
  }
}

function invokeHandler(handler, data) {
  try {
    handler.handle(data);
  } catch (e) {
    console.error(e);
  }
}
