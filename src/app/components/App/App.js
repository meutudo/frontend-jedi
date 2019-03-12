import 'bootstrap/dist/css/bootstrap.min.css';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import ExampleComponent from '../ExampleComponent/ExampleComponent.js';

const App = () => (
  <div>
    Example Components: <ExampleComponent />
  </div>
);

export default hot(App);
