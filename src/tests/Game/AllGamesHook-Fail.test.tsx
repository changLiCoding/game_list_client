import { describe, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import useAllGames from '@/services/games/useAllGames';
import { store } from '@/app/store';
import { GET_ALL_GAMES } from '@/services/games/queries';

const mocks = [
  {
    request: {
      query: GET_ALL_GAMES,
      variables: {
        genre: [],
        tag: [],
        platform: [],
        year: undefined,
        excludedGenres: [],
        excludedTags: [],
        excludedPlatforms: [],
        sortBy: 'name',
        search: '',
        limit: 20,
        offset: 0,
      },
    },
    result: {
      data: {
        allGames: [],
      },
    },
  },
];

describe('useAllGames', () => {
  it('returns games and loading state', async () => {
    const { result } = renderHook(() => useAllGames(), {
      wrapper(props) {
        return (
          <Provider store={store}>
            <MockedProvider mocks={mocks}>
              <ConfigProvider>
                <BrowserRouter>{props.children}</BrowserRouter>
              </ConfigProvider>
            </MockedProvider>
          </Provider>
        );
      },
    });

    await waitFor(() => {
      expect(result.current.errors).toEqual(['No games found']);
      expect(result.current.games).toEqual([]);
    });
  });
});
