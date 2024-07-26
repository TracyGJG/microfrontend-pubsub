import { publish, subscribe } from './iframe-comms.js';

const mfeUrl = new URL(document.baseURI);
const publishTopic = mfeUrl.searchParams.get('publish');
const subscribeTopics = mfeUrl.searchParams.get('subscriptions').split(',');

document.querySelector('h2').textContent += publishTopic;
document.querySelector(
  'h3'
).textContent = `The messages received for topic(s): ${subscribeTopics.join(
  ', '
)} appear below:`;
document.querySelector(
  '#sendMessage'
).textContent = `Publish above message on topic: ${publishTopic}`;

{
  const $messages = document.querySelector('#messages');
  const $messageText = document.querySelector('#messageText');

  subscribeTopics.forEach(subscribeTopic => {
    subscribe(({ data }) => {
      try {
        const payload = JSON.parse(data);
        if (payload.topic === subscribeTopic) {
          $messages.innerHTML = `<p>${payload.data}</p>${$messages.innerHTML}`;
        }
      } catch (err) {
        console.error(err.message);
      }
    });
  });

  document.querySelector('#sendMessage').addEventListener('click', function () {
    publish(publishTopic, $messageText.value);
  });
}
