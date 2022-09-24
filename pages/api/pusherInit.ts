const Pusher = require("pusher");


const pusherInit = () => {
    
    const appId = process.env.NEXT_PUBLIC_PUSHER_APP_ID;
    const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    const secret = process.env.NEXT_PUBLIC_PUSHER_APP_SECRET;
    const pusher = new Pusher({appId, key, secret, cluster: "eu", useTLS: true});

    if (pusher) return pusher
}
export default pusherInit
