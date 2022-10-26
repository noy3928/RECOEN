import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
// import Image from 'src/components/ui/Image';
import Image from 'next/image';

interface Props {
  title: string;
  description: string;
  path: string;
  imgUrl: string;
  blurDataURL: string;
}

export const Article = ({
  title,
  description,
  path,
  imgUrl,
  blurDataURL,
}: Props) => {
  return (
    <Link href={`/article/${path}`}>
      <Container>
        <Image
          src={imgUrl}
          alt="Thumbnail of article"
          width={380}
          height={220}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
        <Wrapper>
          <div>
            <Title>{title}</Title>
            <Desc>{description}</Desc>
          </div>
          <Date>2022.10.23 7min read</Date>
        </Wrapper>
      </Container>
    </Link>
  );
};

const Container = styled.article`
  width: 380px;
  height: 400px;
  border-radius: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin: 0;
`;

const ImageWrapper = styled.div`
  width: 23vw;
  height: 220px;
  position: relative;
`;

const Wrapper = styled.article`
  box-sizing: border-box;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #f3f3f3;
`;

const Desc = styled.p`
  font-weight: 200;
  font-size: 14px;
  color: #9599a0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  letter-spacing: 0.3px;
`;

const Date = styled.time`
  font-weight: 200;
  font-size: 14px;
  color: #9599a0;
`;
