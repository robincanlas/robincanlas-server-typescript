import { Server } from './config/Server';
import * as path from 'path';

export const server: Server = new Server();

server.listen();

server.app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
    
server.app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname, 'index.html'));
});