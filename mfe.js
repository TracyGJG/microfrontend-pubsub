import { sendToParent, receiveFromParent } from './iframe-comms.js';

const mfeUrl = new URL(document.baseURI);
const mfeId = +mfeUrl.searchParams.get('id');
document.querySelector('h2').textContent += mfeId;

const publishTopic = `mfe_${mfeId}`;
const subscribeTopic = (mfeId % 2) + 1;

document.querySelector(
  'h3'
).textContent = `The message received from mfe_${subscribeTopic} appears below:`;
document.querySelector(
  '#sendMessage'
).textContent = `Send above message from ${publishTopic} to mfe_${subscribeTopic}`;

{
  const $message = document.querySelector('#message');
  const $messageText = document.querySelector('#messageText');

  receiveFromParent(event => {
    message.innerText =
      typeof event.data === 'string' ? event.data : JSON.stringify(event.data);
  });

  document.querySelector('#sendMessage').addEventListener('click', function () {
    sendToParent({
      id: mfeId,
      data: $messageText.value,
    });
  });
}
