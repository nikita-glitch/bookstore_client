import * as React from 'react';
import { Comments } from '../../../interfaces/interfaces';
import { Typography } from '@mui/material';
import styled from 'styled-components';

const BookComment = (comment: Comments) => {
  return (  
    <>
    <CustomUserInfo>
      <CustomUserAvatar>

      </CustomUserAvatar>
      <CustomUserName>
      {comment.user?.name}
      </CustomUserName>
    </CustomUserInfo>
    <CustomTimestapm>
    {(Date.now() - Date.parse(comment.createdAt))} {/*fix time*/}
    </CustomTimestapm>
    <CustomText>
    {comment.text}
    </CustomText>
    </>
  );
}
 
export default BookComment;


const CustomUserInfo = styled.div`
  
`
const CustomUserName = styled(Typography)`
  
`
const CustomUserAvatar = styled.img`
  
`
const CustomTimestapm = styled(Typography)`
  
`
const CustomText = styled(Typography)`
  
`