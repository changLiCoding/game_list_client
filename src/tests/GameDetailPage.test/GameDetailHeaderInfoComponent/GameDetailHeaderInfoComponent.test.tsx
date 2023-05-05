import { describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import ContextWrapper from '@/ContextWrapper';
import GameDetailHeaderInfo from '@/components/GameDetailHeader/GameDetailHeaderInfo/GameDetailHeaderInfo';
import { Game } from '@/graphql/__generated__/graphql';

describe('GameDetailHeaderInfo', () => {
  it('should render GameDetailHeaderInfo with name and description', () => {
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
        <GameDetailHeaderInfo game={game} />
      </ContextWrapper>
    );

    const nameElement = screen.getByText(game.name);
    expect(nameElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(game.description);
    expect(descriptionElement).toBeInTheDocument();
  });
});
