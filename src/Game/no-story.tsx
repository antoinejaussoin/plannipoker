import React, { SFC } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';

const NoStory: SFC = () => (
  <Card raised>
    <CardHeader
      title="No stories yet!"
    />
    <CardContent>
      It looks like you don't have any stories to vote on yet. You can add stories on the right-hand-side panel.
    </CardContent>
  </Card>
);

export default NoStory;
