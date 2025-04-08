import React, { useEffect, useState } from "react";
import Button from "../Button";
import TemporaryDrawer from "./drawer";
import "./styles.css";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
    setDarkMode(theme === "dark");
  }, []);

  const changeMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setDarkMode(!darkMode);
    toast.success("Theme Changed!");
  };

  return (
    <div className="header">
      <h1>
        TradeXis<span style={{ color: "var(--blue)" }}> Pro</span>
      </h1>
      <div className="links">
        <Switch checked={darkMode} onChange={changeMode} />
        <a href="https://v0-crypto-landing-page-0gnwsk.vercel.app/"><p className="link">Home</p></a>
        <a href="/compare"><p className="link">Compare</p></a>
        <a href="/watchlist"><p className="link">Watchlist</p></a>
        <a href="/dashboard"><Button text="Dashboard" /></a>
      </div>
      <div className="drawer-component">
        <TemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
