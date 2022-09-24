// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse}
from 'next'
const {MongoClient, ObjectId} = require('mongodb')

type Error = {
    message: string
}

export default async function handler(req : NextApiRequest, res : NextApiResponse < any | Error >) {
    const url = process.env.URI;
    const client = new MongoClient(url);
    try {
        if (req.method !== 'GET') {
            return res
                .status(405)
                .json({message: 'Method Not Allowed'})
        }

        const {userId, nb,posterId, postId} = req.query

        if (!userId || !nb || !postId || !posterId) 
           { throw 'Invalid Id'}
        const _id = new ObjectId(userId)
        const post_Id = new ObjectId(postId)
        const post_owner_Id = new ObjectId(posterId)

        let num = Number(nb)

         await client
         
          .db('SocialToot')
          .collection('Users')
          .updateOne({
                _id
            }, {
                $inc: {
                    'toots': -num,
                    'tootsGiven': num                }
            })
        await client.db('SocialToot').collection('Users').updateOne({_id:post_owner_Id},{$inc:{'toots':num}})
        await client
            .db('SocialToot')
            .collection('Posts')
        .updateOne({
                _id: post_Id
            }, {
                $inc: {
                    'toots': num
                }
            });

        return res
            .status(200)
            .json({message:'success'})

    } catch (e) {
        console.log(e)
        return res
            .status(400)
            .json({message: 'Something went wrong'})
    } finally {
        await client.close()
    }
}