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
