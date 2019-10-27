import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import matchMedia from 'react-native-match-media'
import firebase from 'firebase';

// Only for native, will already be set on web
// global.matchMedia = matchMedia;
ReactDOM.render(<App />, document.getElementById('root'));
//
// const config = {
//     databaseURL: 'https://gradire-83417.firebaseio.com',
//     projectId: 'gradire-83417',
// };
// firebase.initializeApp(config);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
