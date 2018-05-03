import { observable, action } from 'mobx';

class Store {
  @observable username;

  constructor() {
    this.username = 'Unknown Player';
  }

  @action changeUsername(username) {
    this.username = username;
  }
}

export default Store;
