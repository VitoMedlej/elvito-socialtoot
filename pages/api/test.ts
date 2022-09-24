import {MongoClient} from "mongodb";
const Pusher = require("pusher");

const Handler = async(req : any, res : any) => {
    try {
        const appId = process.env.NEXT_PUBLIC_PUSHER_APP_ID;
        const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
        const secret = process.env.NEXT_PUBLIC_PUSHER_APP_SECRET;


        
        const pusher = new Pusher({appId, key, secret, cluster: "eu", useTLS: true});

        const url = process.env.URI;
        if (!url) 
            throw 'Invalid uri'
        const client = new MongoClient(url);
        const posts = await client
            .db("SocialToot")
            .collection("Posts")

        const users = await client
            .db("SocialToot")
            .collection("Users")
        // watch both collections for changes
        const changeStream = posts.watch();

        const usersChangeStream = users.watch();

        // whenever a change accures, emit the changed data in realtime and update it on
        // client side
        changeStream.on('change', (next : any) => {

            if (next
                ?.operationType === 'update') {
                const updatedToots = next.updateDescription.updatedFields.toots;
                const documentKey = next.documentKey._id
                if (updatedToots && documentKey) {
                 
                    pusher.trigger("my-channel", "toot change", {updatedToots, documentKey});
                }
            }

            const doc = next
            ?.fullDocument
            
            if (doc
                ?.text) 
                pusher.trigger("my-channel", "db change", {doc});
            }
        );
        usersChangeStream.on('change', (next : any) => {

            
            const toots = next?.updateDescription?.updatedFields?.toots;
            const _id = next?.documentKey?._id;
            const tootsGiven = next?.updateDescription.updatedFields.tootsGiven

            if (_id && toots &&tootsGiven) {

                pusher.trigger("my-channel", "user toot change", {toots, _id,tootsGiven});
            }
        });

        res.end();

    } catch (e) {
        console.log('e: ', e);
        return res
            .status(400)
            .send({message: `Error: ${e}`})
    }
};

export default Handler;