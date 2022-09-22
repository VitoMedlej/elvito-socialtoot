import NextNodeServer from 'next/dist/server/next-server';
import {Server} from 'socket.io';
const {MongoClient} = require('mongodb');

const ioHandler = async(req : any, res : any) => {
    const url = process.env.URI;
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

    if (!res.socket.server.io) {
        console.log('*First use, starting socket.io');

        const io = new Server(res.socket.server);

        io.on('connection', socket => {
            console.log('Connected socket.io');
            socket
                .broadcast
                .emit('a user connected');
                
            });
            // whenever a change accures, emit the changed data in realtime and update it on client side
            changeStream.on('change', (next : any) => {
                
                if (next?.operationType === 'update') {
                    // get the new number of toots and the post id
                    const updatedToots = next.updateDescription.updatedFields.toots;
                    const documentKey = next.documentKey._id
                    if (updatedToots && documentKey) {
                       
                    io.emit('toot change',{updatedToots,documentKey });

                    }
                }
                const doc = next
                ?.fullDocument
                
                if (doc
                    ?.text) 
                    io.emit('db change', doc);
                    
                }
                
                
            );
            usersChangeStream.on('change', (next : any) => {

                // const doc = next
                // ?.fullDocument
                const toots =  next.updateDescription.updatedFields.toots;
                const _id = next.documentKey._id
              
                if (
                    toots) 
                    io.emit('user toot change', {toots,_id});
                }
                
                
            );
        io.on('disconnect', (soc) => {
            console.log('soc')
        })

        res.socket.server.io = io;
    } else {
        console.log('socket.io already running');
    }
    res.end();
};

export default ioHandler;
