import {useState, useEffect} from "react";
import Pusher from 'pusher-js';

export function useSocket(url?: string) {
    const [pusherInstance,
        setPusherInstance] = useState < any > (null);

    useEffect(() => {
        const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
        if (!key) 
            return
        try {

            let pusher = new Pusher(key, {cluster: 'eu'});

            pusher
                .connection
                .bind('connected', () => {
                    console.log('connected')
                });

            pusher
                .connection
                .bind('disconnected', () => {
                    console.log('disconnected');
                });

            setPusherInstance(pusher);
        } catch (errors) {
            console.log('errors: ', errors);

        }
        // });
        function cleanup() {
            pusherInstance && pusherInstance.disconnect();
        }
        return cleanup;
    }, []);
    return pusherInstance;
}