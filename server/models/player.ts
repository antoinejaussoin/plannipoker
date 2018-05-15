export default class Player {
  id: string = null;
  name: string = null;
  owner: boolean = false;

  constructor(id: string, name: string, owner: boolean) {
    this.id = id;
    this.name = name;
    this.owner = owner;
  }
}

