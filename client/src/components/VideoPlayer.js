import React, { useContext, useState } from 'react'
import { Typography, Button } from '@mui/material'
import { SocketContext } from '../SocketContext';
import Grid from '@mui/material/Grid';
import '../index.css'



const VideoPlayer = () => {
    const { name, callaccepted, myVideo, userVideo, callended, stream, call } = useContext(SocketContext);
    const [viewStream, setViewStream] = useState(false);
    const [viewUserStream, setViewUserStream] = useState(false)
    const [isMuted, setIsMuted] = useState(false);
    const [isUserMuted, setIsUserMuted] = useState(false);

    const hideVideo = () => {
        setViewStream(prevState => !prevState);
    }

    const hideUserVideo = () => {
        setViewUserStream(prevState => !prevState);
    }

    const toggleMute = () => {
        const audio = stream.getAudioTracks();
        audio.forEach(track => {
            track.enabled = !isMuted;
        });
        setIsMuted(prevState => !prevState);
    }

    const toggleUserMute = () => {
        const audio = stream.getAudioTracks();
        audio.forEach(track => {
            track.enabled = !isMuted;
        });
        setIsUserMuted(prevState => !prevState);
    }


    return (
        <div class="container" style={{
            backgroundImage: 'url(../../public/background.png)',
            height: "300px", backgroundRepeat: "no-repeat"
        }} >
            <div class='video-grid'>
                {
                    stream && (
                        <div class='video'>
                            <div id="myVid" className={`${viewStream ? 'hidden' : ''}`}>
                                <Typography variant='h5' gutterBottom>{name || 'Name'}</Typography>
                                <video playsInline ref={myVideo} autoPlay />
                            </div>
                            <div class='btnGroup'>
                                <Button class="btnClass" onClick={hideVideo} variant="contained">{viewStream ? 'Show Camera' : 'Hide Camera'}</Button>
                                <Button class="btnClass" onClick={toggleMute} variant="contained">{isMuted ? 'Mute' : 'Unmute'}</Button>
                            </div>
                        </div>
                    )
                }
                {
                    callaccepted && !callended && (
                        <div class='userVid'>
                            <div id="myVid" className={`${viewUserStream ? 'hidden' : ''}`}>
                                <Typography variant='h5' gutterBottom>{call.name || 'Name'}</Typography>
                                <video playsInline ref={userVideo} autoPlay />
                            </div>
                            <div class="btnGroup2">
                                <Button class="btnClass" onClick={hideUserVideo} variant="contained">{viewUserStream ? 'Show Camera' : 'Hide Camera'}</Button>
                                <Button class="btnClass" onClick={toggleUserMute} variant="contained">{isUserMuted ? 'Mute' : 'Unmute'}</Button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default VideoPlayer