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

* The micro-frontend (MFE) on the left publishes messages of topic TopicA and subscribes to TopicB and TopiC.
* The middle MFE publishes topic TopicB and subscribes to topics TopicA and TopicC.
* The right MFE publishes topics TopicA and TopicC, and subscrides to TopicB.

However, none of the MFEs interface with the others, only with the host application.

## Samplers

In the `samplers` folder there are two examples that follow a common mechanism, but they exclude the pub-sub mechanism.

![Diagram showing the communication mechanism exercised by both samplers](samplers.png 'Sampler mechanics')

The `remote` (iframe) microfrontend issues the `sendToHost` and `recieveFromHost` calls that interact with the `recieveFromRemote` and `sendToRemote` calls in the `host` application.

## Exercise

![Illustration of a multi-microfrontend application](exercise.png 'Application Exericse')

1. Micro-frontend One (MF1) publishes a message on Topic A that is only subscribed to by MF2.
1. MF2 publishes a message on Topic B, to which both MF1 and MF3 subscribe.
1. MF3 publishes a message on Topic A that is again received by MF2, only.
1. MF3 can also publish a message on Topic C that is received by both MF1 and MF2.

## NB

It appears that custom events fail CORS restrictions crossing the iFrame boundary. This means, out of the two communication approaches exercised in this project, only the Post Message mechanism works when the URL of the iFrame content is from a different origin to the containing page.  
