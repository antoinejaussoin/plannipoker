import { observable, action, runInAction } from 'mobx';
import { RECEIVE_SELECTION, SEND_SELECTION, RENAME_USER, RECEIVE_PLAYER_LIST } from '../actions';

class Store {
  transport = null;
  api = null;

  @observable username;
  @observable cards = [];
  @observable selection = [];
  @observable players = [];
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
    this.transport.join(roomId);
    
    this.transport.on(RECEIVE_SELECTION, this.receiveSelection);
    this.transport.on(RECEIVE_PLAYER_LIST, this.receivePlayerList);
  }

  @action disconnect() {
    this.selection = [];
    this.players = [];
    this.transport.disconnect();
  }

  @action.bound receiveSelection(selection) {
    this.selection = selection;
  }

  @action.bound receivePlayerList(playerList) {
    this.players = playerList;
  }

  @action async loadCards() {
    const cards = await this.api.fetchCards();
    runInAction(() => {
      this.cards = cards;
    });
  }

  @action changeUsername(username) {
    this.username = username;
    this.transport.send(RENAME_USER, username);
  }

  @action selectCard(card) {
    this.selection.push(card);
    this.transport.send(SEND_SELECTION, this.selection);
  }
}

export default Store;
