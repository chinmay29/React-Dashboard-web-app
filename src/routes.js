import React from "react";
import { IndexRoute, Route } from "react-router";
//import { isLoaded as isAuthLoaded, load as loadAuth } from "redux/modules/auth";
import {
    App,
    Android,
    Home,
    NotFound,
    IOS,
    Studio,
    ResultView
  } from "./containers";

export default (store) =>
      <Route path="/" component={App}>
      { /* Home (main) route */ }
        <IndexRoute component={Home}/>
          { /* Routes */ }
          <Route path="android" component={Android}/>
          <Route path="ios" component={IOS}/>
          <Route path="resultView/:os/:date/:runId/:passTests" name="ResultView" component={ResultView}/>
          <Route path="studio" component={Studio}/>
          { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404} />
        </Route>
        ;
