import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import ContextWrapper from '@/ContextWrapper';
import GameDetailHeaderInfo from '@/components/GameDetailHeader/GameDetailHeaderInfo/GameDetailHeaderInfo';
import { Game } from '@/graphql/__generated__/graphql';

describe('GameDetailHeaderInfo', () => {
  it('should render GameDetailHeaderInfo with name, description and image cover', () => {
    const game: Game = {
      __typename: 'Game',
      id: '1',
      name: 'Game 1',
      description: 'Description 1',
      imageURL: 'https://via.placeholder.com/150',
      tags: ['3D', 'Fantasy'],
      genres: ['Genre 1', 'Genre 2'],
      platforms: ['Platform 1', 'Platform 2'],
      releaseDate: '2021-01-01 00:00:00',
      avgScore: 5,
      bannerURL: 'https://example.com/banner.jpg',
      isGameAdded: false,
      isGameLiked: false,
    };

    const setGameMock = vi.fn();
    const { queryByText } = render(
      <ContextWrapper>
        <GameDetailHeaderInfo game={game} setGame={setGameMock} />
      </ContextWrapper>
    );

    const nameElement = screen.getByText('Game 1');
    expect(nameElement).toBeInTheDocument();
    expect(queryByText('Game 3')).not.toBeInTheDocument();

    const imgBanner = screen.queryByAltText('Game 1');
    expect(imgBanner).toBeInTheDocument();
    expect(imgBanner).toHaveAttribute('src', 'https://via.placeholder.com/150');

    const descriptionElement = screen.getByText('Description 1');
    expect(descriptionElement).toBeInTheDocument();
    expect(queryByText('Description 3')).not.toBeInTheDocument();
  });
});
