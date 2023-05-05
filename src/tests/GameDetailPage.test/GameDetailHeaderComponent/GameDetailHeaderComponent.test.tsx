import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ContextWrapper from '@/ContextWrapper';
import GameDetailHeaderInfo from '@/components/GameDetailHeader/GameDetailHeaderInfo/GameDetailHeaderInfo';
import GameDetailHeaderBanner from '@/components/GameDetailHeader/GameDetailHeaderBanner';
import { Game } from '@/graphql/__generated__/graphql';

describe('GameDetailHeader', () => {
  it('should render GameDetailHeader with banner and info', () => {
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
        <GameDetailHeaderInfo game={game} />
      </ContextWrapper>
    );

    const bannerElement = screen.getByRole('banner');
    expect(bannerElement).toBeInTheDocument();
    expect(bannerElement).toHaveStyle(
      `background-image: url(https://example.com/banner.jpg)`
    );

    const nameElement = screen.getByText('Game 1');
    expect(nameElement).toBeInTheDocument();

    const descriptionElement = screen.getByText('Description 1');
    expect(descriptionElement).toBeInTheDocument();
  });
});
