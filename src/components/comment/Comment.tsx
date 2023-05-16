import * as React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { convertTimeFormat } from 'src/utils';
import { AiOutlineLike } from 'react-icons/ai';
import { theme } from 'src/style/theme';

interface Props {
  profileImg: string;
  content: string;
  userName: string;
  createdAt: string;
}

const Comment = ({ profileImg, content, userName, createdAt }: Props) => {
  return (
    <Container>
      <ImageWrapper>
        <Image
          src={profileImg}
          alt="profile image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </ImageWrapper>
      <ContentBox>
        <NameWrapper>
          <UserName>{userName}&nbsp;</UserName>·
          <Date>&nbsp;{convertTimeFormat(createdAt)}</Date>
        </NameWrapper>
        <Content>{content}</Content>
        <Wrapper>
          <AiOutlineLike />
        </Wrapper>
      </ContentBox>
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  display: flex;
  color: ${theme.color.gray100};
`;

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 40px;
`;

const ContentBox = styled.div`
  flex-grow: 1;
  border-bottom: 1px solid ${theme.color.gray400};
`;

const NameWrapper = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
`;

const UserName = styled.p`
  margin: 0;
`;

const Date = styled.time``;

const Content = styled.p``;
