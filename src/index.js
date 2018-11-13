import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
// import 'semantic-ui-css/semantic.min.css'


// import './styles.global.scss';


// THIS WAS HERE BEFORE AUTH
// ReactDOM.render(<App />, document.getElementById('root'));

// INCLUDED AFTER AUTH
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
