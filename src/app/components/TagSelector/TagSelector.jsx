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

function TagSelector({ setSelectedTagsUp }) {
  const [tagList, setTagList] = useState([]);
  const [selectedTags, setSelectedTagList] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  async function fetchTagListFromBackend() {
    const res = await fetch("/api/getNotionTagsList");

    const data = await res.json();
    console.log(data.options);
    setTagList([...data.options]);
  }

  function handleTagSelectionChange(event) {
    const {
      target: { value },
    } = event;
    setSelectedTagList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setSelectedTagsUp(typeof value === "string" ? value.split(",") : value);
  }

  useEffect(() => {
    fetchTagListFromBackend();
  }, []);

  return (
    <Box sx={{ width: "100%", flex: 1, minWidth: 300 }}>
      {tagList && (
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
              Select tag(s)
            </InputLabel>
            <Select
              MenuProps={MenuProps}
              labelId="tagSelector"
              multiple
              color="primary"
              sx={{ minWidth: 300, width: "100%" }}
              value={selectedTags}
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
              onChange={handleTagSelectionChange}
            >
              {tagList.map((tag) => (
                <MenuItem
                  key={Math.random()}
                  value={tag.name}
                  //   style={getStyles(name, personName, theme)}
                >
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      )}
    </Box>
  );
}

export default TagSelector;
