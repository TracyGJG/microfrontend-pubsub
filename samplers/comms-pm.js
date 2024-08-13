export const sendToRemote = sendMessage;
export const sendToHost = sendMessage;

function sendMessage(data, target = window.parent) {
  try {
    const payload = JSON.stringify(data);
    target.postMessage(payload, '*');
  } catch (err) {
    console.error(err.message);
  }
}

export const receiveFromRemote = receiveMessage;
export const receiveFromHost = receiveMessage;

function receiveMessage(eventHandler) {
  window.addEventListener('message', ({ data }) => {
    try {
      const payload = JSON.parse(data);
      eventHandler(payload);
    } catch (err) {
      console.error(err.message);
    }
  });
}
