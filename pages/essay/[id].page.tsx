import React from 'react';
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { ParsedUrlQuery } from 'querystring';

import ArticleCollection from 'pages/api/models/articleCollectionModel';
import DBUtils from 'src/utils/dbUtils';

import { useSettingDetailPage } from 'src/hooks';

import MDXTag from 'src/components/article/article-detail/MDXTag';
import DetailPageContainer from 'src/components/container/DetailPageContainer';

interface IPrams extends ParsedUrlQuery {
  id: string;
}

const EssayDetailPage = ({
  article,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  useSettingDetailPage(article);

  return (
    <DetailPageContainer>
      <DetailPageContainer.Head article={article} />
      <DetailPageContainer.TitleWrapper>
        <DetailPageContainer.Title article={article} />
      </DetailPageContainer.TitleWrapper>
      <DetailPageContainer.Hr />
      <DetailPageContainer.ContentWrapper>
        {article.imgUrl && <DetailPageContainer.Thunbnail article={article} />}
        <DetailPageContainer.Content
          {...article.MDXcontent}
          components={MDXTag}
        />
      </DetailPageContainer.ContentWrapper>
    </DetailPageContainer>
  );
};

export default EssayDetailPage;

export const getStaticPaths = async () => {
  try {
    const articleDB = await new DBUtils(ArticleCollection);
    await articleDB.setUp();
    const paths = await articleDB.findArticlePaths('essay');

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.log(error);
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  try {
    const { id } = context.params as IPrams;

    const programmingDB = await new DBUtils(ArticleCollection);
    await programmingDB.setUp();
    const article = await programmingDB.getMDXContent(id);

    return {
      props: {
        article,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};
