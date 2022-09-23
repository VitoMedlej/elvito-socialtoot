import {useState, useEffect} from "react";
import {io} from "socket.io-client";

export function useSocket(url : string) {
    const [socket,
        setSocket] = useState < any > (null);
    useEffect(() => {
        fetch(url). finally(() => {
            const socketio = io();
            socketio.on('connect', () => {

                socketio.emit('hello', 'I AM CONNECTED');
            });
            socketio.on('disconnect', () => {
                console.log('disconnected');

            });

            setSocket(socketio);
        });
        function cleanup() {
            socket && socket.disconnect();
        }
        return cleanup;
    }, []);
    return socket;
}