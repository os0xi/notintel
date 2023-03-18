"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { Button } from "@mui/material";
import ListAllChains from "./components/ListAllChains/ListAllChains";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [selectedChains, setSelectedChains] = useState([]);
  function updateChains(chains) {
    setSelectedChains([...chains]);
  }
  return (
    <main className={styles.main}>
      <ListAllChains setSelectedChainsUp={updateChains} />
    </main>
  );
}
