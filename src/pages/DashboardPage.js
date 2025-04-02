import React, { useEffect, useState } from "react";
import axios from "axios";
import Headers from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import Search from "../components/Dashboard/Search";
import PaginationComponents from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";

const DashboardPage = () => {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 when searching
  };

  // Fetch coins on initial render
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        setCoins(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("ERROR:", error);
        setIsLoading(false);
      });
  }, []);

  // Apply filtering and pagination when `coins`, `page`, or `search` change
  useEffect(() => {
    const filteredCoins = coins.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.symbol.toLowerCase().includes(search.toLowerCase())
    );

    const previousIndex = (page - 1) * 10;
    setPaginatedCoins(filteredCoins.slice(previousIndex, previousIndex + 10));
  }, [coins, page, search]);

  return (
    <>
      <Headers />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={paginatedCoins} />
          <PaginationComponents
            page={page}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default DashboardPage;
