// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse}
from 'next'
import pusherInit from '../pusherInit';
const {MongoClient, ObjectId} = require('mongodb')
const Pusher = require("pusher");

type Error = {
    message: string
}

export default async function handler(req : NextApiRequest, res : NextApiResponse < any | Error >) {
    const url = process.env.URI;
    const pusherInstance = pusherInit()

    const client = new MongoClient(url);
    try {
        if (req.method !== 'GET') {
            return res
                .status(405)
                .json({message: 'Method Not Allowed'})
        }

        const {userId, nb, posterId, postId} = req.query

        if (!userId || !nb || !postId || !posterId) {
            throw 'Invalid Id'
        }
        const user_Id = new ObjectId(userId)
        const post_Id = new ObjectId(postId)
        const post_owner_Id = new ObjectId(posterId)

        // const pusher = new Pusher({appId, key, secret, cluster: "eu", useTLS: true});
        let num = Number(nb)
        // decrease toots from whomever is liking the post, and increase tootsGiven 
        const updatedUser = await client
            .db('SocialToot')
            .collection('Users')
            .findOneAndUpdate({
                _id: user_Id
            }, {
                $inc: {
                    'toots': -num,
                    'tootsGiven': num
                }
            })

        const {toots, tootsGiven, _id} = updatedUser
            ?.value
        if (!updatedUser.ok || !toots || !tootsGiven || !_id) {
            throw 'failed to like post'
        }
        // get the latest amount of toots and tootsgiven for the user
        const currentUserUpdatedValues = {
            toots,
            tootsGiven,
            _id
        }



        // find the post owner and give them the toots
        const tootsAdded = await client
            .db('SocialToot')
            .collection('Users')
            .findOneAndUpdate({
                _id: post_owner_Id
            }, {
                $inc: {
                    'toots': num
                }
            })
        if (!tootsAdded || !tootsAdded
            ?.value
                ?._id || !tootsAdded
                    ?.value
                        ?.toots) {
            throw 'could not add toots to post owner';
        }

        // send the toots to the post owner in realtime 
        pusherInstance.trigger("my-channel", "user toot change", {
            toots: tootsAdded.value.toots,
            _id: tootsAdded.value._id
        });




        // update number of toots the post has
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
        
        // send the new number of toots in realtime
        pusherInstance.trigger("my-channel", "post toot change", {
            updatedToots: num,
            documentKey: post_Id
        });

        // return the new, updated user
        return res
            .status(200)
            .json({user:currentUserUpdatedValues })

    } catch (e) {
        console.log(e)
        return res
            .status(400)
            .json({message: 'Something went wrong'})
    } finally {
        await client.close()
    }
}