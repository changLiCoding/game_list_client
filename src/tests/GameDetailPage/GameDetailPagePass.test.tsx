import { describe, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import GameDetail from '@/pages/GameDetail';
import { DefaultMockedProvider, renderVite } from '@/utils/test-utils';
import { GET_GAME_BY_ID } from '@/services/game/queries';
import { store } from '@/app/store';

const mocks = [
  {
    request: {
      query: GET_GAME_BY_ID,
      variables: {
        id: '2',
      },
    },
    result: {
      data: {
        getGameById: {
          __typename: 'Game',
          id: '2',
          name: 'Game 2',
          description: 'Description 2',
          imageURL:
            'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
          bannerURL:
            'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
          tags: ['3D', 'Fantasy'],
          platforms: ['PC'],
          genres: ['Action'],
          releaseDate: '2021-01-01 00:00:00',
          totalRating: 15,
          avgScore: 5,
          isGameLiked: false,
          isGameAdded: false,
        },
      },
    },
  },
];

describe('Game Detail Page', () => {
  it('should render the game detail page', async () => {
    vi.mock('react-router-dom', async () => {
      const actual: unknown = await vi.importActual('react-router-dom');
      if (typeof actual !== 'object')
        throw new Error('Import Actual did not return not an object');
      return {
        ...actual,
        useParams: vi.fn(() => ({ id: '2' })),
      };
    });

    const { queryByText, queryByLabelText, debug } = await renderVite(
      <DefaultMockedProvider mocks={mocks}>
        <GameDetail />
      </DefaultMockedProvider>,
      { store }
    );

    expect(await screen.findByText('Game 2')).toBeInTheDocument();
    expect(await screen.findByText('Description 2')).toBeInTheDocument();

    const downCircleButton = queryByLabelText('down-circle') as HTMLElement;

    await userEvent.click(downCircleButton);
    await waitFor(() => {
      expect(queryByText('Set as Planning')).toBeInTheDocument();
      expect(queryByText('Set as Playing')).toBeInTheDocument();
      expect(queryByText('Open List Editor')).toBeInTheDocument();
    });
  });
});
