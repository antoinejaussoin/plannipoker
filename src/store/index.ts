import { observable, action, runInAction } from 'mobx';
import { RECEIVE_ALL_GAME_DATA, VOTE, RENAME_PLAYER, RECEIVE_PLAYER_LIST } from '../actions';
import { Transport } from './socket';
import { Api } from './api';

class Store {
  @observable username: string;
  @observable game = null;
  @observable cards = [];
  @observable roomId = null;

  constructor(public transport: Transport, public api: Api) {
    this.username = 'Unknown Player';
    this.loadCards();
  }

  @action async connect(roomId: string) {
    this.roomId = roomId;
    this.transport.connect();
    this.transport.join(roomId, this.username);

    this.transport.on(RECEIVE_ALL_GAME_DATA, this.receiveGameData);
    this.transport.on(RECEIVE_PLAYER_LIST, this.receivePlayerList);
  }

  @action disconnect() {
    this.game = null;
    this.transport.disconnect();
  }

  @action.bound receiveGameData(game: any) {
    this.game = game;
  }

  @action.bound receivePlayerList(playerList: any[]) {
    this.game.players = playerList;
  }

  @action async loadCards() {
    const cards = await this.api.fetchCards();
    runInAction(() => {
      this.cards = cards;
    });
  }

  @action changeUsername(username: string) {
    this.username = username;
    this.transport.send(RENAME_PLAYER, username);
  }

  @action createStory(description: string) {
    this.game.stories.push({

    });
  }
}

export default Store;
