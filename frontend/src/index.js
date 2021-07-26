import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from './store';

ReactDOM.render(
  <StateProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StateProvider>,
  document.getElementById('root')
);
