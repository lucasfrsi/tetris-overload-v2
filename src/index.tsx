import React from 'react';
import ReactDOM from 'react-dom/client';

import GlobalStyle from '@/style/globalStyle';

import { Provider } from 'react-redux';
import { store } from '@/app/store';

import App from '@/app';

function getMountElement(id: string) {
  let element = document.getElementById(id);
  if (element) return element;

  element = document.createElement('div');
  element.id = id;
  document.body.appendChild(element);
  return element;
}

ReactDOM.createRoot(getMountElement('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
