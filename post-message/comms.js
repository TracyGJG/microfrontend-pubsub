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

export const receiveFromRemote = receiveMessage('Remote');
export const receiveFromHost = receiveMessage('Host');

function receiveMessage(target) {
  return eventHandler => {
    window.addEventListener('message', ({ data }) => {
      try {
        const payload = JSON.parse(data);
        if (payload.topic && payload.data) {
          eventHandler(payload.topic, payload.data);
        } else {
          throw Error(`Invalid message from ${target}`);
        }
      } catch (err) {
        console.error(err.message);
      }
    });
  };
}
