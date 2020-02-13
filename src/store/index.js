import { createStore } from 'redux';

import rootReducer from './modules/rootReducer';

// faz parte da config do reactotron
const enhancer =
  process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

const store = createStore(rootReducer, enhancer);

export default store;
