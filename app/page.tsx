"use client"

import Header from "@/components/header";
import Main from "@/components/main";
import { useState } from "react";

export default function Home() {

  const [selectedNetwork, setSelectedNetwork] = useState('SOL');

  // Function to handle network selection
  const handleNetworkSelection = (network: string) => {
    setSelectedNetwork(network);
  };

  return (
    <main className="">
      <Header />
      <Main />
    </main>
  );
}
