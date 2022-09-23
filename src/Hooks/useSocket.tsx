import {useState, useEffect} from "react";
import Pusher from 'pusher-js';


export function useSocket(url : string) {
    const [pusherInstance,
        setPusherInstance] = useState < any > (null);
        const key = process.env.PUSHER_APP_KEY;
        useEffect(() => {
        if (!key) return
        fetch(url). finally(() => {
            let pusher = new Pusher(key, {
                cluster: 'eu'
              });

              pusher.connection.bind('connected', ()=>{
                console.log('connected')
              });

              pusher.connection.bind('disconnected', () => {
                console.log('disconnected');
            });

            setPusherInstance(pusher);
        });
        function cleanup() {
            pusherInstance && pusherInstance.disconnect();
        }
        return cleanup;
    }, []);
    return pusherInstance;
}