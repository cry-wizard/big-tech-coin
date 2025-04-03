import React, { useEffect, useState } from "react";
import Info from "../components/CoinPage/Info";
import LineChart from "../components/CoinPage/LineChart";
import ToggleComponents from "../components/CoinPage/ToggleComponent";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import SelectCoins from "../components/ComparePage/SelectCoins";
import List from "../components/Dashboard/List";
import { get100Coins } from "../functions/get100Coins";
import { getCoinData } from "../functions/getCoinData";
import { getPrices } from "../functions/getPrices";
import { settingChartData } from "../functions/settingChartData";
import { settingCoinObject } from "../functions/settingCoinObject";

function Compare() {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  // Selected cryptocurrencies
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");

  // Coin data
  const [coin1Data, setCoin1Data] = useState(null);
  const [coin2Data, setCoin2Data] = useState(null);

  // Chart settings
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getData();
  }, [crypto1, crypto2, days, priceType]); // Refetch data when these values change

  const getData = async () => {
    try {
      setLoading(true);
      const coins = await get100Coins();
      if (!coins) throw new Error("Failed to fetch coin list");

      setAllCoins(coins);

      const data1 = await getCoinData(crypto1);
      const data2 = await getCoinData(crypto2);
      if (!data1 || !data2) throw new Error("Failed to fetch coin data");

      settingCoinObject(data1, setCoin1Data);
      settingCoinObject(data2, setCoin2Data);

      const prices1 = await getPrices(crypto1, days, priceType);
      const prices2 = await getPrices(crypto2, days, priceType);
      settingChartData(setChartData, prices1, prices2);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onCoinChange = (e, isCoin2) => {
    const newCrypto = e.target.value;
    if (isCoin2) {
      setCrypto2(newCrypto);
    } else {
      setCrypto1(newCrypto);
    }
  };

  return (
    <div>
      <Header />
      {loading || !coin1Data || !coin2Data ? (
        <Loader />
      ) : (
        <>
          <SelectCoins
            allCoins={allCoins}
            crypto1={crypto1}
            crypto2={crypto2}
            onCoinChange={onCoinChange}
            days={days}
            handleDaysChange={(e) => setDays(e.target.value)}
          />
          <div className="grey-wrapper">
            <List coin={coin1Data} />
          </div>
          <div className="grey-wrapper">
            <List coin={coin2Data} />
          </div>
          <div className="grey-wrapper">
            <ToggleComponents
              priceType={priceType}
              handlePriceTypeChange={(e) => setPriceType(e.target.value)}
            />
            <LineChart chartData={chartData} multiAxis />
          </div>
          <Info title={coin1Data.name} desc={coin1Data.desc} />
          <Info title={coin2Data.name} desc={coin2Data.desc} />
        </>
      )}
    </div>
  );
}

export default Compare;
