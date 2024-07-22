import { configureParent, subscribeChild } from './iframe-comms.js';

configureParent();

subscribeChild('Micro Frontend One', `mfeB`);
subscribeChild('Micro Frontend Two', `mfeA`);
