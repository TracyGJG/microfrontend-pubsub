export default function pubSubHub() {
  const topics = {};

  return {
    publish,
    subscribe,
  };

  function publish(topic, data) {
    if (!topics[topic]) {
      topics[topic] = [];
    } else {
      topics[topic].forEach(subscriber => subscriber(data));
    }
  }

  function subscribe(topic, callback) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    topics[topic].push(callback);
  }
}
