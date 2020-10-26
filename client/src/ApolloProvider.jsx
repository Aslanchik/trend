import React from 'react';
import {ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from "@apollo/client";

// Create link to apollo server
const httpLink = createHttpLink({
    uri:"http://localhost:8181"
})

// Init Apollo client with link to server
const client = new ApolloClient({
    link:httpLink,
    cache: new InMemoryCache()
})

const ApProvider = ({children})=>{
    return <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
}

export default ApProvider;