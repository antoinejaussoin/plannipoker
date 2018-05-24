import { observable, action, runInAction, computed } from 'mobx';
import { find, findIndex } from 'lodash';
import ls from 'local-storage';
import {
  RECEIVE_ALL_GAME_DATA,
  VOTE,
  RENAME_PLAYER,
  RECEIVE_PLAYER_LIST,
  RECEIVE_STORY_UPDATE,
  CREATE_STORY,
  SELECT_STORY,
} from '../actions';
import { Game, Card, Player, Vote } from '../models';
import { Transport } from './socket';
import { Api } from './api';
import Story from '../models/story';

const LOCAL_STORAGE_KEY = 'plannipoker-user';

class Store {
  @observable username: string;
  @observable userId: number;
  @observable game: Game ;
  @observable cards: Card[] = [];
  @observable roomId: string = null;
  @observable newStoryName: string = '';

  constructor(public transport: Transport, public api: Api) {
    const user = ls(LOCAL_STORAGE_KEY);
    if (!user) {
      this.username = 'Unknown Player';
      this.userId = Date.now(); // Todo: truly random number instead
      this.persistUser();
    } else {
      this.username = user.username;
      this.userId = user.id;
    }

    this.loadCards();
  }

  @action async connect(roomId: string) {
    this.roomId = roomId;
    this.transport.connect();
    this.transport.join(roomId, this.userId, this.username);

    this.transport.on(RECEIVE_ALL_GAME_DATA, this.receiveGameData);
    this.transport.on(RECEIVE_PLAYER_LIST, this.receivePlayerList);
    this.transport.on(RECEIVE_STORY_UPDATE, this.receiveStoryUpdate);
  }

  @action disconnect() {
    this.game = null;
    this.transport.disconnect();
  }

  @action.bound receiveGameData(game: Game) {
    this.game = game;
  }

  @action.bound receivePlayerList(playerList: Player[]) {
    this.game.players = playerList;
  }

  @action.bound receiveStoryUpdate(story: Story) {
    const index = findIndex(this.game.stories, { id: story.id });
    if (index > -1) {
      this.game.stories[index] = story;
    }
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
    this.persistUser();
  }

  @action createStory() {
    const story: Story = {
      id: Date.now(),
      description: this.newStoryName,
      flipped: false,
      votes: [],
    };
    this.game.stories.push(story);
    this.transport.send(CREATE_STORY, story);
    this.newStoryName = '';
  }

  @action updateNewStoryName(name: string) {
    this.newStoryName = name;
  }

  @computed get canCreateStory(): boolean {
    return this.newStoryName.length > 0;
  }

  @computed get currentStory(): Story {
    if (!this.game) {
      return null;
    }
    return find(this.game.stories, { id: this.game.currentStoryId });
  }

  @computed get currentPlayer(): Player {
    if (!this.game) {
      return null;
    }
    return find(this.game.players, { name: this.username });
  }

  @computed get hasVoted(): boolean {
    if (!this.currentStory) {
      return false;
    }
    return this.currentStory.votes.find(vote => vote.player.name === this.username) !== undefined;
  }

  @action selectStory(id: number) {
    this.game.currentStoryId = id;
    this.transport.send(SELECT_STORY, id);
  }

  @action vote(card: Card) {
    const currentStory = this.currentStory;
    const player = this.currentPlayer;
    if (currentStory && !this.hasVoted) {
      currentStory.votes.push({
        card,
        player,
      });
      this.transport.send(VOTE, {
        storyId: currentStory.id,
        card,
      });
    }
  }

  private persistUser() {
    ls(LOCAL_STORAGE_KEY, {
      username: this.username,
      id: this.userId,
    });
  }
}

export default Store;