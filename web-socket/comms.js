export function receiveFromRemote(eventHandler) {
  window.addEventListener('message', ({ data }) => {
    try {
      const payload = JSON.parse(data);
      if (payload.topic && payload.data) {
        eventHandler(payload.topic, payload.data);
      } else {
        throw Error('Invalid message from Remote');
      }
    } catch (err) {
      console.error(err.message);
    }
  });
}

export function sendToRemote(remote, data) {
  try {
    const payload = JSON.stringify(data);
    remote.contentWindow.postMessage(payload, '*');
  } catch (err) {
    console.error(err.message);
  }
}

export function sendToHost(data) {
  try {
    const payload = JSON.stringify(data);
    window.parent.postMessage(payload, '*');
  } catch (err) {
    console.error(err.message);
  }
}

export function receiveFromHost(eventHandler) {
  window.addEventListener('message', ({ data }) => {
    try {
      const payload = JSON.parse(data);
      if (payload.topic && payload.data) {
        eventHandler(payload.topic, payload.data);
      } else {
        throw Error('Invalid message from Remote');
      }
    } catch (err) {
      console.error(err.message);
    }
  });
}
