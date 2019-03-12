import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/components/App/App.js';

const Client = () => {
  return <App />
}

ReactDOM.render(<Client />, document.querySelector('.app'));
