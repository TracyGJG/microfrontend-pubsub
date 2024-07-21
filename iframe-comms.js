import pubSubHub from './pub-sub-hub.js';

const Hub = pubSubHub();

export function configureParent() {
  window.addEventListener('message', ({ data }) => {
    try {
      const payload = JSON.parse(data);
      if (payload.id && payload.data) {
        Hub.publish(`mfe_${payload.id}`, payload.data);
      } else {
        throw Error('Invalid message from publisher');
      }
    } catch (err) {
      console.error(err.message);
    }
  });
}

export function subscribeChild(topic, subscription) {
  Hub.subscribe(topic, data => {
    document
      .querySelector(`[src$="?id=${subscription}"]`)
      .contentWindow.postMessage(data, '*');
  });
}

export function sendToParent(message) {
  try {
    const payload = JSON.stringify(message);
    window.parent.postMessage(payload, '*');
  } catch (err) {
    console.error(err.message);
  }
}

export function receiveFromParent(eventHandler) {
  window.addEventListener('message', eventHandler);
}
