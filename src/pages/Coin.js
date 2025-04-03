import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Info from "../components/CoinPage/Info";
import LineChart from "../components/CoinPage/LineChart";
import SelectDays from "../components/CoinPage/SelectDays";
import ToggleComponents from "../components/CoinPage/ToggleComponent";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import List from "../components/Dashboard/List";
import { getCoinData } from "../functions/getCoinData";
import { getPrices } from "../functions/getPrices";
import { settingChartData } from "../functions/settingChartData";
import { settingCoinObject } from "../functions/settingCoinObject";

function Coin() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
  const [coin, setCoin] = useState(null);
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id, days, priceType]); // Corrected dependencies for re-fetching data when necessary

  const getData = async () => {
    setLoading(true);
    setError(false);
    
    try {
      const coinData = await getCoinData(id);
      if (!coinData) throw new Error("Coin data not found");

      settingCoinObject(coinData, setCoin);

      const prices = await getPrices(id, days, priceType);
      if (prices) {
        settingChartData(setChartData, prices);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {!error && !loading && coin ? (
        <>
          <div className="grey-wrapper">
            <List coin={coin} delay={0.5} />
          </div>
          <div className="grey-wrapper">
            <SelectDays handleDaysChange={(e) => setDays(e.target.value)} days={days} />
            <ToggleComponents priceType={priceType} handlePriceTypeChange={(e) => setPriceType(e.target.value)} />
            <LineChart chartData={chartData} />
          </div>
          <Info title={coin.name} desc={coin.desc} />
        </>
      ) : error ? (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, couldn't find the coin you're looking for 😞
          </h1>
          <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
            <Link to="/dashboard">
              <Button text="Dashboard" />
            </Link>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Coin;
