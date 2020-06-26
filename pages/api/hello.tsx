// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(
      '👨🏻‍💻%c|lty test|',
      'background-color:#009688;color:#fff;font-weight:700',
      req.headers,
    );
    res.status(200).json({ success: 0, ip: req.headers['x-forwarded-for'] });
  } catch (e) {
    res.status(500).json({ ip: '', success: -1 });
  }
};

export default handler;
