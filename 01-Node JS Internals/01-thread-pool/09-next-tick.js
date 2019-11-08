const  net =  require('net');
const server = net.createServer(() => {}).listen(8080);  //listening is emittet  via nxetTick

server.on('listening', () => {console.log('Listening')});