import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import * as serviceWorker from './serviceWorker';
import { Listings } from './sections';
import './styles/index.css'

const client = new ApolloClient({
    uri: "/api"
});

render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Listings title={"House Exchange Listing"}/>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
