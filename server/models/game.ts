import Story from './story';
import Player from './player';

export default class Game {
  stories: Story[] = [];
  players: Player[] = [];

  constructor() {
    this.stories = [
      new Story('Story'),
    ];
  }

  get story() {
    return this.stories[0];
  }

  createStory() {

  }
}
