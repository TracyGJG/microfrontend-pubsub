# microfrontend-pubsub

A strategy for enabling communication between iframe-based micro-frontends, employing two different techniques.

## Content

This project contains the following file:

### Root-level files

- `index.html` - Index for the two Samplers and two Implementations
- `pub-sub-hub.js` - A very simple PubSub mechanism
- `styles.css` - Styling of the implementation application (host)
- `mfe-style.css` - Styling of the implementation microfrontend (remote)

### samplers folder

#### Post Message (PM)

- `comms-pm.html` - Library providing the Post Message approach to remote-host communication.
- `host-pm.html` - Application-level harness for the communications mechanism using the PM approach.
- `remote-pm.html` - MicroFrontend-level harness for the communications mechanism using the PM approach.

#### Custom Event (CE)

- `comms-ce.html` - Library providing the Custom Event approach to remote-host communication.
- `host-ce.html` - Application-level harness for the communications mechanism using the CE approach.
- `remote-ce.html` - MicroFrontend-level harness for the communications mechanism using the CE approach.

### custom-event & post-message folders

The folder structure and purpose of the files in both folders are the same but demonstrate different implementations.

- `comms.js` - Clones of the communication component from the samplers folder.
- `index.html` - The host element of the implmentation harness.
- `mfe-blu.html` - The right-hand remote element of the implementation (MF3).
- `mfe-grn.html` - The central remote element (MF2).
- `mfe-red.html` - The left-hand element (MF1).
- `mfe.js` - Wiring of the event handlers for the remote components (mfe-???.html).

## Screenshot

![Screenshot of the sampler running showing messages sent between the microfrontends](Screenshot.png 'Microfrontend and PubSub')

The iFrame on the left publishes messages of topic TopicA and subscribes to TopicB.
The middle iFrame publishes topic TopicB and subscribes to topics TopicA and TopicC.
The right iFrame publishes topics TopicA and TopicC, and subscrides to TopicB.

## Samplers

In the `samplers` folder there are two examples but they follow a common mechanism, but they exclde the pub-sub mechanism.

![Diagram showing the communication mechanism exercised by both samplers](samplers.png 'Sampler mechanics')

The `remote` (iframe) microfrontend issues the `sendToHost` and `recieveFromHost` calls that interact with the `recieveFromRemote` and `sendToRemote` calls in the `host` application.

## Exercise

![Illustration of a multi-microfrontend application](microfrontends.png 'Application Exericse')

1. Micro Frontend One (MF1) publishes a message on Topic A, that is only subscribed to by MF2.
1. MF2 publishes a message on Topic B, to which both MF1 & MF3 subscribe.
1. MF3 publishes a message on Topic A, that is again received by MF2.
1. MF3 publishes a message on Topic C, that is received by both MF1 & MF2.
