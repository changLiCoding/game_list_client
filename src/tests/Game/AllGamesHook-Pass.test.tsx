import { describe, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';

import { MockedProvider } from '@apollo/client/testing';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';

import useAllGames from '@/services/games/useAllGames';
import { GET_ALL_GAMES } from '@/services/games/queries';
import { store } from '@/app/store';

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
        allGames: [
          {
            __typename: 'Game',
            id: '1',
            name: 'Game 1',
            description: 'Description 1',
            imageURL:
              'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
            bannerURL:
              'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
            tags: ['3D', 'Fantasy'],
            genres: ['Action', 'Adventure'],
            platforms: ['PC', 'macOS'],
            releaseDate: '2021-01-01 00:00:00',
            avgScore: 5,
            totalRating: 5,
            isGameAdded: false,
            isGameLiked: false,
          },
          {
            __typename: 'Game',
            id: '2',
            name: 'Game 2',
            description: 'Description 2',
            imageURL:
              'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
            bannerURL:
              'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
            tags: ['4D', 'Soullike'],
            genres: ['Role Playing', 'Straitagy'],
            platforms: ['Xbox 360', 'Playstation 3'],
            releaseDate: '2021-01-02 00:00:00',
            avgScore: 10,
            totalRating: 5,
            isGameAdded: false,
            isGameLiked: false,
          },
          {
            __typename: 'Game',
            id: '3',
            name: 'Game 3',
            description: 'Description 3',
            imageURL:
              'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
            bannerURL:
              'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
            tags: ['2D', 'Action'],
            genres: ['JRPG', 'Simulation'],
            platforms: ['Xbox', 'Playstation 2'],
            releaseDate: '2021-01-03 00:00:00',
            avgScore: 8,
            totalRating: 5,
            isGameAdded: false,
            isGameLiked: false,
          },
        ],
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
      expect(result.current.games).toEqual([
        {
          __typename: 'Game',
          id: '1',
          name: 'Game 1',
          description: 'Description 1',
          imageURL:
            'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
          bannerURL:
            'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
          tags: ['3D', 'Fantasy'],
          genres: ['Action', 'Adventure'],
          platforms: ['PC', 'macOS'],
          releaseDate: '2021-01-01 00:00:00',
          avgScore: 5,
          totalRating: 5,
          isGameAdded: false,
          isGameLiked: false,
        },
        {
          __typename: 'Game',
          id: '2',
          name: 'Game 2',
          description: 'Description 2',
          imageURL:
            'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
          bannerURL:
            'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
          tags: ['4D', 'Soullike'],
          genres: ['Role Playing', 'Straitagy'],
          platforms: ['Xbox 360', 'Playstation 3'],
          releaseDate: '2021-01-02 00:00:00',
          avgScore: 10,
          totalRating: 5,
          isGameAdded: false,
          isGameLiked: false,
        },
        {
          __typename: 'Game',
          id: '3',
          name: 'Game 3',
          description: 'Description 3',
          imageURL:
            'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
          bannerURL:
            'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
          tags: ['2D', 'Action'],
          genres: ['JRPG', 'Simulation'],
          platforms: ['Xbox', 'Playstation 2'],
          releaseDate: '2021-01-03 00:00:00',
          avgScore: 8,
          totalRating: 5,
          isGameAdded: false,
          isGameLiked: false,
        },
      ]);
      expect(result.current.errors).toEqual([]);
    });
  });
});
