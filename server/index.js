const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

app.get('/api/cards', (req, res) => {
  res.send([
    { value: 0, label: '0', color: '#66bb6a' },
    { value: 0.5, label: '½', color: '#66bb6a' },
    { value: 1, label: '1', color: '#66bb6a' },
    { value: 2, label: '2', color: '#66bb6a' },
    { value: 3, label: '3', color: '#03a9f4' },
    { value: 5, label: '5', color: '#03a9f4' },
    { value: 8, label: '8', color: '#03a9f4' },
    { value: 13, label: '13', color: '#ba68c8' },
    { value: 20, label: '20', color: '#ba68c8' },
    { value: 40, label: '40', color: '#ba68c8' },
    { value: 99, label: '99', color: '#ba68c8' },
    { value: 0, label: '?', color: '#c2185b' },
    { value: 0, label: '☕️', color: '#c2185b' },
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));