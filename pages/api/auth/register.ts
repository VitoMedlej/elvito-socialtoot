// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse}
from 'next'
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
const {MongoClient} = require('mongodb');

type Data = {
    name: string;
    email: string;
    toots?: number
}
type Error = {
    message: string
}
const randomAvatar = [
    'https://www.svgrepo.com/show/12065/user.svg', 'https://res.cloudinary.com/dwcu3wcol/image/upload/v1660988199/pexels-photo-48639' +
            '68_pjkfbj.jpg',
    'https://www.svgrepo.com/show/22146/user.svg',
    'https://www.svgrepo.com/show/24604/user.svg',
    'https://www.svgrepo.com/show/32913/user.svg',
    'https://www.svgrepo.com/show/14840/user.svg',
    'https://www.svgrepo.com/show/55121/user.svg',
];
export default async function handler(req : NextApiRequest, res : NextApiResponse < Data | Error >) {
    try {
        const randomImg = randomAvatar[Math.floor(Math.random() * randomAvatar.length)]
        console.log('randomImg: ', randomImg);

        if (req.method !== 'POST') {
            return res
                .status(405)
                .json({message: 'Method Not Allowed'})
        }
        const {name, email, password} = req.body

        if (!name || !email || !password || password.length < 4) {
            return res
                .status(400)
                .json({message: 'Missing parameters'})
        }
        const salt = await bcrypt.genSalt(6);
        // const secret = process.env.SECRET
        const url = process.env.URI
        console.log('url: ', url);
        const hashedPassword = await bcrypt.hash(password, salt);
        const client = new MongoClient(url);

        const user = await client
            .db("SocialToot")
            .collection("Users")
            .findOne({email});
        if (user) {
            console.log('user: ', user);
            return res
                .status(400)
                .json({message: 'User already exsits'})

        }
        client
            .db("SocialToot")
            .collection("Users")
            .insertOne({name, email, img: randomImg, password: hashedPassword, toots: 20})

        return res
            .status(200)
            .json({name, email, toots: 20})

    } catch (e) {
        console.log(e)
        return res
            .status(400)
            .json({message: 'Something went wrong'})
    }
    //   res.status(200).json({ name: 'John Doe' })
}