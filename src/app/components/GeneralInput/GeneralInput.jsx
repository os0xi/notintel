import { InputLabel, Paper, TextField, Typography } from "@mui/material";

import { Box } from "@mui/system";

function GeneralInput({ label, liftInputStateUpFunction }) {
  function handleInput(event) {
    if (event.target.value !== "") {
      liftInputStateUpFunction(event.target.value);
    }
  }
  return (
    <Box sx={{ width: "100%", flex: 1, minWidth: 300 }}>
      <Paper
        elevation={4}
        sx={{
          height: 80,
          display: "flex",
          alignItems: "center",
          px: 1,
          width: "100%",
        }}
      >
        <TextField
          id="outlined-basic"
          label={<Typography color={"primary"}>{label}</Typography>}
          variant="outlined"
          sx={{
            // minWidth:
            //   label === "Project Name" || label === "Twitter Address"
            //     ? 300
            //     : 100,
            width: "100%",
          }}
          onBlur={handleInput}
        />
      </Paper>
    </Box>
  );
}

export default GeneralInput;
