import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./styles.css";
import Grid from "../Grid";
import List from "../List";
import Button from "../../Common/Button";

export default function TabsComponent({ coins, setSearch }) {
  const [value, setValue] = React.useState("grid");

  const handleChange = (event, newValue) => setValue(newValue);

  const handleClearSearch = () => {
    if (setSearch) setSearch("");
  };

  const style = {
    color: "var(--white)",
    "& .Mui-selected": { color: "var(--blue) !important" },
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    textTransform: "capitalize",
  };

  return (
    <TabContext value={value}>
      <div style={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} variant="fullWidth">
          <Tab label="Grid" value="grid" sx={style} />
          <Tab label="List" value="list" sx={style} />
        </TabList>
      </div>

      <TabPanel value="grid">
        <div className="grid-flex">
          {coins.length > 0 ? (
            coins.map((coin) => (
              <Grid coin={coin} key={coin.id} delay={(coin.id % 4) * 0.2} />
            ))
          ) : (
            <div>
              <h1 style={{ textAlign: "center" }}>
                Sorry, Couldn't find the coin you're looking for 😞
              </h1>
              <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
                <Button text="Clear Search" onClick={handleClearSearch} />
              </div>
            </div>
          )}
        </div>
      </TabPanel>

      <TabPanel value="list">
        <table className="list-flex">
          <tbody>
            {coins.length > 0 ? (
              coins.map((coin) => (
                <List coin={coin} key={coin.id} delay={(coin.id % 8) * 0.2} />
              ))
            ) : (
              <tr>
                <td colSpan="100%">
                  <h1 style={{ textAlign: "center" }}>
                    Sorry, Couldn't find the coin you're looking for 😞
                  </h1>
                  <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
                    <Button text="Clear Search" onClick={handleClearSearch} />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TabPanel>
    </TabContext>
  );
}
