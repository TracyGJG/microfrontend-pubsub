import { publish, subscribe } from './iframe-comms.js';

const mfeUrl = new URL(document.baseURI);
const microFrontendTitle = mfeUrl.searchParams.get('title');
const publishTopics = mfeUrl.searchParams.get('publishes').split(',');
const subscribeTopics = mfeUrl.searchParams.get('subscriptions').split(',');

let publishTopic = publishTopics[0];

document.querySelector('#title').textContent = microFrontendTitle;
document.querySelector('#publishing').textContent += publishTopics.join(', ');
document.querySelector(
  '#subscriptions'
).textContent = `The messages received for topic(s): ${subscribeTopics.join(
  ', '
)} appear below:`;

{
  document.querySelector('#publish').innerHTML +=
    publishTopics.length - 1
      ? `<select id="selPublishTopics">${publishTopics.map(
          topic => `<option>${topic}</option>`
        )}</select>`
      : `<span>${publishTopic}</span>`;

  const $selPublishTopics = document.querySelector('#selPublishTopics');
  if ($selPublishTopics) {
    $selPublishTopics.addEventListener('change', evt => {
      publishTopic = evt.target.value;
    });
  }

  const $messages = document.querySelector('#messages');
  subscribeTopics.forEach(subscribeTopic => {
    subscribe(({ data }) => {
      try {
        const payload = JSON.parse(data);
        if (payload.topic === subscribeTopic) {
          $messages.innerHTML = `<p>${payload.topic}>&nbsp;${payload.data}</p>${$messages.innerHTML}`;
        }
      } catch (err) {
        console.error(err.message);
      }
    });
  });

  document.querySelector('#sendMessage').addEventListener('click', function () {
    publish(publishTopic, document.querySelector('#messageText').value);
  });
}
