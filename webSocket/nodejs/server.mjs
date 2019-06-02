import WebSocket from 'ws';

const server = new WebSocket.Server({ port: 3000 });

server.on('connection', ws => {
  ws.on('message', message => {
    server.clients.forEach(client => {
      client.readyState === WebSocket.OPEN &&
      client.send(message);
    });
  });

  ws.send('Welcome on board')
});