import React, { useContext, useState } from 'react'
import { Button } from '@mui/material'
import { SocketContext } from '../SocketContext'

const Notifications = () => {
    const { answerCall, call, callaccepted } = useContext(SocketContext);
    const [audio, setAudio] = useState(new Audio('/piano_loop.mp3'));
    const [isPlaying, setIsPlaying] = useState(false)


    const playRingtone = () => {
        audio.play()
    }

    const stopRingtone = () => {
        answerCall();
        audio.pause();
        audio.currentTime = 0;
    }


    return (
        <div class='popUp'>
            {call.isReceivedCall && !callaccepted && (
                <div>
                    {call.isReceivedCall && !callaccepted && isPlaying ? null : playRingtone()}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h1>{call.name} is calling you!</h1>
                    </div>
                    <Button class='popUpBtn' variant="contained" color='primary' onClick={stopRingtone}>
                        Answer
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Notifications