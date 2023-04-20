import { Provider } from "react-redux";
import "./App.css";
import Home from "./pages/Home";
import { ApolloProvider } from "@apollo/client";
import { store } from "./app/store";
import { apolloClient } from "./graphql";
import ContextWrapper from "./ContextWrapper";

function App() {
  return (
    <ContextWrapper>
      <div className="App">
        <p>Hello World</p>
        <Home />
      </div>
    </ContextWrapper>
  );
}

export default App;
