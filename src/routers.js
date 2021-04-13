import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main } from "./container";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    );
  }
}
