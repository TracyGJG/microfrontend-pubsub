# microfrontend-pubsub

A strategy for enabling communication between iframe-based micro-frontends.

## Content

This project contains the following file:

- `index.html` - Parent application forming the container for 2 micro-frontends.
- `mfe.html` - Micro-frontend used for two child instance.

- `pub-sub-hub.js` - A module supporing the sharing of data from a publisher and providing it to all registered subscribers.
- `iframe-comms.js` - A module providing functions for communicating between iframes and the containing page.
  - configureParent: Sending data from the parent (index.html) to an iframe
  - subscribeChild: Receiving data from the micro-frontend (iframe - child)
  - sendToParent: Sending data from an iframe to the paranet
  - receiveFromParent: Receiving data from the parent
- `mfe.js` - The script supporting the micro-frontend (iFrame) component to wire up the UI elements with the iframe comms.

## Screenshot

![Screenshot of the sampler running showing messages sent between the microfrontends](Screenshot.png 'Microfrontend and PubSub')

The iFrame on the left publishes messages of topic TopicA and subscribes to TopicB.
The middle iFrame publishes topic TopicB and subscribes to topics TopicA and TopicC.
The right iFrame publishes topics TopicA and TopicC, and subscrides to TopicB.

## Exercise

![Illustration of a multi-microfrontend application](Microfrontends.png 'Application Exericse')

1. Micro Frontend One (MF1) publishes a message on Topic A, that is only subscribed to by MF2.
1. MF2 publishes a message on Topic B, to which both MF1 & MF3 subscribe.
1. MF3 publishes a message on Topic A, that is again received by MF2.
1. MF3 publishes a message on Topic C, that is received by both MF1 & MF2.
