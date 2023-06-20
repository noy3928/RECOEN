import { Schema, model, models } from 'mongoose';
import { ArticleModel as ArticleModelT } from 'src/shared/types/article';

const articleSchema = new Schema<ArticleModelT>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    content: { type: String, required: true },
    imgUrl: { type: String, required: false },
    category: { type: String, required: true },
  },
  { timestamps: true },
);

const ArticleCollectionModel =
  models.ArticleCollection ||
  model<ArticleModelT>('ArticleCollection', articleSchema);

export default ArticleCollectionModel;

articleSchema.index({ category: 1, createdAt: -1 }); // schema level
