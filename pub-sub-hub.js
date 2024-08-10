export default function pubSubHub() {
  const topics = {};

  return {
    publish,
    subscribe,
  };

  function publish(topic, data) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    // console.info(`\nMessage published on topic '${topic}': ${data}`);

    topics[topic].forEach((subscriber, index) => {
      // console.info(
      //   `\t${index} - Message sent to subscriber of topic '${topic}': ${data}`
      // );
      subscriber(topic, data);
    });
  }

  function subscribe(topic, callback) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    topics[topic].push(callback);
  }
}
