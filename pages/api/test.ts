import {MongoClient} from "mongodb";
const Pusher = require("pusher");

const Handler = async(req : any, res : any) => {
    try {
        const pusher = new Pusher({appId: "1481187", key: "1df8d9942a0582f59729", secret: "374aabff5f27e12ef492", cluster: "eu", useTLS: true});

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
                // get the new number of toots and the post id
                const updatedToots = next.updateDescription.updatedFields.toots;
                const documentKey = next.documentKey._id
                if (updatedToots && documentKey) {

                    // pusher.trigger("my-channel", "toot change", {updatedToots,documentKey});
                    pusher.trigger("my-channel", "toot change", {updatedToots, documentKey});
                }
            }

            const doc = next
                ?.fullDocument

            if (doc
                ?.text) 
                // io.emit('db change', doc);
                pusher.trigger("my-channel", "db change", {doc});
            }
        );
        usersChangeStream.on('change', (next : any) => {

            const toots = next.updateDescription.updatedFields.toots;
            const _id = next.documentKey._id

            if (_id && toots) {

                // io.emit('user toot change', {toots,_id});
                pusher.trigger("my-channel", "user toot change", {toots, _id});
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
