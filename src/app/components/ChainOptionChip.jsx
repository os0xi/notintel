import { Chip, Typography } from "@mui/material";

function ChainOptionChip({ label, color }) {
  console.log(color);

  return (
    <>
      <Chip
        sx={{
          outline: "2px solid",
          outlineColor: color,
          backgroundColor: "primary.dark",
          color: "white",
          mx: 1,
          my: 1,
        }}
        size="small"
        label={
          <Typography
            fontSize={10}
            fontWeight={100}
            letterSpacing={1}
            //   sx={{ px: 2 }}
          >
            {label}
          </Typography>
        }
      />
    </>
  );
}

export default ChainOptionChip;
