import styled from "styled-components";
import BookCard from "./Book/BookCard";
import signInBanner from "../Logos/sing in banner.svg";
import { useNavigate } from "react-router-dom";
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
import { useEffect, useRef } from "react";
import { getBook } from "../store/bookSlice";

const CatalogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const catalog = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      dispatch(getBook());
    }
    return () => {
      ignore = true;
    };
  }, [dispatch]);

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
        {isLoading ? (
          <Skeleton></Skeleton>
        ) : (
          <>
            {book.map((bookItem) => (
              <BookCard key={bookItem.id} {...bookItem} />
            ))}
          </>
        )}
      </CustomCardsDiv>

      <CustomPagination
        count={1}
        renderItem={(item) => (
          <PaginationItem
            // slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
      <CustomIcon src={signInBanner} alt="" onClick={handleAuthBannerClick} />
    </CustomCatalogDiv>
  );
};
const CustomIcon = styled.img`
  @media only screen and (min-width: 835px) {
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
    padding: 0 80px 150px 80px;
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
