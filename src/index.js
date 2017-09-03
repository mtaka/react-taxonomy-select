import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App01';
//import App from './App02';
import App from './App03';
//import Widget from './cbt0';
//import Widget from './cbt1';
//import CheckboxTreeBlock from './cbt2';
import registerServiceWorker from './registerServiceWorker';

const initial = {
  checked: ['DISC', 'ITSVC'],
  expanded: ['INDUSTRIES', 'MFG', 'DIST', 'INFO', 'FIN']
}

ReactDOM.render(
  //<CheckboxTreeBlock initial={initial}/>,
  <App/>,
  document.getElementById('root'));

registerServiceWorker();

