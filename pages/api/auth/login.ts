// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse}
from 'next'
import bcrypt from 'bcrypt';
// const jwt = require('jsonwebtoken');
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
    try {
        if (req.method !== 'POST') {
            return res
                .status(405)
                .json({message: 'Method Not Allowed'})
        }
        const {email, password} = req.body

        if (!email || !password || password.length < 4) {
            return res
                .status(400)
                .json({message: 'Invalid or missing parameters'})
        }
        const url = process.env.URI;

        const client = new MongoClient(url);

        const user = await client
            .db("SocialToot")
            .collection("Users")
            .findOne({email});
        if (!user) {
            throw 'Invalid email or password'

        }
        
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            throw 'Invalid email or password'
        }

        return res
            .status(200)
            .json({
                email,
                _id: user._id,
                name: user.name,
                bio: user.bio,
                img: user.img,
                toots: user.toots
            })

    } catch (e) {
        console.log(e)
        return res
            .status(400)
            .json({message: 'Something went wrong'})
    }
    //   res.status(200).json({ name: 'John Doe' })
}