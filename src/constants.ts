export const getTokenFromLocalStorage = {
  context: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
};

export const INITIAL_USER_STATE = {
  loading: true,
  user: {
    username: '',
    bannerPicture: '',
    createdAt: '',
    games: [],
    isActive: false,
    userGames: [],
    userPicture: '',
    __typename: '',
  },
};

export const USER_LISTS = [
  {
    id: 'planning',
    content: 'Planning',
  },
  {
    id: 'playing',
    content: 'Playing',
  },
  {
    id: 'completed',
    content: 'Completed',
  },
  {
    id: 'paused',
    content: 'Paused',
  },
  {
    id: 'dropped',
    content: 'Dropped',
  },
];
