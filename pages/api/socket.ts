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

            changeStream.on('change', (next : any) => {

                const doc = next
                ?.fullDocument
                
                if (doc
                    ?.text) 
                    socket.emit('db change', doc);
                }
                
                
            );
            usersChangeStream.on('change', (next : any) => {

                // const doc = next
                // ?.fullDocument
                const toots =  next.updateDescription.updatedFields.toots;
                const _id = next.documentKey._id
              
                if (
                    toots) 
                    socket.emit('toot change', {toots,_id});
                }
                
                
            );

        });
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
