import * as socketIo from 'socket.io-client'
import SOCKET_EVENTS from './socketEvents'
import {ITank} from 'src/components/Gamepad/interfaces';
const SERVER_URL = 'http://localhost:8080'

export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = socketIo(SERVER_URL);
  }

  public registerUser(name: string) {
    this.socket.emit(SOCKET_EVENTS.REGISTER_USER, name);
  }

  public move(tank: ITank) {
    this.socket.emit(SOCKET_EVENTS.UPDATE_TANK, tank);
  }
}

const socketService = new SocketService()
export default socketService
