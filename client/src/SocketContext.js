import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const socket = io('http://localhost:8000')


const ContextProvider = ({ children }) => {
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const [name, setName] = useState("");
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState("");
    const [call, setCall] = useState({});
    const [callaccepted, setCallAccepted] = useState(false);
    const [callended, setCallEnded] = useState(false);



    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((currentStream) => {
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
        })

        socket.on('me', (id) => setMe(id));

        socket.on('calluser', ({ from, name: callername, signal }) => {
            setCall({ isReceivedCall: true, from, name: callername, signal })
        })
    }, []);

    const answerCall = () => {
        setCallAccepted(true)

        const peer = new Peer({ initiator: false, trickle: false, stream })

        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream })

        peer.on('signal', (data) => {
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    }
    return (
        <SocketContext.Provider value={{
            call,
            callaccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callended,
            me,
            callUser,
            leaveCall,
            answerCall,
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext }