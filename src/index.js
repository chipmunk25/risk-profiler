
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import NextApp from './NextApp';
//import registerServiceWorker from './registerServiceWorker';


const render = Component => {
  ReactDOM.render(
    <Component />
    , document.getElementById('root'))
}

// Do this once
//registerServiceWorker();
//registerServiceWorker(); 
reportWebVitals();
// Render once
render(NextApp);

if (module.hot) {
  module.hot.accept('./NextApp', () => {
    render(NextApp);
  });
}
