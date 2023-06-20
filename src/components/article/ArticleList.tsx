import React from 'react';
import styled from '@emotion/styled';

import { ViewArticleElement } from 'src/shared/types/article';
import { useRecoilValue } from 'recoil';
import { filteredArticleStates } from 'src/recoil/article';
import { theme } from 'src/shared/style/theme';

interface Props {
  articles: ViewArticleElement[];
  renderListItem: (article: ViewArticleElement, index: number) => JSX.Element;
}

const ArticleList = ({ articles, renderListItem }: Props) => {
  const filteredArticles = useRecoilValue(filteredArticleStates);

  return (
    <Container>
      <Wrapper>
        <LeftSideBox>
          <Text>Recent</Text>
        </LeftSideBox>
        <RightSideBox>
          {(filteredArticles.length ? filteredArticles : articles).map(
            (article: ViewArticleElement, index) =>
              renderListItem(article, index),
          )}
        </RightSideBox>
      </Wrapper>
    </Container>
  );
};

export default ArticleList;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 30px;
`;

const Wrapper = styled.div`
  width: 1000px;
  display: flex;

  @media screen and (max-width: 1000px) {
    width: 100%;
    flex-direction: column;
  }
`;

const LeftSideBox = styled.div`
  width: 128px;
  display: flex;
  justify-content: flex-start;
  padding-right: 40px;
`;

const Text = styled.p`
  margin-top: 0;
  font-size: 1.3rem;
  color: ${theme.color.primary};
`;

const RightSideBox = styled.div`
  border-left: 1px solid ${theme.color.primary};
  padding-left: 40px;
  flex-grow: 1;

  @media screen and (max-width: 1000px) {
    border: none;
    border-top: 1px solid ${theme.color.primary};
    padding-top: 60px;
    padding-left: 0;
  }
`;
