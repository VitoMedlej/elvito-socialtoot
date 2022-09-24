
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse}
from 'next'
const {MongoClient} = require('mongodb');

type Data = {
    name: string;
    email: string;
    toots?: number;
    img?: string;
    bio?: string;
    _id ?: string;
}
type Error = {
    message: string
}

export default async function handler(req : NextApiRequest, res : NextApiResponse < Data | Error >) {
        const url = process.env.URI;
        const client = new MongoClient(url);
    try {
        if (req.method !== 'GET') {
            return res
                .status(405)
                .json({message: 'Method Not Allowed'})
        }

        console.log('req?.query?.sortByToots: ', req?.query?.sortByToots);
        if (req?.query?.sortByToots === 'true') {

        const posts = await client
        .db("SocialToot")
        .collection("Posts").aggregate([
            {
                $sort: {
                    "toots": -1
                }
            }
        ,{
            $limit : 20

        }
        ])
        .toArray()
        
      
       return res.status(200).json(posts)
 
    }

   
    const posts = await client
    .db("SocialToot")
    .collection("Posts").find()
    .limit(20)
    .sort({$natural:-1})
    .toArray()

    return res.status(200).json(posts)
    

    } catch (e) {
        console.log(e)
        return res
            .status(400)
            .json({message: 'Something went wrong'})
    }
    finally {
        await client.close()
    }
    //   res.status(200).json({ name: 'John Doe' })
}


