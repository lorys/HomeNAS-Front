import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { LoginScreen, DashboardScreen } from "./screens";

const screens = {
  dashboard: DashboardScreen,
};

const App = () => {
  const [screen, setScreen] = useState("dashboard");
  const CurrentScreen = screens[screen];

  return <CurrentScreen navigate={setScreen} />;
};

export default App;
