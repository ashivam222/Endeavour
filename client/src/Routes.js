//jshint esversion: 8
import React, {useState} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Navbar from "./core/components/Navbar";
import Footer from "./core/components/Footer"; 
import Team from "./core/components/Team";
import Sponsers from "./core/components/Sponsers";
import NotFoundPage from "./core/components/NotFoundPage";
import Loader from "./core/components/Loader";


const Routes = () => {

  const [hide, setHide] = useState(true);

    setTimeout(() => {
        setHide(false);
    }, 3500);

  return (
    <React.Fragment>
      { hide ? <Loader /> : null }
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup}/>
          <Route path="/signin" exact component={Signin} />
          <Route path="/team" exact component={Team} />
          <Route path="/sponsers" exact component={Sponsers} />
          <Route path="/:random" component={NotFoundPage}/>
          <Route exact path="/">
</Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </React.Fragment>
  );
};

export default Routes;
