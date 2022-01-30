import "./App.css";
import Home from "./components/Home";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
