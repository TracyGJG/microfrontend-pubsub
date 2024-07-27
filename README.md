# microfrontend-pubsub

A strategy for enabling communication between iframe-based micro-frontends.

## Content

This project contains the following file:

- index.html - Parent application forming the container for 2 micro-frontends.
- mfe.html - Micro-frontend used for two child instance.

- pub-sub-hub.js - A module supporing the sharing of data from a publisher and providing it to all registered subscribers.
- iframe-comms.js - A module providing functions for communicating between iframes and the containing page.
  - configureParent: Sending data from the parent (index.html) to an iframe
  - subscribeChild: Receiving data from the micro-frontend (iframe - child)
  - sendToParent: Sending data from an iframe to the paranet
  - receiveFromParent: Receiving data from the parent
- mfe.js - The script supporting the micro-frontend (iFrame) component to wire up the UI elements with the iframe comms.

## Screenshot

![Screenshot of the sampler running showing messages sent between the microfrontends](Screenshot.png 'Microfrontend and PubSub')

The iFrame on the left publishes messages of topic TopicA and subscribes to TopicB.
The middle iFrame publishes topic TopicB and subscribes to topics TopicA and TopicC.
The right iFrame publishes topics TopicA and TopicC, and subscrides to TopicB.

Exercise

1. Send a message on TopicA from left-hand-side (LHS). The message appears in middle panel.
2. Send a message on TopicA from the middle panel. The message appears in both the LHS and RHS panels.
3. Send a message on TopicA from the RHS panel. The message appears in the LHS panel.
4. Send a message on TopicC from the RHS panel. The message appears in both the LHS and middle panels.
