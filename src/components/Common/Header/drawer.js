import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton, Switch } from "@mui/material";
import { toast } from "react-toastify";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

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
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <MenuRoundedIcon className="link" />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="drawer-div">
          <a href="/"><p className="link">Home</p></a>
          <a href="/compare"><p className="link">Compare</p></a>
          <a href="/watchlist"><p className="link">Watchlist</p></a>
          <a href="/dashboard"><p className="link">Dashboard</p></a>
          <Switch checked={darkMode} onChange={changeMode} />
        </div>
      </Drawer>
    </div>
  );
}
