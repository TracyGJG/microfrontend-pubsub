export const sendToRemote = sendMessage('subscribe');
export const sendToHost = sendMessage('publish');

function sendMessage(direction) {
  return (data, target = window.parent.document) => {
    const custEvt = new CustomEvent(direction, { detail: data });
    target.dispatchEvent(custEvt);
  };
}

export const receiveFromRemote = receiveMessage('publish');
export const receiveFromHost = receiveMessage('subscribe');

function receiveMessage(direction) {
  return (target, callBack) => {
    target.addEventListener(direction, e => callBack(e.detail));
  };
}
