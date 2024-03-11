import {
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Slider,
  Typography,
  Checkbox,
  ListItemText,
  Chip,
} from "@mui/material";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { getAllGenres } from "../API/genreAPI";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { Genre } from "../interfaces/interfaces";

const MAX = 100;
const MIN = 0;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Filters: FC = () => {
  const [value, setValue] = useState<number[]>([0, 100]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "",
    genreId: [],
  });

  React.useEffect(() => {
    getAllGenres().then((response) => {
      setGenres(response?.data);
    });
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
        <FormControl sx={{ width: "100%" }}>
          <CustomInputLabel
            id="demo-simple-select-label"
            sx={{ color: "#344966" }}
            disableAnimation={true}
            shrink={false}
          >
            Genre
          </CustomInputLabel>
          <CustomSelect
            MenuProps={MenuProps}
            labelId="demo-simple-select-label"
            multiple
            value={searchParams.getAll("genreId") || ""}
            label="Genre"
            onChange={handleGenreChange}
            renderValue={(selected) => <></>}
          >
            <MenuItem value="" sx={{ color: "#344966" }}>
              <em>None</em>
            </MenuItem>
            {genres?.map((genre: Genre) => (
              <MenuItem
                key={genre.id}
                value={genre.id}
                sx={{ color: "#344966" }}
              >
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
        <FormControl sx={{ width: "100%" }}>
          <CustomInputLabel
            id="label"
            sx={{ color: "#344966" }}
            disableAnimation={true}
            shrink={false}
          >
            Price
          </CustomInputLabel>
          <CustomSelect labelId="label" label="Price">
            <SliderDiv>
              <CustomSlider
                getAriaLabel={() => "Price"}
                value={value}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
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
        <FormControl sx={{ width: "100%" }}>
          <CustomInputLabel
            id="demo-simple-select-label"
            sx={{ color: "#344966" }}
            disableAnimation={true}
            shrink={false}
          >
            Sort by
          </CustomInputLabel>
          <CustomSelect
            labelId="demo-simple-select-label"
            value={searchParams.get("sort")}
            onChange={handleSortByChange}
            sx={{
              "&.MuiInputBase-root": {
                background: "#fff",
              },
            }}
            renderValue={(selected) => <></>}
          >
            <CustomMenuItem value="">
              <em>None</em>
            </CustomMenuItem>
            <CustomMenuItem value="price">Price</CustomMenuItem>
            <CustomMenuItem value="title">Name</CustomMenuItem>
            <CustomMenuItem value="author.author_name">
              Author name
            </CustomMenuItem>
            <CustomMenuItem value="bookRating">Rating</CustomMenuItem>
          </CustomSelect>
        </FormControl>
      </CustomDiv>
    </FiltersDiv>
  );
};

const CustomInputLabel = styled(InputLabel)`
  font-family: "Poppins";
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0.75px;
  text-align: center;
  &.Mui-focused {
    color: #344966;
  }
`;

const CustomMenuItem = styled(MenuItem)`
  color: #b9bac3;
  &.Mui-selected {
    color: #344966;
  }
  background: #f0f4ef;

  @media (min-width: 835px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 834px) {
    font-size: 14px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0.75px;
    text-align: left;
  }
`;

const FiltersDiv = styled.div`
  display: flex;
  width: 100%;
  /* align-items: center; */
  justify-content: flex-end;
  gap: 20px;
  padding: 12px 0;
  @media (min-width: 835px) and (max-width: 1279px) {
    justify-content: unset;
    width: 100%;
    padding-bottom: 26px;
    gap: 20px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    justify-content: unset;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    align-items: start;
  }
`;

const CustomDiv = styled.div`
  width: 196px;
  /* margin-right: 20px; */

  @media (min-width: 835px) and (max-width: 1279px) {
    width: 100%;
    height: 50px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
  }
`;

const CustomSelect = styled(Select)`
  width: 196px;
  background: #f0f4ef;
  border: none;
  border-radius: 16px;
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  @media (min-width: 835px) and (max-width: 1279px) {
    width: 100%;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
  }
`;

const CustomSlider = styled(Slider)`
  width: 379px;
  height: 11px;
  color: #bfcc94;
  border-radius: 16px;

  @media (min-width: 835px) and (max-width: 1279px) {
    width: 100%;
    box-sizing: border-box;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
    box-sizing: border-box;
  }
`;

const SliderDiv = styled.div`
  width: 379px;
  padding: 32px 16px;
  background: #f0f4ef;

  @media (min-width: 835px) and (max-width: 1279px) {
    width: 100%;
    box-sizing: border-box;
    padding: 27px 15px 37px 15px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    padding: 40px 15px;
    width: 100%;
    box-sizing: border-box;
  }
`;

export default Filters;
