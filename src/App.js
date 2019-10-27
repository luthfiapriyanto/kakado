import React, { Component } from 'react';
import {
  Platform,
} from 'react-native';
import Landing from './Landing';
import Recipient from './Recipient';
import { Route, Router, Switch } from './utils/Routing.web';


class App extends Component {

  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/recipient" component={Recipient} />
          </Switch>
        </Router>
    )
  }
}

let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);
