import * as socketIo from "socket.io-client";
// import {ITanks} from './interfaces';
import SOCKET_EVENTS from './socketEvents';

const SERVER_URL = "http://localhost:8080";

export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = socketIo(SERVER_URL);
  }

  public registerUser(name: string) {
    this.socket.emit(SOCKET_EVENTS.REGISTER_USER, name);
  }
}

const socketService = new SocketService()
export default socketService
