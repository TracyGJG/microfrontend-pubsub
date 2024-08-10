export default function configureMicrofrontend(
  publishTopics,
  subscribeTopics,
  sender,
  receiver,
  publish,
  subscriptions,
  sendMessage,
  messages,
  messageText
) {
  subscriptions.innerText += subscribeTopics.join(', ');
  const singlePublishedTopic = publishTopics.length === 1;
  if (singlePublishedTopic) {
    sendMessage.innerText += `: ${publishTopics.join()}`;
  } else {
    publish.insertAdjacentHTML(
      'beforeEnd',
      `<select id="selTopic">${publishTopics.map(
        topic => `<option>${topic}</option>`
      )}</select>`
    );
  }
  receiver((topic, data) => {
    messages.insertAdjacentHTML('afterBegin', `<p>${topic}, ${data}</p>`);
  });

  sendMessage.addEventListener('click', () => {
    sender({
      topic: singlePublishedTopic
        ? publishTopics[0]
        : document.querySelector('#selTopic').value,
      data: messageText.value,
    });
  });
}
