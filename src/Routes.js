import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
// import "./css/style.css";
import "./scss/style.scss";

import Home from "./Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const Routes = () => {
  return (
    <Router history={createBrowserHistory} basename={"/"}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </Switch>
    </Router>
  );
};

export default Routes;
