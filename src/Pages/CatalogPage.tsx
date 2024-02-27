import styled from "styled-components";
import BookCard from "./Book/BookCard";
import signInBanner from "../Logos/sign_in_banner.svg";
import { Link, useSearchParams } from "react-router-dom";
import bookBanner from "../Logos/banner.png";
import {
  Pagination,
  PaginationItem,
  Skeleton,
  Typography,
} from "@mui/material";
import actvePag from "../Logos/activePag.svg";
import pag from "../Logos/Pag.svg";
import Filters from "../Components/Filters";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useRef, useState } from "react";
import { getBook } from "../store/bookSlice";

const CatalogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const catalog = useRef<HTMLDivElement | null>(null);
  const { book, total } = useSelector((state: RootState) => state.books);
  const user = useSelector((state: RootState) => state.users.user!);
  const [offset, SetOffset] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let genreFilter = [{}];
    let priceFilter = [0, 100];
    let searchString = "";
    let sortBy = "";
    searchParams.forEach((value, key) => {
      switch (key) {
        case "genreId":
          genreFilter.push(value);
          break;
        case "sort":
          sortBy = value;
          break;
        case "priceRange":
          const firstElem = parseInt(value.split(",")[0]);
          const secondElem = parseInt(value.split(",")[1]);
          priceFilter = [firstElem, secondElem];
          break;
        case "searchString":
          searchString = value;
          break;
      }
    });
    const params = { priceFilter, searchString, genreFilter, sortBy, offset };
    dispatch(getBook(params));
  }, [searchParams, offset, dispatch]);

  const handlePaginationClick = (
    ev: React.ChangeEvent<unknown>,
    page: number
  ) => {
    catalog.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    SetOffset(page);
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
        {book?.map((bookItem) => (
          <BookCard key={bookItem.id} {...bookItem} />
        ))}
      </CustomCardsDiv>

      <CustomPagination
        count={Math.ceil(total / 12)}
        boundaryCount={3}
        onChange={handlePaginationClick}
        renderItem={(item) => (
          <PaginationItem
            // slots={{ previous: }}
            {...item}
          />
        )}
      />
      {!user && (
        <Link to={"/sign-in"}>
          <CustomSignInIcon src={signInBanner} alt="" />
        </Link>
      )}
    </CustomCatalogDiv>
  );
};
const CustomIcon = styled.img`
  width: 1280px;
  height: 400px;
  padding-top: 40px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomSignInIcon = styled.img`
  width: 1280px;
  height: 462px;
  margin-bottom: 154px;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomCatalogDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomFilterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1280px;
  margin: 110px 0 38px 0;
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
  display: flex;
  justify-content: center;
padding: 78px 0 30px 0;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomCardsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 305px);
  row-gap: 60px;
  column-gap: 20px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

export default CatalogPage;
