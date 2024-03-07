import { Button, Typography } from "@mui/material";
import * as React from "react";
import profileLogo from "../Logos/User profile button.svg";
import cartLogo from "../Logos/Cart.svg";
import favoriteLogo from "../Logos//Heart.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../store/store";

const ActionPanel = () => {
  const [route, setRoute] = React.useState<string>("sign-in");
  const user = useSelector((state: RootState) => state.users.user);

  const handleLoginButtonClick = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (route === "sign-in") {
      setRoute("sign-up");
    } else {
      setRoute("sign-in");
    }
  };

  const resolveCartBookAmount = () => {
    return user?.cart.cartBooks.reduce(
      (accum, cartBook) => (accum += cartBook.amount),
      0
    );
  };

  const resolveFavoriteBookAmount = () => {
    return user?.favorite.favoriteBooks.length;
  };

  return (
    <ActionPanelDiv>
      {user?.id ? (
        <ActionsDiv>
          <Link to={"/cart/" + user.cart.id}>
            {user?.cart.cartBooks.length ? (
              <CustomAmountDiv>
                <AmountText>{resolveCartBookAmount()}</AmountText>
              </CustomAmountDiv>
            ) : null}
            <CustomCartDiv>
              <CustomIcom src={cartLogo} alt="" />
            </CustomCartDiv>
          </Link>
          <Link to={"/favorite/" + user.favorite.id}>
            {user?.favorite.favoriteBooks.length ? (
              <CustomAmountDiv>
                <AmountText>{resolveFavoriteBookAmount()}</AmountText>
              </CustomAmountDiv>
            ) : null}
            <CustomCartDiv>
              <CustomIcom src={favoriteLogo} alt="" />
            </CustomCartDiv>
          </Link>
          <Link to={"/profile"}>
            <CustomCartDiv>
              <CustomIcom src={profileLogo} alt="" />
            </CustomCartDiv>
          </Link>
        </ActionsDiv>
      ) : (
        <Link to={route}>
          <CustomLoginButton
            variant="contained"
            onClick={handleLoginButtonClick}
          >
            Log In/ Sign Up
          </CustomLoginButton>
        </Link>
      )}
    </ActionPanelDiv>
  );
};

const AmountText = styled(Typography)`
  color: #344966;
  transform: translate(35%, 20%);
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;

  @media (min-width: 834px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 833px) {
    font-size: 10px;
    line-height: 11px;
  }
`;

const CustomCartDiv = styled.div`
  background-color: #344966;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  @media (min-width: 834px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 833px) {
    width: 32.73px;
    height: 32.73px;
  }
`;

const CustomAmountDiv = styled.div`
  background-color: #bfcc94;
  border-radius: 50%;
  width: 23px;
  height: 23px;
  z-index: 9999;
  position: absolute;
  transform: translate(30px, -5px);
  @media (min-width: 834px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 833px) {
    width: 15.81px;
    height: 15.33px;
  }
`;

const CustomLoginButton = styled(Button)`
  background: #344966;
  width: 231px;
  height: 44px;
  padding: 10px 50px;
  border-radius: 16px;
  gap: 10px;
  margin-left: 98px;
  &:hover {
    background: #344966;
  }
  :visited {
    color: #f0f4ef;
  }
  &.MuiButton-root {
    text-transform: none;
  }
  @media (min-width: 834px) and (max-width: 1279px) {
    margin-left: 51px;
  }
  @media (min-width: 320px) and (max-width: 833px) {
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0.75px;
    padding: 10px 17px;
    width: 100%;
    height: 38px;
    margin: 0;
  }
`;

const ActionPanelDiv = styled.div`
  @media (min-width: 834px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 833px) {
    width: 100%;
    grid-area: c;
  }
`;

const CustomIcom = styled.img`
  width: 24px;
  height: 24px;
  transform: translate(50%, 50%);
  @media (min-width: 834px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 833px) {
    width: 17.7px;
    height: 17.7px;
  }
`;

const ActionsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 27px;
  margin-left: 127px;

  @media (min-width: 834px) and (max-width: 1279px) {
    margin-left: 81px;
  }

  @media (min-width: 320px) and (max-width: 833px) {
    width: 135px;
    gap: 0;
    margin: 0;
  }
`;

export default ActionPanel;
