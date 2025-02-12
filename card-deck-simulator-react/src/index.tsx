// Below is importing the necessary modules from React and ReactDOM.
import React from 'react';
import ReactDOM from 'react-dom';

// Below is importing the root component of the application (App).
import App from './app';

// Below is rendering the root component (App) inside a StrictMode component.
ReactDOM.render(
  <React.StrictMode>
   <App />
  </React.StrictMode>,
  // Below is mounting the root component into the HTML element with the id 'root'.
  document.getElementById('root')
);