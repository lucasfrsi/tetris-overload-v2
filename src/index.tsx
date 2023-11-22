import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/app';
import GlobalStyle from '@/style/globalStyle';

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
    <App />
  </React.StrictMode>,
);
