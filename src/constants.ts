export const FIRST_VIDEO_GAME_RELEASED_YEAR = 1958;

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

export const INITIAL_USER_GAME_LISTS = {
  selectedList: 'all',
  selectedLists: ['planning', 'playing', 'paused', 'completed', 'dropped'],
  listOrder: ['planning', 'playing', 'paused', 'completed', 'dropped'],
  localListOrder: ['planning', 'playing', 'paused', 'completed', 'dropped'],
  filters: {
    platform: '',
    tag: '',
    genre: '',
  },
  search: '',
};

export const INITIAL_USER_GAME_BY_ID_STATE = {
  completedDate: null,
  gameNote: '',
  gameStatus: '',
  private: false,
  rating: 0,
  startDate: null,
  id: '',
};
