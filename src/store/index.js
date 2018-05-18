import { observable, action, runInAction } from 'mobx';
import { RECEIVE_ALL_GAME_DATA, VOTE, RENAME_PLAYER, RECEIVE_PLAYER_LIST } from '../actions';

class Store {
  transport = null;
  api = null;

  @observable username;
  @observable game = null;
  @observable cards = [];
  @observable roomId = null;
  
  constructor(transport, api) {
    this.transport = transport;
    this.api = api;
    this.username = 'Unknown Player';
    this.loadCards();
  }

  @action async connect(roomId) {
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

  @action.bound receiveGameData(game) {
    this.game = game;
  }

  @action.bound receivePlayerList(playerList) {
    this.game.players = playerList;
  }

  @action async loadCards() {
    const cards = await this.api.fetchCards();
    runInAction(() => {
      this.cards = cards;
    });
  }

  @action changeUsername(username) {
    this.username = username;
    this.transport.send(RENAME_PLAYER, username);
  }

  @action createStory(description) {
    this.game.stories.push({

    });
  }
}

export default Store;
