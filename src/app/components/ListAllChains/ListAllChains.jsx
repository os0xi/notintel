"use client";

import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ChainOptionChip from "../ChainOptionChip";

function ListAllChains({ setSelectedChainsUp }) {
  const [chainList, setChainList] = useState([]);
  const [selectedChains, setSelectedChains] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  async function fetchChainListFromBackend() {
    const res = await fetch("http://localhost:3000/api/getNotionChainList");
    const data = await res.json();
    const res_array = [];
    setChainList([...data.options]);
    return data;
  }

  function handleChainSelectionChange(event) {
    const {
      target: { value },
    } = event;
    setSelectedChains(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log("chains din component", selectedChains);
    setSelectedChainsUp([...selectedChains]);
  }

  useEffect(() => {
    fetchChainListFromBackend();
  }, []);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", width: "30%" }}>
      {chainList && (
        <Paper>
          <FormControl>
            <InputLabel variant="filled" id="chainSelector" color="secondary">
              Select chain(s)
            </InputLabel>
            <Select
              labelId="chainSelector"
              multiple
              sx={{ minWidth: 200, height: 80 }}
              value={selectedChains}
              onChange={handleChainSelectionChange}
            >
              {chainList.map((chain) => (
                <MenuItem
                  key={Math.random()}
                  value={chain.name}
                  //   style={getStyles(name, personName, theme)}
                >
                  {chain.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      )}
    </Box>
  );
}

export default ListAllChains;
