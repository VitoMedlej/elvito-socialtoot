// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse}
from 'next'
const {MongoClient, ObjectId} = require('mongodb')

type Error = {
    message: string
}

export default async function handler(req : NextApiRequest, res : NextApiResponse < {
    message: string,
    success: boolean
} | Error >) {
    const url = process.env.URI;

    const client = new MongoClient(url);
    try {
        if (req.method !== 'POST') {
            return res
                .status(405)
                .json({message: 'Method Not Allowed'})
        }

        const {name, bio, _id} = req.body
        const id = new ObjectId(_id)

        if (!name || !bio || !_id) 
            throw 'Invalid or missing parameters'
        const updatedres = await client
            .db('SocialToot')
            .collection('Users')
            .updateOne({
                _id: id
            }, {
                $set: {
                    name,
                    bio
                }
            })

        if (updatedres
            ?.modifiedCount == 0) 
            throw 'Invalid user id'
        return res
            .status(200)
            .json({message: 'Success', success: true})

    } catch (err) {
        console.log(err)
        return res
            .status(400)
            .json({message: 'Something went wrong'})
    }

}
