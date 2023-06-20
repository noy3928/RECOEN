import { DiscussionEmbed } from 'disqus-react';
import { ArticleElement } from 'src/shared/types/article';

interface Props {
  article: ArticleElement;
}

const DisqusComments = ({ article }: Props) => {
  return (
    <div>
      <DiscussionEmbed
        shortname="example"
        config={{
          url: `https://recoen.disqus.com/${article._id}`,
          identifier: article._id,
          title: article.title,
        }}
      />
    </div>
  );
};
export default DisqusComments;
