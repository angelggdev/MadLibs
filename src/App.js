import React, { useState, useEffect } from "react";
import "./App.css";
import "tachyons";
import GridTitles from "./Components/GridTitles/GridTitles";
import Story from "./Components/Story/Story";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { StoryContextProvider } from "./contexts/StoryContext";
import Question from "./Components/Question/Question";

function App() {
  

  return (
    <BrowserRouter>
      <Switch>
        <StoryContextProvider>
          <Route exact path={process.env.PUBLIC_URL +"/"}>
            <GridTitles />
          </Route>
          <Route path={process.env.PUBLIC_URL +"/story/:storyId"}>
            <Question />
          </Route>
          <Route path={process.env.PUBLIC_URL + "/result"}>
            <Story />
          </Route>
        </StoryContextProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
