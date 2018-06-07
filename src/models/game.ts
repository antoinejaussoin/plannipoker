import Story from './story';
import Player from './player';
import * as shortid from 'shortid';

export default class Game {
  id: string;
  stories: Story[] = [];
  players: Player[] = [];
  currentStoryId: string = null;

  constructor() {
    this.id = shortid();
  }
}
