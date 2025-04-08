import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton, TextField, Button } from "@mui/material";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDark();
    } else {
      setLight();
    }
  }, []);

  const changeMode = () => {
    if (localStorage.getItem("theme") !== "dark") {
      setDark();
    } else {
      setLight();
    }
    setDarkMode(!darkMode);
    toast.success("Theme Changed!");
  };

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in/up logic here
    toast.success(isSignIn ? "Signed In!" : "Signed Up!");
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <MenuRoundedIcon className="link" />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="drawer-div">
          <a href="/">
            <p className="link">Home</p>
          </a>
          <a href="/compare">
            <p className="link">Compare</p>
          </a>
          <a href="/watchlist">
            <p className="link">Watchlist</p>
          </a>
          <a href="/dashboard">
            <p className="link">Dashboard</p>
          </a>
          <Switch checked={darkMode} onClick={changeMode} />
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
            <Button onClick={toggleForm} color="secondary" fullWidth>
              {isSignIn ? "Switch to Sign Up" : "Switch to Sign In"}
            </Button>
          </form>
        </div>
      </Drawer>
    </div>
  );
}
