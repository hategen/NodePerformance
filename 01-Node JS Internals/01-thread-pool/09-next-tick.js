const  net =  require('net');
//port is assigned  right away  so  'listening' can be triggered in place
//but the handler would not be assigned at that point
const server = net.createServer(() => {}).listen(8999);

//listening is emittet  via nxetTick
server.on('listening', () => {console.log('Listening')});