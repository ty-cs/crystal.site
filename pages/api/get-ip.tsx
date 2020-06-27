// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  try {
    console.log(req.headers);
    res.status(200).json({ code: 0, ip: req.headers['x-forwarded-for'] });
  } catch (e) {
    res.status(500).json({ ip: '', code: -1 });
  }
};

export default handler;
