import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';
import { ViewArticleElement } from 'src/types/article';
import { convertDateFormat } from 'src/utils';
import { theme } from 'src/style/theme';

interface Props {
  article: ViewArticleElement;
  index: number;
}

const Article = ({ article, index }: Props) => {
  console.log(article.createdAt);
  return (
    <Wrapper>
      <Date>{convertDateFormat(article.createdAt)}</Date>
      <div>
        <Link
          data-testid="article"
          href={`/${article.category}/${article._id}`}
        >
          <Title aria-label={`제목 : ${article.title}`}>{article.title}</Title>
        </Link>
        <Desc aria-label={`설명문 : ${article.description}`}>
          {article.description}
        </Desc>
      </div>
    </Wrapper>
  );
};

export default Article;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-top: 0;
  font-size: 1.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #f3f3f3;
  width: 100%;
  font-weight: 400;

  @media screen and (max-width: 768px) {
    width: 315px;
  }
`;

const Desc = styled.p`
  font-weight: 200;
  font-size: 1rem;
  color: ${theme.color.gray100};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  letter-spacing: 0.3px;

  @media screen and (max-width: 768px) {
    width: 315px;
  }
`;

const Date = styled.time`
  font-size: 0.85rem;
  color: ${theme.color.primary};
`;
