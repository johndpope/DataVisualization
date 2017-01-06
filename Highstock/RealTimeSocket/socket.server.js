const io = require('socket.io').listen(3131);

const max = 100;

io.sockets.on('connection', (socket) => {
    setInterval(() => {
        let x = (new Date()).getTime();
        let y = Math.floor((Math.random() * max) + 1);
        socket.emit('sample', {
            x: x,
            y: y
        });
        console.info("emitted: [" + x + ", " + y + "]");
    }, 1000);
});