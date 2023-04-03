import React, { Children, useContext, useState } from 'react'
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import AssignmentIcon from '@mui/icons-material/Assignment';
import '../index.css'

import { SocketContext } from '../SocketContext';
import Assignment from '@mui/icons-material/Assignment';

const Options = ({ children }) => {
    const { me, callaccepted, name, setName, callended, leaveCall, callUser } = useContext(SocketContext);
    const [idtocall, setIdToCall] = useState('');

    return (
        <div class="options">
            <form class="form">
                <Typography gutterBottom variant='h6'>Account Info</Typography>
                <TextField id='standard-basic' label='Name' value={name} variant='standard' onChange={(e) => setName(e.target.value)} />
                {console.log(me)}
                <CopyToClipboard text={me}>
                    <Button variant='contained' startIcon={<AssignmentIcon />}>Copy your ID</Button>
                </CopyToClipboard>
                <Typography gutterBottom variant='h6'>Make a Call</Typography>
                <TextField id='standard-basic' label='ID to Call' value={idtocall} variant='standard' onChange={(e) => setIdToCall(e.target.value)} />
                {callaccepted && !callended ? (
                    <Button variant='contained' color='secondary' startIcon={<PhoneDisabledIcon />} onClick={leaveCall}>
                        Hang Up
                    </Button>
                ) : (
                    <Button
                        variant='contained' color='secondary' startIcon={<PhoneEnabledIcon />} onClick={() => callUser(idtocall)}
                    >
                        Call
                    </Button>
                )}
                {children}
            </form >
        </div>
    )
}

export default Options