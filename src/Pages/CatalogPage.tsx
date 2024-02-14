import styled from "styled-components";
import BookCard from "./Book/BookCard";
import signInBanner from "../Logos/sing in banner.svg";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import bookBanner from "../Logos/banner.svg";
import {
  Pagination,
  PaginationItem,
  Skeleton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "../Logos/Back.svg";
import ArrowForwardIcon from "../Logos/Forward.svg";
import Filters from "../Components/Filters";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useRef, useState } from "react";
import { getBook } from "../store/bookSlice";

const CatalogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const catalog = useRef<HTMLDivElement | null>(null);
  const books = useSelector((state: RootState) => state.books);
  const user = useSelector((state: RootState) => state.users);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      let genreFilter = [{}];
      let priceFilter = [0, 100];
      let searchString = "";
      let sortBy = "";
      let offset = 1;
      searchParams.forEach((value, key) => {       
        switch (key) {
          case "genreId":
            genreFilter.push(value);
            break;
          case "sort":
            sortBy = value;
            break;
          case "priceRange":
            const firstElem = parseInt(value.split(',')[0]);
            const secondElem = parseInt(value.split(',')[1]);           
            priceFilter = [firstElem, secondElem];
            console.log(priceFilter);
            break;
          case "searchString":
            searchString = value;
            break;
          case "offset":
            offset = parseInt(value);
            break;
        }
      });      
      const params = {priceFilter, searchString, genreFilter, sortBy, offset}
      dispatch(getBook(params));
    }
    return () => {
      ignore = true;
    };
  }, [searchParams]);

  const { book, isLoading, error } = useSelector(
    (state: RootState) => state.books
  );

  const navigate = useNavigate();

  const handleAuthBannerClick = () => {
    navigate("/sign-in");
  };

  const handleBookBannerClick = () => {
    catalog.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <CustomCatalogDiv>
      <CustomIcon src={bookBanner} alt="" onClick={handleBookBannerClick} />
      <CustomFilterDiv>
        <CustomText>Catalog</CustomText>
        <Filters />
      </CustomFilterDiv>
      <CustomCardsDiv ref={catalog}>
        {/* {isLoading ? (
          <Skeleton></Skeleton>
        ) : ( */}

        {book.map((bookItem) => (
          <>
            <BookCard key={bookItem.id} {...bookItem} />
          </>
        ))}

        {/* )} */}
      </CustomCardsDiv>

      <CustomPagination
        count={Math.ceil(books.total / 12)}
        renderItem={(item) => (
          <PaginationItem
            //slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
      {!user && (
        <CustomIcon src={signInBanner} alt="" onClick={handleAuthBannerClick} />
      )}
    </CustomCatalogDiv>
  );
};
const CustomIcon = styled.img`
  @media only screen and (min-width: 835px) {
    margin-bottom: 80px;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomCatalogDiv = styled.div`
  @media only screen and (min-width: 835px) {
    display: flex;
    flex-direction: column;
    padding: 0 80px;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomFilterDiv = styled.div`
  @media only screen and (min-width: 835px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 110px 0 38px 0;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomText = styled(Typography)`
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: 0em;
  text-align: left;
`;

const CustomPagination = styled(Pagination)`
  @media only screen and (min-width: 835px) {
    display: flex;
    justify-content: center;
    margin: 78px 0 150px 0;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomCardsDiv = styled.div`
  @media only screen and (min-width: 835px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 60px;
    column-gap: 20px;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

export default CatalogPage;
