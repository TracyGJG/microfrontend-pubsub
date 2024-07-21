# microfrontend-pubsub

A strategy for enabling communication between iframe-based microfrontends.

## Content

This project contains the following file:

- index.html - Parent application forming the container for 2 micro-frontends.
- mfe.html - Micro-frontend used for two child instance.

- script.js - Top-level script for initialising the publish and scribe (Pub-Sub) hub.
- pub-sub-hub.js - A module supporing the sharing of data from a publisher and providing it to all registered subscribers.
- iframe-comms.js - A module providing functions for sending data from the parent (index.html) to a iframe and for receiving data from the micro-frontend (iframe - child).
