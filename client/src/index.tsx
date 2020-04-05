import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import * as serviceWorker from './serviceWorker';
import { Listings, Home, Host, Listing, User, NotFound } from './sections';
import './styles/index.css'

const client = new ApolloClient({
    uri: "/api"
});

const App = () => {
  return (
      <Router>
          <Switch>
              <Route exact={true} path={'/'} component={Home}/>
              <Route exact={true} path={'/host'} component={Host}/>
              <Route exact={true} path={'/listing'} component={Listing}/>
              <Route exact={true} path={'/listings/:location?'} component={Listings}/>
              <Route exact={true} path={'/user/:id'} component={User}/>
              <Route component={NotFound}/>
          </Switch>
      </Router>
  );
};

render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
