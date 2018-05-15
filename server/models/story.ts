import Vote from './vote';

export default class Story {
  description: string = '(none)';
  votes: Vote[] = [];
  flipped: boolean = false;

  constructor(description: string) {
    this.description = description;
  }
}