import { describe, it, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Game as GameType } from '@/graphql/__generated__/graphql';
import ContextWrapper from '@/ContextWrapper';
import ListEditor from '@/components/ListEditor';

describe('ListEditor Component', () => {
  it('should render the component when open is true', async () => {
    const game: GameType = {
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

    const setOpenMock = vi.fn();

    const { queryByText, queryByAltText, queryByTestId, queryAllByRole } =
      await render(
        <ContextWrapper>
          <ListEditor game={game} open setOpen={setOpenMock} />
        </ContextWrapper>
      );
    expect(queryByText('Game 1')).toBeInTheDocument();
    const coverElement = queryByAltText('Game 1') as HTMLImageElement;
    expect(coverElement).toBeInTheDocument();
    expect(coverElement).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150'
    );

    const statusElement = queryByTestId('dropdown-Status') as HTMLElement;
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('Status');

    const statusInput = queryAllByRole('combobox')['0'] as HTMLInputElement;
    await userEvent.click(statusInput);
    await waitFor(() => {
      const tag = queryAllByRole('menuitemcheckbox')['0'] as HTMLElement;
      expect(tag).toBeInTheDocument();
      expect(queryByText('Playing')).toBeInTheDocument();
    });

    const startDateElement = queryByTestId('date-picker-Start') as HTMLElement;
    expect(startDateElement).toBeInTheDocument();
    expect(startDateElement).toHaveValue('');
    await userEvent.click(startDateElement);
    await waitFor(async () => {
      const todayButton = queryByText('Today') as HTMLElement;
      expect(todayButton).toBeInTheDocument();

      await userEvent.click(todayButton);
      expect(startDateElement).toHaveValue(
        new Date(Date.now()).toISOString().slice(0, 10)
      );
    });

    const notesElement = queryByTestId('text-area-Notes') as HTMLElement;
    expect(notesElement).toBeInTheDocument();
    expect(notesElement).toHaveClass('ant-input');

    await userEvent.type(notesElement, '2021-01-01');
    expect(notesElement).toHaveValue('2021-01-01');
  });
});
