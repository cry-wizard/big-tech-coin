import { MenuItem, Select } from "@mui/material";
import React from "react";
import "./styles.css";

function SelectDays({ days, handleDaysChange, noPTag }) {
  return (
    <div className="select-days" style={{ marginBottom: noPTag ? "0" : undefined }}>
      {!noPTag && <p>Price change in </p>}
      <Select
        value={days}
        onChange={handleDaysChange} // No need for an extra function wrapper
        sx={{
          height: "2.5rem",
          color: "var(--white)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)",
          },
          "& .MuiSvgIcon-root": {
            color: "var(--white)",
          },
          "&:hover": {
            "&& fieldset": {
              borderColor: "#3a80e9",
            },
          },
        }}
      >
        {[7, 30, 60, 90, 120, 365].map((value) => (
          <MenuItem key={value} value={value}>
            {value === 365 ? "1 Year" : `${value} Days`}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default SelectDays;
