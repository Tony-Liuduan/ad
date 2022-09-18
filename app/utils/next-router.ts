import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

export const nextRouter = createRouter<NextApiRequest, NextApiResponse>();
