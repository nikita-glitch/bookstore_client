import {
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Slider,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { getAllGenres } from "../API/genreAPI";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

export interface Genre {
  id: string;
  genre_name: string;
}

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

const Filters: FC = () => {
  const [value, setValue] = useState<number[]>([15, 25]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [genreFilter, setGenreFilter] = useState<Genre[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    let ignore = false;
    setGenres([]);
    getAllGenres()
      .then((response) => {if (!ignore) {
        setGenres(response?.data);
      }})
      .catch((error) => console.log(error));
      return () => {
        ignore = true;
      }
  }, []);

  const handleSortByChange = (event: SelectChangeEvent<any>) => {
    setSortBy(event.target.value);
    // dispatch()
  };

  const handleGenreChange = (event: SelectChangeEvent<any>) => {
    setGenreFilter(event.target.value);
    // dispatch()
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    // dispatch()
  };
  return (
    <FltersDiv>
      <CustomDiv>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Genre</InputLabel>
          <CustomSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={genreFilter}
            label="Genre"
            onChange={handleGenreChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genres &&
              genres.map((genre: Genre) => (
                <MenuItem key={genre.id} value={genre.genre_name}>
                  {genre.genre_name}
                </MenuItem>
              ))}
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
              onChange={handlePriceChange}
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
            value={sortBy}
            label="Age"
            onChange={handleSortByChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="Name">Name</MenuItem>
            <MenuItem value="authorName">Author name</MenuItem>
            <MenuItem value="Rating">Rating</MenuItem>
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
