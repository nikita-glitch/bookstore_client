import styled from "styled-components";
import BookCard from "./Book/BookCard";
import signInBanner from "../Logos/sign_in_banner.svg";
import BookBannerSmall from "../Logos/banner.svg";
import signInBannerSmall from "../Logos/sing in banner.png";
import { Link, useSearchParams } from "react-router-dom";
import bookBanner from "../Logos/banner.png";
import { Pagination, PaginationItem, Typography } from "@mui/material";
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
      <CustomIcon
        src={window.innerWidth < 833 ? BookBannerSmall : bookBanner}
        alt=""
        onClick={handleBookBannerClick}
      />
      <CustomFilterDiv>
        <CustomText>Catalog</CustomText>
        <Filters />
      </CustomFilterDiv>
      <CustomCardsDiv ref={catalog}>
        {book?.map((bookItem) => (
          <BookCard key={bookItem.id} {...bookItem} />
        ))}
      </CustomCardsDiv>
      {total ? <CustomPagination
        count={Math.ceil(total / 12)}
        boundaryCount={3}
        onChange={handlePaginationClick}
        renderItem={(item) => (
          <PaginationItem
            // slots={{ previous: }}
            {...item}
          />
        )}
      />: null}
      {!user && (
        <Link to={"/sign-in"} reloadDocument>
          <CustomSignInIcon
            src={window.innerWidth < 833 ? signInBannerSmall : signInBanner}
            alt=""
          />
        </Link>
      )}
    </CustomCatalogDiv>
  );
};

export default CatalogPage;

const CustomIcon = styled.img`
  width: 100%;
  height: 400px;
  padding-top: 40px;

  @media (min-width: 834px) and (max-width: 1279px) {
    height: auto;
    padding-top: 40px;
  }

  @media (min-width: 320px) and (max-width: 833px) {
    height: auto;
    padding-top: 0px;
  }
`;

const CustomSignInIcon = styled.img`
  width: 100%;
  height: 462px;

  @media (min-width: 834px) and (max-width: 1279px) {
    margin-bottom: 0;
    height: 400px;
  }

  @media (min-width: 320px) and (max-width: 833px) {
    height: 501px;
    margin-top: 70px;
    margin-bottom: 70px;
  }
`;

const CustomCatalogDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 140px;

  @media (min-width: 834px) and (max-width: 1279px) {
    padding-bottom: 100px;
  }

  @media (min-width: 320px) and (max-width: 833px) {
    width: 100%;
    padding-bottom: 0px;
  }
`;

const CustomFilterDiv = styled.div`
  display: flex;
  /* justify-content: space-between; */
  width: 100%;
  margin: 110px 0 38px 0;
  height: 72px;
  @media (min-width: 834px) and (max-width: 1279px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 60px 0 24px 0;
    height: auto;
  }

  @media (min-width: 320px) and (max-width: 833px) {
    flex-direction: column;
    margin: 0;
    padding: 20px 0 17px 0;
    align-items: start;
    gap: 13px;
    height: auto;
  }
`;

const CustomText = styled(Typography)`
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

  @media (min-width: 834px) and (max-width: 1279px) {
    padding: 60px 0 20px 0;
  }

  @media (min-width: 320px) and (max-width: 833px) {
    padding: 40px 0 0 0;
  }
`;

const CustomCardsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 60px;
  column-gap: 20px;

  @media (min-width: 834px) and (max-width: 1279px) {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 31px;
    column-gap: 21px;
  }

  @media (min-width: 320px) and (max-width: 833px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 30px;
    column-gap: 20px;
  }
`;
