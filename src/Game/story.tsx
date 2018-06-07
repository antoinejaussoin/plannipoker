import React, { SFC } from 'react';
import { observer } from 'mobx-react';
import PlayingCard from '../Components/Card';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Story } from '../models';
import styled from 'styled-components';

export interface PlayerListProps {
  story: Story;
  userId: string;
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

const StoryCard: SFC<PlayerListProps> = ({ story, userId }) => (
  <Card raised>
    <CardHeader
      title={story.description}
    />
    <CardContent>
      <Votes>
        { story.votes.map((vote, index) => (
          <Vote key={index}>
            <PlayingCard
              faceDown={!story.flipped && vote.player.id !== userId}
              color={vote.card.color}>{vote.card.label}
            </PlayingCard>
            <VoteName>
              {vote.player.name}
            </VoteName>
          </Vote>
        ))}
      </Votes>
    </CardContent>
  </Card>
);

export default observer(StoryCard);
