
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

     
        
        const posts = await client
       .db("SocialToot")
       .collection("Posts")
        const changeStream = posts.watch();
        changeStream.on('change', (next:any) => {
            console.log('next: ', next);
            // process next document
        });
        
 
 

    

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


