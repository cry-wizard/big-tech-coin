import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ThemeProvider, createTheme } from "@mui/material";
import Grid from "../Grid";
import "./styles.css";

export default function TabsComponent({ coins, isWatchlistPage, setSearch }) {
  const [value, setValue] = useState("grid");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#cc00ffdb",
      },
    },
  });

  const style = {
    color: "var(--white)",
    width: "50%",
    fontFamily: "Inter",
    textTransform: "capitalize",
  };

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <TabList onChange={handleChange} variant="fullWidth">
          <Tab label="Grid" value="grid" sx={style} />
          <Tab label="List" value="list" sx={style} />
        </TabList>
        <TabPanel value="grid">
          <div className="grid-flex">
            {coins.map((coin, i) => {
              return  <Grid coin={coin} key={i}/>
            })}
          </div>
        </TabPanel>
        <TabPanel value="list">
          <div>
            {coins.map((item, i) => {
              return (
                <p>
                  {i + 1}.{item.id}
                </p>
              );
            })}
          </div>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
