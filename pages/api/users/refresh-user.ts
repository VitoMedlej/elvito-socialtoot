

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb';
import type {NextApiRequest, NextApiResponse}
from 'next'
const {MongoClient} = require('mongodb');


type Error = {
    message: string
}

export default async function handler(req : NextApiRequest, res : NextApiResponse < any | Error >) {
    
    try {
        if (req.method !== 'GET') {
            return res
                .status(405)
                .json({message: 'Method Not Allowed'})
        }
        const url = process.env.URI;
        const {userId} = req.query
        const client = new MongoClient(url);
        if (!userId) throw 'Invalid Id'
        const _id = new ObjectId(`${userId}`)
        const user = await client
        .db("SocialToot")
        .collection("Users")
        .findOne({_id});
        if (!user) throw 'user not found'
        const {toots,tootsGiven,name,email,img,bio} = user
       return res.status(200).json({toots,_id,tootsGiven,name,email,img,bio})
 
    

    } catch (err) {
        console.log(err)
        return res
            .status(400)
            .json({message: 'Something went wrong'})
    }
  
    //   res.status(200).json({ name: 'John Doe' })
}


