import * as socketIo from 'socket.io-client'
import SOCKET_EVENTS from './socketEvents'
import {Direction, TeamId} from 'src/components/Gamepad/interfaces';
const SERVER_URL = 'http://192.168.1.132:8080/'
// const SERVER_URL = 'http://192.168.0.174:8080/'

export class SocketService {
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = socketIo(SERVER_URL);
    }

  public registerUser(name: string, teamId: TeamId, callback: (id: string) => void) {
    this.socket.emit(SOCKET_EVENTS.REGISTER_USER, name, teamId, callback);
  }

    public move(id: string, direction: Direction) {
        // this.socket.emit(SOCKET_EVENTS.UPDATE_TANK, tank);
        this.socket.emit(SOCKET_EVENTS.MOVE, {id, direction});
    }

    public fire(id: string) {
        // this.socket.emit(SOCKET_EVENTS.UPDATE_TANK, tank);
        this.socket.emit(SOCKET_EVENTS.FIRE, {id});
    }
}

const socketService = new SocketService()
export default socketService