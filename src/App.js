import { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { HomeScreen } from "./screens";

const api = () => {
  const response = fetch("http://localhost:3000/", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({okay: "allrightsldkjfghlskdjglskjfglksjfglksjfglksj\
    fgghlskdjglskjfglksjfglksjfglksjfgghlskdjglskjfglksjfglksjfglksjfgghlskdjg\
    lskjfglksjfglksjfglksjfgghlskdjglskjfglksjfglksjfglksjfgghlskdjglskjfglksjf\
    glksjfglksjfgghlskdjglskjfglksjfglksjfglksjfgghlskdjglskjfglksjfglksjfglksjf\
    gghlskdjglskjfglksjfglksjfglksjfgghlskdjglskjfglksjfglksjfglksjfgghlskdjglskj\
    fglksjfglksjfglksjfgghlskdjglskjfglksjfglksjfglksjfgghlskdjglskjfglksjfglksjfg\
    lksjfgghlskdjglskjfglksjfglksjfglksjfgghlskdjglskjfglksjfglksjfglksjfgghlskdjgl\
    skjfglksjfglksjfglksjfg"}) // body data type must match "Content-Type" header
  }).catch((err) => console.log("error", err));
};

const screens = {
  home: HomeScreen
};

const App = () => {
  const [screen, setScreen] = useState("home");
  const CurrentScreen = screens[screen];

  useEffect(() => {
    api();
  });
  
  return <CurrentScreen navigate={setScreen}/>;
}

export default App;