import React, { useEffect, useState } from 'react'
import axios from "axios";
import Headers from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
const DashboardPage = () => {
  const [coins,setCoins]= useState([]);

  useEffect(()=>{
    // fetch(
    //   "https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    // );
    axios.get( "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then((response)=>{
      console.log("Response",response);
      setCoins(response.data)
    })
    .catch((error)=>{
      console.log("ERROR>>",error);
    })
  },[]);
  return (
    <div>
      <Headers/>
      <TabsComponent coins={coins}/>
    </div>
  )
}

export default DashboardPage