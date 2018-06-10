import React, { SFC } from 'react';
import { observer } from 'mobx-react';
import PlayingCard from '../Components/Card';
import { Button, Card, CardActions, CardHeader, CardContent } from '@material-ui/core';
import { Story, Player } from '../models';
import styled from 'styled-components';

export interface StoryCardProps {
  story: Story;
  player: Player;
  flip: (story: Story) => void;
}

const Votes = styled.div`
  display: flex;
`;

const Vote = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
`;

const VoteName = styled.div`
  margin-top: 5px;

  @media (max-width: 600px) {
    font-size: 0.5em;
  }
`;

const StoryCard: SFC<StoryCardProps> = ({ story, player, flip }) => (
  <Card raised>
    <CardHeader
      title={story.title}
      subheader={story.description}
    />
    <CardContent>
      <Votes>
        { story.votes.map((vote, index) => (
          <Vote key={index}>
            <PlayingCard
              faceDown={!story.flipped && vote.player.id !== player.id}
              color={vote.card.color}>{vote.card.label}
            </PlayingCard>
            <VoteName>
              {vote.player.name}
            </VoteName>
          </Vote>
        ))}
      </Votes>
    </CardContent>
    { !story.flipped && player.owner &&
      <CardActions>
        <Button color="primary" onClick={() => flip(story)}>Flip!</Button>
      </CardActions>
    }
  </Card>
);

export default observer(StoryCard);
