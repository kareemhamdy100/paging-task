const http = require('http');
const  app  = require('./app');


const server = http.createServer(app);

server.listen(3000, () => {
    console.log(`[*] server listenning on port ${3000} ...`);
});
