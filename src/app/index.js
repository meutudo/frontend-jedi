import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';

const Index = () => {
  return <App />
}

ReactDOM.render(<Index />, document.querySelector('.app'));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.bundle.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
