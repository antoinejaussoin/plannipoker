import Story from './story';
import Player from './player';

export default class Game {
  stories: Story[] = [];
  currentStoryId: number = 0;
  players: Player[] = [];

  constructor() {
    this.stories = [
      new Story('Story 1'),
      new Story('Story 2'),
      new Story('Story 3'),
    ];
    this.currentStoryId = this.stories[0].id;
  }
}
