const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const http = require('http').Server(app);
const cors = require('cors')
const io = require('socket.io')(http);

app.use(cors());

app.get("/", (req, res) => {
    res.send('Server is running');
})

io.on('connection', (socket) => {
    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit("callended");
    })

    socket.on('calluser', ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit('calluser', { signal: signalData, from, name });
    })

    socket.on('answercall', (data) => {
        io.to(data.to).emit('callaccepted', data.signal);
    })
})


http.listen(port, () => console.log(`Listening on port: ${port}`));
