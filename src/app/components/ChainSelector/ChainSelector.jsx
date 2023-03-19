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
        // width: 250,
      },
    },
  };

  async function fetchChainListFromBackend() {
    const res = await fetch("/api/getNotionChainList");
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
    setSelectedChainsUp(typeof value === "string" ? value.split(",") : value);
  }

  useEffect(() => {
    fetchChainListFromBackend();
  }, []);

  return (
    <Box sx={{ width: "100%", flex: 1, minWidth: 300 }}>
      {chainList && (
        <Paper
          sx={{
            height: 80,
            display: "flex",
            alignItems: "center",
            px: 1,
            width: "100%",
            flex: 1,
          }}
        >
          <FormControl>
            <InputLabel variant="filled" id="chainSelector" color="primary">
              Select chain(s)
            </InputLabel>
            <Select
              MenuProps={MenuProps}
              labelId="chainSelector"
              multiple
              value={selectedChains}
              sx={{ minWidth: 300 }}
              onChange={handleChainSelectionChange}
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    mt: 1,
                    maxWidth: "100%",
                  }}
                >
                  {selected.map((value) => (
                    <Typography key={value}>{` ${value}, `}</Typography>
                  ))}
                </Box>
              )}
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
