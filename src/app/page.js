"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import AddIcon from "@mui/icons-material/Add";
import styles from "./page.module.css";
import { Box, Button, Fab, Paper, Stack } from "@mui/material";
import ChainSelector from "./components/ChainSelector/ChainSelector";
import { useState } from "react";
import TagSelector from "./components/TagSelector/TagSelector";
import ProjectNameInput from "./components/GeneralInput/GeneralInput";
import DateSelector from "./components/DateSelector/DateSelector";
import PhaseSelector from "./components/PhaseSelector/PhaseSelector";
import GeneralInput from "./components/GeneralInput/GeneralInput";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [selectedChains, setSelectedChains] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [selectedPhases, setSelectedPhases] = useState([]);
  const [name, setName] = useState("");
  const [twitterFollowers, setTwitterFollowers] = useState(null);
  const [twitterAddress, setTwitterAddress] = useState("");
  const [notes, setNotes] = useState("");

  async function submitDataToNotion() {
    const newAlphaEntry = {};
    newAlphaEntry.name = name;
    newAlphaEntry.selectedChains = selectedChains;
    newAlphaEntry.selectedTags = selectedTags;
    newAlphaEntry.selectedDate = selectedDate;
    newAlphaEntry.selectedPhases = selectedPhases;
    newAlphaEntry.twitterFollowers = twitterFollowers;
    newAlphaEntry.twitterAddress = twitterAddress;
    newAlphaEntry.notes = notes;
    console.log(newAlphaEntry);
    const res = await fetch("/api/AddNewAlphaEntryToNotion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAlphaEntry),
    });
    console.log(res);
  }

  function updateDate(date) {
    setSelectedDate(date);
    console.log(selectedDate);
  }

  function updateChains(chains) {
    setSelectedChains([...chains]);
    console.log(selectedChains);
  }

  function updateTags(tags) {
    setSelectedTags([...tags]);
    console.log(selectedTags);
  }

  function updatePhases(phases) {
    setSelectedPhases([...phases]);
    console.log(selectedPhases);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        px: 5,
        py: 2,
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          width: "100%",
          px: 5,
          py: 2,
          justifyContent: "center",
        }}
      >
        <GeneralInput label="Project Name" liftInputStateUpFunction={setName} />
        <GeneralInput
          label="Twitter Address"
          liftInputStateUpFunction={setTwitterAddress}
        />
        <GeneralInput
          label="Number of Followers"
          liftInputStateUpFunction={setTwitterFollowers}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          width: "100%",
          px: 5,
          py: 2,
          justifyContent: "center",
        }}
      >
        <ChainSelector setSelectedChainsUp={updateChains} />
        <PhaseSelector setSelectedPhasesUp={updatePhases} />
        <TagSelector setSelectedTagsUp={updateTags} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          width: "100%",
          px: 5,
          justifyContent: "center",
          py: 2,
        }}
      >
        <GeneralInput label="Notes" liftInputStateUpFunction={setNotes} />
        <DateSelector sendProjectDateUp={updateDate} />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          width: "100%",
          px: 5,
          justifyContent: "center",
          py: 2,
        }}
      >
        <Button
          variant="contained"
          size="large"
          color="success"
          onClick={submitDataToNotion}
        >
          Add to Notion
        </Button>
      </Box>
      {/* <Box sx={{ position: "fixed", right: 5, bottom: 5 }}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box> */}
    </Box>
  );
}
