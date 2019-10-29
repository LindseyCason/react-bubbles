import React, { useState } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"
import BubblePage from "./components/BubblePage"

import Login from "./components/Login";
import "./styles.scss";

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
        {/* <NavLink to="/api/login">Login Page </NavLink>
        <NavLink to="/protected">Secret Bubbles Room</NavLink> */}

      <PrivateRoute exact path="/protected" component={BubblePage} />

        <Route exact path="/" render={props => <Login {...props} />} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;
