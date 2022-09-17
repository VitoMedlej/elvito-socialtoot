import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';
import type {NextApiRequest, NextApiResponse}
from 'next'

const url = process.env.URI;


async function Database(req :NextApiRequest, res :NextApiResponse , next:any) {
    if (url)  { const client = new MongoClient(url); 
        await client.connect();
        
        
    }
  return next();
}

const middleware = nextConnect();

middleware.use(Database);

export default middleware;