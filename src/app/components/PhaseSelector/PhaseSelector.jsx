"use client";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

function PhaseSelector({ setSelectedPhasesUp }) {
  const [phaseList, setPhaseList] = useState([]);
  const [selectedPhases, setSelectedPhases] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  async function fetchPhaseListFromBackend() {
    const res = await fetch("http://localhost:3000/api/getPhases");

    const data = await res.json();
    console.log(data.options);
    setPhaseList([...data.options]);
  }

  function handlePhaseSelectionChange(event) {
    const {
      target: { value },
    } = event;
    setSelectedPhases(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setSelectedPhasesUp(typeof value === "string" ? value.split(",") : value);
  }

  useEffect(() => {
    fetchPhaseListFromBackend();
  }, []);

  return (
    <Box sx={{ width: "100%", flex: 1, minWidth: 300 }}>
      {phaseList && (
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
          <FormControl success>
            <InputLabel variant="filled" id="tagSelector" color="primary">
              Select phase(s)
            </InputLabel>
            <Select
              MenuProps={MenuProps}
              labelId="phaseSelector"
              multiple
              color="primary"
              sx={{ minWidth: 300, width: "100%" }}
              value={selectedPhases}
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
              onChange={handlePhaseSelectionChange}
            >
              {phaseList.map((phase) => (
                <MenuItem
                  key={Math.random()}
                  value={phase.name}
                  //   style={getStyles(name, personName, theme)}
                >
                  {phase.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      )}
    </Box>
  );
}

export default PhaseSelector;
