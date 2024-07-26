import pubSubHub from './pub-sub-hub.js';

const Hub = pubSubHub();

export function configureParent() {
  window.addEventListener('message', ({ data }) => {
    try {
      const payload = JSON.parse(data);
      if (payload.topic && payload.data) {
        Hub.publish(payload.topic, payload.data);
      } else {
        throw Error('Invalid message from publisher');
      }
    } catch (err) {
      console.error(err.message);
    }
  });
}

export function subscribeChild(subscriber, ...topics) {
  topics.forEach(topic => {
    Hub.subscribe(topic, (topic, data) => {
      try {
        const payload = JSON.stringify({ topic, data });
        document
          .querySelector(`[title="${subscriber}"]`)
          .contentWindow.postMessage(payload, '*');
      } catch (err) {
        console.error(err.message);
      }
    });
  });
}

export function publish(topic, data) {
  try {
    const payload = JSON.stringify({ topic, data });
    window.parent.postMessage(payload, '*');
  } catch (err) {
    console.error(err.message);
  }
}

export function subscribe(eventHandler) {
  window.addEventListener('message', eventHandler);
}
