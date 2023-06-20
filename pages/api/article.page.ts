import { connectMongo } from 'pages/api/middlewares/connectMongo';
import nc from 'next-connect';
import ArticleCollectionModel from './models/articleCollectionModel';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { getSession } from 'next-auth/react';

const handler = nc<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(400).json({ result: false, message: 'Sorry!' });
  },
  onNoMatch(req, res) {
    res.status(404).json({ result: false, message: 'Not Mached Method!' });
  },
});

function isValidationError(err: any): err is Error {
  return err.name === 'ValidationError';
}

handler
  .use(async (req, _, next) => {
    await connectMongo();
    await next();
  })
  .use(async (req, res, next) => {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ result: false, message: 'Unauthorized' });
      return;
    }
    await next();
  })
  .post(async (req, res) => {
    try {
      console.log('CREATING ARTICLE');
      const article = await ArticleCollectionModel.create(req.body);
      console.log('CREATED ARTICLE');

      res.status(200).json({ article });
    } catch (err) {
      console.log(err);
      if (isValidationError(err)) {
        res.status(400).json({ result: false, message: err.message });
      } else {
        res
          .status(500)
          .json({ result: false, message: 'Internal server error' });
      }
    }
  })
  .put(async (req, res) => {
    try {
      console.log('UPDATING ARTICLE');
      const body = req.body;
      const id = req.body._id;
      const updateContent = {
        title: body.title,
        content: body.content,
        imgUrl: body.imgUrl,
        description: body.description,
        tags: body.tags,
      };

      const article = await ArticleCollectionModel.findOneAndUpdate(
        { _id: id },
        updateContent,
      );
      console.log('UPDATED ARTICLE');

      res.status(200).json({ article });
    } catch (err) {
      console.log(err);
    }
  })
  .delete(async (req, res) => {
    try {
      console.log('DELETING ARTICLE');
      const id = req.body.id;
      const article = await ArticleCollectionModel.findByIdAndDelete(id);

      if (!article) return res.status(404);
      console.log('DELETED ARTICLE');

      res.status(200).json({ article, revalidated: true });
    } catch (err) {
      console.log(err);
    }
  });
export default withSentry(handler);
