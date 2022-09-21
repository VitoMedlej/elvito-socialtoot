

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse}
from 'next'
import fetchTopTooters from '../../../src/Functions/fetchTopTooters';

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
        if (req.method !== 'GET') {
            return res
                .status(405)
                .json({message: 'Method Not Allowed'})
        }

        
        const users = await fetchTopTooters(5)
        
        if (!users) throw 'No users found'
       return res.status(200).json(users)
 
 

    

    } catch (e) {
        console.log(e)
        return res
            .status(400)
            .json({message: 'Something went wrong'})
    }
  
    //   res.status(200).json({ name: 'John Doe' })
}


