import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createGlobalStyle } from "styled-components";
// import "./css/style.css";
// import "./scss/style.scss";

import Home from "./Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Main from "./pages/Main";

//css초기화
const GlobalStyle = createGlobalStyle`
  body {
    padding:0;
    margin:0;
  }
`;

const Routes = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    return function() {
      console.log("clean-up");
    };
  }, []);

  return (
    <>
      <Router history={createBrowserHistory} basename={"/"}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/main" component={Main} />
        </Switch>
      </Router>
      <GlobalStyle />
    </>
  );
};

export default Routes;
