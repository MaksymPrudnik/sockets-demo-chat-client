import React, { useState } from "react";
import { GlobalStyles } from "./global";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useUsername } from "./hooks/hooks";

import MessagesWindow from "./components/MessagesWindow/MessagesWindow";
import NewMessageField from "./components/NewMessageField/NewMessageField";
import TopBar from "./components/TopBar/TopBar";
import Chanels from "./components/Chanels/Chanels";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { useEffect } from "react";

function App() {
  const username = useUsername();
  const [channelsToggle, setChannelsToggle] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (localStorage.getItem("theme")) setTheme(localStorage.getItem("theme"));
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  const switchChannelsToggle = () => {
    setChannelsToggle((toggle) => !toggle);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Router>
        <GlobalStyles />
        <div className="App">
          <TopBar
            username={username}
            toggleTheme={toggleTheme}
            switchChannelsToggle={switchChannelsToggle}
          />
          <div className="central-view">
            <Chanels
              toggle={channelsToggle}
              switchChannelsToggle={switchChannelsToggle}
            />
            <section
              className={`messages ${channelsToggle && "messages-hidden"}`}
            >
              <Switch>
                <Route path="/:channel">
                  <MessagesWindow username={username.value} />
                </Route>
              </Switch>
              <NewMessageField username={username.value} />
            </section>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
