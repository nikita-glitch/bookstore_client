import { Comments } from "../../../interfaces/interfaces";
import { Typography } from "@mui/material";
import styled from "styled-components";

const BookComment = (comment: Comments) => {
  const resolveCommentTime = () => {
    const time = new Date(comment?.createdAt);
    const dateDiff = Date.now() - time.valueOf();
    const day = Math.floor(dateDiff / (24 * 3600000));

    if (day < 1) {
      return `Left a comment today`;
    } else if (day === 1) {
      return `Left a comment yesterday`;
    } else if (day < 30) {
      return `Left a comment ${day} days ago`;
    } else if (day >= 30 && day < 365) {
      return `Left a comment ${Math.ceil(day / 30)} month ago`;
    } else if (day >= 365) {
      return `Left a comment ${Math.ceil(day / 360)} year ago`;
    }
  };

  return (
    <CommentDiv>
      <CustomUserInfo>
        <CustomUserAvatar
          src={"http://localhost:5000/" + comment.user.avatar?.avatarName}
          alt=""
        />
        <CustomDiv>
          <CustomUserName>{comment.user?.name}</CustomUserName>
          <CustomTimestapm>
            <>{resolveCommentTime()}</>
          </CustomTimestapm>
        </CustomDiv>
      </CustomUserInfo>
      <CustomText>{comment.text}</CustomText>
    </CommentDiv>
  );
};

export default BookComment;

const CustomUserInfo = styled.div`
  display: grid;
  grid-template-columns: min-content;
  align-items: center;
  column-gap: 20px;

  @media (min-width: 835px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 834px) {
    column-gap: 13px;
    margin-bottom: 15px;
  }
`;
const CommentDiv = styled.div`
  width: 100%;
  height: auto;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 30px 0 25px 30px;
  background-color: #f0f4ef;
  margin-bottom: 10px;
  box-sizing: border-box;

  @media (min-width: 835px) and (max-width: 1279px) {
    padding: 20px 0 0 20px;
    column-gap: 20px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
    padding: 12px 0 10px 10px;
  }
`;

const CustomDiv = styled.div`
  padding-top: 5px;
  width: 100%;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  @media (min-width: 835px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
  }
`;

const CustomUserName = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.75px;
  text-align: left;
  color: #0d1821;

  @media (min-width: 835px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 834px) {
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
  }
`;

const CustomUserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  grid-column: 1 / 2;
  grid-row: 1 / 3;

  @media (min-width: 835px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 834px) {
    width: 35px;
    height: 35px;
  }
`;

const CustomTimestapm = styled(Typography)`
  padding: 4px 0 9px 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.75px;
  text-align: left;
  color: #b9bac3;

  @media (min-width: 835px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 834px) {
    font-size: 10px;
    font-weight: 500;
    line-height: 15px;
    letter-spacing: 0.75px;
    padding: 0;
  }
`;

const CustomText = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.75px;
  text-align: left;
  color: #344966;
  width: 100%;
  order: 1;
  margin: 0 0 0 80px;

  @media (min-width: 835px) and (max-width: 1279px) {
    margin: 0 0 0 80px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    width: 100%;
    margin: 0;
  }
`;
