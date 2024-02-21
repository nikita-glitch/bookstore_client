import * as React from "react";
import { Comments } from "../../../interfaces/interfaces";
import { Typography } from "@mui/material";
import styled from "styled-components";

const BookComment = (comment: Comments) => {
  const resolveCommentTime = () => {
    const time = new Date(comment?.createdAt)
    const dateDiff = Date.now() - time.valueOf()
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
        <CustomUserAvatar src={'http://localhost:5000/' + comment.user.avatar?.avatarName} alt="" />
      </CustomUserInfo>
      <CustomDiv>
        <CustomUserName>{comment.user?.name}</CustomUserName>
        <CustomTimestapm>
          <>
          {resolveCommentTime()} 
          </>
        </CustomTimestapm>
        <CustomText>{comment.text}</CustomText>
      </CustomDiv>
    </CommentDiv>
  );
};

export default BookComment;

const CustomUserInfo = styled.div``;
const CommentDiv = styled.div`
  display: flex;
  padding: 30px 30px 25px 30px;
  gap: 20px;
  width: 740px;
  background-color: #f0f4ef;
  margin-bottom: 10px;
`;
const CustomDiv = styled.div``;
const CustomUserName = styled(Typography)`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.75px;
  text-align: left;
  color: #0d1821;
`;
const CustomUserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const CustomTimestapm = styled(Typography)`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.75px;
  text-align: left;
  color: #b9bac3;
`;

const CustomText = styled(Typography)`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.75px;
  text-align: left;
  color: #344966;
`;
