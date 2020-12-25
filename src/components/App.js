import React from "react";
import { Router, Route } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header></Header>
        <Route path="/" component={StreamList} exact></Route>
        <Route path="/streams/new" exact component={StreamCreate}></Route>
        <Route path="/streams/edit/:id" exact component={StreamEdit}></Route>
        <Route
          path="/streams/delete/:id"
          exact
          component={StreamDelete}
        ></Route>
        <Route path="/streams/show" exact component={StreamShow}></Route>
      </Router>
    </div>
  );
};

export default App;
