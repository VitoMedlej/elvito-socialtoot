import {useState, useEffect} from "react";
import Pusher from 'pusher-js';


export function useSocket(url : string) {
    const [pusherInstance,
        setPusherInstance] = useState < any > (null);
    useEffect(() => {
        fetch(url). finally(() => {
            console.log('I ran in usesocket')
            let pusher = new Pusher('1df8d9942a0582f59729', {
                cluster: 'eu'
              });

              pusher.connection.bind('connected', ()=>{
                alert('I connected')
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