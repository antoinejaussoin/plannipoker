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
    this.stories = [
      new Story('Story 1'),
      new Story('Story 2'),
      new Story('Story 3'),
    ];
    this.currentStoryId = this.stories[0].id;
  }
}
