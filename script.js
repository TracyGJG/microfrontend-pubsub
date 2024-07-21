import { configureParent, subscribeChild } from './iframe-comms.js';

configureParent();

subscribeChild(`mfe_1`, 2);
subscribeChild(`mfe_2`, 1);
