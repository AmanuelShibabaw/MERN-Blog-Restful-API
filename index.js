const http = require('http');
const app = require('./app');
const {PORT} = require('./config/keys');

const server = http.createServer(app)


server.listen(PORT,()=>console.log(`server running in port ${PORT}`))