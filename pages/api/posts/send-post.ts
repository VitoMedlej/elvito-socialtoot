
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse}
from 'next'
import pusherInit from '../pusherInit';
const {MongoClient ,ObjectId} = require('mongodb')


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
        
        if (req.method !== 'POST') {
            return res
            .status(405)
            .json({message: 'Method Not Allowed'})
        }
        
        const {userId} = req.body
        if (!userId)   throw 'Invalid Id'
        const pusherInstance = pusherInit()
        const _id = new ObjectId(userId)

        const currentDate = new Date()
        const doc = {...req.body,date:currentDate} 
        await client
        .db("SocialToot")
        .collection("Posts")
        .insertOne({...doc})
        //give the post owner 1+ toot
        const user = await  client.db('SocialToot').collection('Users').findOneAndUpdate({_id},{$inc:{'toots':1}})
        
            
        
        // send the toots to the post owner in realtime 
            pusherInstance.trigger("my-channel", "user toot change", {
                toots: user.value.toots,
                _id: user.value._id
            });
       
        pusherInstance.trigger("my-channel", "db change", doc);
        
        return  res.status(200).json({ message: 'Posted!' })

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


