import pubSubHub from './pub-sub-hub.js';

const Hub = pubSubHub();

export default function configureMicrofrontend(...microfrontend) {
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
  microfrontend.forEach(subscribeMicrofrontend);
}

function subscribeMicrofrontend(subscriber) {
  const microFrontend = document.querySelector(`[title="${subscriber}"]`);

  const parameters = microFrontend.getAttribute('src').split(/[?&]/);
  console.log(parameters.length);
  const subscriptions = parameters.find(parameter =>
    /^subscriptions/.test(parameter)
  );
  if (!subscriptions.length) {
    console.error('No subscriptions found');
  }
  const subscribeTopics = subscriptions
    .replace(/subscriptions=/, '')
    .split(',');

  subscribeTopics.forEach(topic => {
    Hub.subscribe(topic, (topic, data) => {
      try {
        const payload = JSON.stringify({ topic, data });
        microFrontend.contentWindow.postMessage(payload, '*');
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
