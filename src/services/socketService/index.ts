import * as socketIo from 'socket.io-client'
import SOCKET_EVENTS from './socketEvents'
import {Action, TeamId} from 'src/components/Gamepad/interfaces';
import {IGameState} from './interfaces';
const SERVER_URL = 'http://192.168.1.132:8080/'
// const SERVER_URL = 'http://192.168.0.174:8080/'

export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = socketIo(SERVER_URL);
  }

  public registerUser(
    name: string, 
    teamId: TeamId, 
    skinUrl: string, 
    callback: (id: string) => void) {
    this.socket.emit(SOCKET_EVENTS.REGISTER_USER, name, teamId, skinUrl, callback);
  }

  public move(id: string, direction: Action) {
    // this.socket.emit(SOCKET_EVENTS.UPDATE_TANK, tank);
    this.socket.emit(SOCKET_EVENTS.MOVE, {id, direction});
  }

  public fire(id: string) {
    // this.socket.emit(SOCKET_EVENTS.UPDATE_TANK, tank);
    this.socket.emit(SOCKET_EVENTS.FIRE, {id});
  }

  public onUpdate(onUpdateCallback: (gameState: IGameState) => void) {
    this.socket.on(SOCKET_EVENTS.UPDATE, (gameState: IGameState) => {
        onUpdateCallback(gameState)
    });
}
}

const socketService = new SocketService()
export default socketService