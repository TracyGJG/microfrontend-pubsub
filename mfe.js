import { publish, subscribe } from './iframe-comms.js';

const mfeUrl = new URL(document.baseURI);
const publishTopic = mfeUrl.searchParams.get('primary');
const subscribeTopic = mfeUrl.searchParams.get('secondary');

document.querySelector('h2').textContent += publishTopic;
document.querySelector(
  'h3'
).textContent = `The message received on ${subscribeTopic} appears below:`;
document.querySelector(
  '#sendMessage'
).textContent = `Send above message on ${publishTopic}`;

{
  const $message = document.querySelector('#message');
  const $messageText = document.querySelector('#messageText');

  subscribe(({ data }) => {
    try {
      const payload = JSON.parse(data);
      if (payload.topic === subscribeTopic) {
        $message.innerText = payload.data;
      }
    } catch (err) {
      console.error(err.message);
    }
  });

  document.querySelector('#sendMessage').addEventListener('click', function () {
    publish(publishTopic, $messageText.value);
  });
}
