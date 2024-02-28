import {
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Slider,
  Typography,
  Checkbox,
  ListItemText,
} from "@mui/material";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { getAllGenres } from "../API/genreAPI";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { Genre } from "../interfaces/interfaces";

const MAX = 100;
const MIN = 0;

const Filters: FC = () => {
  const [value, setValue] = useState<number[]>([0, 100]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    getAllGenres()
      .then((response) => {
        setGenres(response?.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSortByChange = (event: SelectChangeEvent<any>) => {
    searchParams.set("sort", event.target.value);
    setSearchParams(searchParams);
  };

  const handleGenreChange = (event: SelectChangeEvent<any>) => {
    const isEmptyString = event.target.value.includes("");
    if (isEmptyString) {
      searchParams.forEach((value, key) => {
        if (key === "genreId") {
          searchParams.delete(key);
          setSearchParams(searchParams);
        }
      });
      return;
    }
    setSearchParams(createSearchParams({ genreId: event.target.value }));
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    searchParams.set("priceRange", `${newValue}`);
    setSearchParams(searchParams);
    setValue(newValue as number[]);
  };

  const handleChecked = (id: string): boolean => {
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
    <FiltersDiv>
      <CustomDiv>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Genre</InputLabel>
          <CustomSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            multiple
            value={searchParams.getAll("genreId")}
            label="Genre"
            onChange={handleGenreChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genres?.map((genre: Genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                <Checkbox
                  checked={handleChecked(genre.id)}
                  sx={{
                    "&.Mui-checked": {
                      color: "#344966",
                    },
                  }}
                />
                <ListItemText primary={genre.genre_name} />
              </MenuItem>
            ))}
          </CustomSelect>
        </FormControl>
      </CustomDiv>
      <CustomDiv>
        <FormControl sx={{margin: 0 }}>
          <InputLabel id="label">Price</InputLabel>
          <CustomSelect labelId="label" id="demo-simple-select" label="Price">
            <SliderDiv>
              <CustomSlider
                
                getAriaLabel={() => "Price"}
                value={value}
                onChange={handlePriceChange}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ cursor: "pointer" }}>
                $ {MIN},00 
              </Typography>
              <Typography variant="body2" sx={{ cursor: "pointer" }}>
                $ {MAX},00
              </Typography>
            </Box>
            </SliderDiv>
            
          </CustomSelect>
        </FormControl>
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
            <MenuItem value="bookRating">Rating</MenuItem>
          </CustomSelect>
        </FormControl>
      </CustomDiv>
    </FiltersDiv>
  );
};

const FiltersDiv = styled.div`
  display: flex;
  width: 630px;
 
  align-items: center;
 
  
  @media (min-width: 835px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 834px) {
  }
`;

const CustomDiv = styled.div`
  width: 196px;
  margin-right: 20px;
  @media (min-width: 835px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 834px) {
  }
`;
const CustomSelect = styled(Select)`
  width: 196px;
  background: #F0F4EF;
  border: none;
  border-radius: 16px;
  @media (min-width: 835px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 834px) {
  }
`;

const CustomSlider = styled(Slider)`
  width: 379px;
  height: 11px;
  color: #BFCC94;
  border-radius: 16px;


  @media (min-width: 835px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 834px) {
  }
`;

const SliderDiv = styled.div`
width: 379px;
padding: 32px 16px;
background: #F0F4EF;

  @media (min-width: 835px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 834px) {
  }
`;

export default Filters;
