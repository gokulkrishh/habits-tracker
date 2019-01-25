import React, { Component } from "react";

import Home from "./Home";
import BottomBar from "./BottomBar";

import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
        <BottomBar />
      </div>
    );
  }
}

export default App;
