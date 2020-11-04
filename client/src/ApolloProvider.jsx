import {ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

// Create link to apollo server
const httpLink = createHttpLink({
    uri:"http://localhost:8181"
})

// Create link that attaches auth token from localStorage to request
const authLink = setContext((req, prevContext)=>{
    // 1. Get token
    const token = localStorage.getItem('jwt');
    // 2. Return headers object that contains an Authorization key with token based on existence of token
    return {
        headers:{
            Authorization: token ? `Bearer ${token}`: ''
        }
    }
})

// Init Apollo client with link to server
const client = new ApolloClient({
    // Concat Authorization link with link to apollo server, 
    // so every request contains Authorization header with token
    link:authLink.concat(httpLink),
    cache: new InMemoryCache()
})




export default client;