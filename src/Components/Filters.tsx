import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Slider,
  Typography,
} from "@mui/material";
import * as React from "react";
import styled from "styled-components";

function valuetext(value: number) {
  return `${value}$`;
}

const MAX = 100;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: "",
  },
  {
    value: MAX,
    label: "",
  },
];

const Filters = () => {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  return (
    <FltersDiv>
      <CustomDiv>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Genre</InputLabel>
          <CustomSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Genre"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </CustomSelect>
        </FormControl>
      </CustomDiv>
      <CustomDiv>
        <CustomSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Price"
        >
          <SliderDiv>
            <CustomSlider
              getAriaLabel={() => "Price"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
          </SliderDiv>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ cursor: "pointer" }}>
              {MIN} $
            </Typography>
            <Typography variant="body2" sx={{ cursor: "pointer" }}>
              {MAX} $
            </Typography>
          </Box>
        </CustomSelect>
      </CustomDiv>
      <CustomDiv>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <CustomSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Genre"
            // onChange={handleChange}
          >
            <MenuItem value="Name">Name</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </CustomSelect>
        </FormControl>
      </CustomDiv>
    </FltersDiv>
  );
};

const FltersDiv = styled.div`
  display: flex;
  width: 630px;
`;

const CustomDiv = styled.div`
  width: 196px;
  margin-right: 20px;
`;
const CustomSelect = styled(Select)`
  width: 196px;
`;

const CustomSlider = styled(Slider)`
  width: 379px;
  height: 11px;
  border-radius: 16px;
`;

const SliderDiv = styled.div`
  margin: 30px 18px;
`;

export default Filters;
