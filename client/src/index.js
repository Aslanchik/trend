import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import ApProvider from "./ApolloProvider";

ReactDOM.render(
  <React.StrictMode>
    <ApProvider>
      <App />
    </ApProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
