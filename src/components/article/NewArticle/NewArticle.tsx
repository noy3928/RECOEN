import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { ViewArticleElement } from 'src/types/article';
import { convertDateFormat } from 'src/utils';
import { theme } from 'src/style/theme';
import Image from 'next/image';

interface Props {
  article: ViewArticleElement;
}

const Article = ({ article }: Props) => {
  return (
    <Container>
      <Date>{convertDateFormat(article.createdAt)}</Date>
      <Wrapper>
        <ContentWrapper>
          <Link
            data-testid="article"
            href={`/${article.category}/${article._id}`}
          >
            <Title aria-label={`제목 : ${article.title}`}>
              {article.title}
            </Title>
          </Link>
          <TagWrapper>
            {article.tags.map((tag, index) => {
              return <Tags key={index}>{tag}</Tags>;
            })}
          </TagWrapper>
          <Desc aria-label={`설명문 : ${article.description}`}>
            {article.description}
          </Desc>
        </ContentWrapper>
        {article.imgUrl && (
          <ImageWrapper href={`/${article.category}/${article._id}`}>
            <Image
              src={article.imgUrl}
              alt="Thumbnail of article"
              placeholder="blur"
              blurDataURL={article.blurDataURL}
              fill
              style={{ objectFit: 'cover' }}
            />
          </ImageWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Article;

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  margin-bottom: 50px;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 20px;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 5px;
  font-size: 1.4rem;
  color: #f3f3f3;
  width: 100%;
  font-weight: 500;
`;

const Desc = styled.p`
  font-weight: 200;
  font-size: 1rem;
  color: ${theme.color.gray100};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  letter-spacing: 0.3px;
`;

const Date = styled.time`
  flex-shrink: 0;
  width: 100px;
  font-size: 0.9rem;
  color: ${theme.color.primary};
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const Tags = styled.p`
  margin: 0;
  color: ${theme.color.primary};
  font-weight: 300;
  font-size: 0.9rem;
`;

const ImageWrapper = styled(Link)`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  position: relative;
  object-fit: cover;
`;
