export default {
  init: {
    mood: 'sad',
    title: 'START A NEW GAME',
    content: 'Are you sure you want to give up?',
    buttons: [{ text: 'NEW GAME', action: 'init' }],
  },
  restart: {
    mood: 'sad',
    title: 'RESTART A NEW GAME',
    content: 'Are you sure you want to restart this game?',
    buttons: [{ text: 'RESTART', action: 'restart' }],
  },
  rule: {
    mood: 'happy',
    title: 'FREECELL RULE',
    content: '',
    buttons: [],
  },
  complete: {
    mood: 'joy',
    title: 'CONTRATULATIONS!',
    content: 'You win the game!',
    buttons: [{ text: 'PLAY AGAIN', action: 'restart' }, { text: 'NEW GAME', action: 'init' }],
  },
  stuck: {
    mood: 'sad',
    title: 'NO MORE MOVE',
    content: 'There are no moves available.',
    buttons: [
      { text: 'RESTART', action: 'restart' },
      { text: 'NEW GAME', action: 'init' },
      { text: 'UNDO', action: 'undo' },
    ],
  },
};
