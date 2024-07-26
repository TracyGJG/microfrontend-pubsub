import { configureParent, subscribeChild } from './iframe-comms.js';

configureParent();

subscribeChild('Micro Frontend One', `TopicB`);
subscribeChild('Micro Frontend Two', `TopicA`, `TopicC`);
subscribeChild('Micro Frontend Three', `TopicD`);
subscribeChild('Micro Frontend Four', `TopicC`);
