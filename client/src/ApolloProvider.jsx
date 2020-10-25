import React from 'react';
import {ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from "@apollo/client";

const httpLink = createHttpLink({
    uri:"http://localhost:8181"
})

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