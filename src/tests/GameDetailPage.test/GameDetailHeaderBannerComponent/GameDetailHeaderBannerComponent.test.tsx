import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ContextWrapper from '@/ContextWrapper';
import GameDetailHeaderBanner from '@/components/GameDetailHeader/GameDetailHeaderBanner';
import { Game } from '@/graphql/__generated__/graphql';

describe('GameDetailHeaderBanner', () => {
  it('renders banner element with background image', () => {
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
    };
    render(
      <ContextWrapper>
        <GameDetailHeaderBanner game={game} />
      </ContextWrapper>
    );

    const bannerElement = screen.getByRole('banner');
    expect(bannerElement).toBeInTheDocument();
    expect(bannerElement).toHaveStyle(
      `background-image: url(${game.bannerURL})`
    );
  });
});
