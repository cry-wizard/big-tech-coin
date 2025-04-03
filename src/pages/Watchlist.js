import React, { useEffect, useState } from "react";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import { get100Coins } from "../functions/get100Coins";

function Watchlist() {
  const [coins, setCoins] = useState([]);
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  useEffect(() => {
    if (watchlist.length > 0) {
      getData();
    }
  }, []); // No need to re-run this effect on state updates

  const getData = async () => {
    try {
      const allCoins = await get100Coins();
      if (allCoins) {
        const filteredCoins = allCoins.filter((coin) =>
          watchlist.includes(coin.id)
        );
        setCoins(filteredCoins);
      }
    } catch (error) {
      console.error("Error fetching watchlist data:", error);
    }
  };

  return (
    <div>
      <Header />
      {watchlist.length > 0 ? (
        <TabsComponent coins={coins} />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
