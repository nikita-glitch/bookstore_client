import {
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Slider,
  Typography,
  Checkbox,
} from "@mui/material";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { getAllGenres } from "../API/genreAPI";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export interface Genre {
  id: string;
  genre_name: string;
}

function valuetext(value: number) {
  return `${value}$`;
}

const MAX = 100;
const MIN = 0;

const Filters: FC = () => {
  const [value, setValue] = useState<number[]>([0, 100]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    let ignore = false;
    setGenres([]);
    getAllGenres()
      .then((response) => {
        if (!ignore) {
          setGenres(response?.data);
        }
      })
      .catch((error) => console.log(error));
    return () => {
      ignore = true;
    };
  }, []);

  const handleSortByChange = (event: SelectChangeEvent<any>) => {
    searchParams.set("sort", event.target.value);
    setSearchParams(searchParams);
  };
  /**
 * forEach((value, key) => {
      if (key === "genreId" && value === event.target.value) {
        console.log('asdasd');
        
        searchParams.delete(key)
        searchParams.
        handleChecked(event.target.value, true)
      }
    })
 */
  const handleGenreChange = (event: SelectChangeEvent<any>) => {
    if (event.target.value === "") {
      searchParams.forEach((value, key) => {
        if (key === "genreId") {
          searchParams.delete(key);
          setSearchParams(searchParams);
        }
      });
    } else {
    let params = searchParams.getAll("genreId"); 
    params.push(event.target.value);
    if (
      params.indexOf(event.target.value) !== -1 &&
      params.lastIndexOf(event.target.value) !== -1 &&
      params.indexOf(event.target.value) !==
        params.lastIndexOf(event.target.value)
    ) {
      params = params.filter((param) => param !== event.target.value);      
      params.push(event.target.value);
    }
    setSearchParams(createSearchParams({ genreId: params }));
    }
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    searchParams.set("priceRange", `${newValue}`);
    setSearchParams(searchParams);
    setValue(newValue as number[]);
  };

  const handleChecked = (id?: string, setCheckFalse?: boolean): boolean => {
    if (setCheckFalse) {
      return false;
    }
    let res = false;
    searchParams.forEach((value, key) => {
      if (value === id) {
        res = true;
        return;
      }
    });
    return res;
  };
  return (
    <FltersDiv>
      <CustomDiv>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Genre</InputLabel>
          <CustomSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchParams.get("genreId")}
            label="Genre"
            onChange={handleGenreChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genres &&
              genres.map((genre: Genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  <Checkbox checked={handleChecked(genre.id, false)} />
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
            value={searchParams.get("sort")}
            label="Age"
            onChange={handleSortByChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="title">Name</MenuItem>
            <MenuItem value="author.author_name">Author name</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
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
