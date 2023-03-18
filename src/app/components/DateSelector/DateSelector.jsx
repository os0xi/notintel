import { Box } from "@mui/system";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import { Paper } from "@mui/material";

function DateSelector({ sendProjectDateUp }) {
  return (
    <Box sx={{ width: "100%", flex: 1, minWidth: 300 }}>
      <Paper sx={{ p: 1, minWidth: 300, width: "100%" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={[
              "DatePicker",
              "MobileDatePicker",
              "DesktopDatePicker",
              "StaticDatePicker",
            ]}
            sx={{
              backgroundColor: "white",
              outline: "0px solid black",
              border: "0px solid black",
            }}
          >
            <MobileDatePicker
              onChange={sendProjectDateUp}
              slotProps={{
                textField: {
                  helperText: "MM / DD / YYYY",
                },
              }}
              sx={{
                backgroundColor: "white",
                outline: "0px solid black",
                border: "0px solid black",
              }}
              closeOnSelect={true}
              defaultValue="{dayjs()}"
              label={<Box sx={{}}>Date</Box>}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Paper>
    </Box>
  );
}

export default DateSelector;
