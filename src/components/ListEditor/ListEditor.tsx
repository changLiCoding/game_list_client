import { gql } from '@apollo/client';
import { Modal, Button, Checkbox, Select } from 'antd';
import {
  HeartOutlined,
  ExclamationCircleFilled,
  HeartFilled,
} from '@ant-design/icons';
import React from 'react';

import { apolloClient } from '@/graphql';
import useEditUserGame from '@/services/userGames/useEditUserGame';
import useNotification from '@/hooks/useNotification';
import type {
  DropDownOption,
  OnChangeCheckboxType,
  OnChangeDatePickerType,
  OnChangeTextAreaType,
} from '@/types/global';
import { setUserGameReducer } from '@/features/userGameSlice';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import styles from '@/components/ListEditor/ListEditor.module.scss';
import useAddRemoveGameCustomHook from '@/hooks/useAddRemoveGameCustomHook';
import DatePickerField from '../DatePickerField';
import TextAreaInput from '../TextAreaInput';
import type { ListEditorType } from '@/components/ListEditor/types';
import useAddRemoveLike from '@/services/like/useAddRemoveLike';
import type { Game as GameType } from '@/graphql/__generated__/graphql';

function ListEditorTemp({
  isGameAdded,
  userGameLoading,
  open,
  setOpen,
  game,
  setSelectedGame,
}: ListEditorType) {
  const userGame = useAppSelector((state) => state.userGame);

  const {
    gameStatus: selectedStatus,
    rating: selectedRating,
    gameNote: selectedNote,
    startDate: selectedStart,
    completedDate: selectedCompleted,
    private: selectedPrivate,
  } = userGame;

  const { contextHolder, info, warning } = useNotification();

  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { handleRemoveGameHook } = useAddRemoveGameCustomHook();
  const { editUserGame } = useEditUserGame();
  const { addLike, removeLike } = useAddRemoveLike();

  const statusOptions: DropDownOption[] = [
    { label: 'Playing', value: 'Playing' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Paused', value: 'Paused' },
    { label: 'Dropped', value: 'Dropped' },
    { label: 'Planning', value: 'Planning' },
  ];
  const scoreOptions: DropDownOption[] = Array.from(
    { length: 10 },
    (_, index) => index + 1
  ).map((score) => ({
    label: score,
    value: score,
  }));

  if (userGameLoading) {
    return <div>Loading...</div>;
  }

  const { confirm } = Modal;

  const showDeleteConfirm = () => {
    confirm({
      title: `Are you sure to remove ${game.name} from your list?`,
      icon: <ExclamationCircleFilled />,
      content: 'Click Yes would remove all data of this game as well.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        await handleRemoveGameHook(game);
        warning(`Game ${game.name} has been removed from your list.`);
        setOpen(false);
      },
      zIndex: 1041,
    });
  };

  return (
    <Modal
      className={styles.listEditorContainer}
      wrapClassName={styles.listEditor}
      zIndex={1040}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      <div
        className={styles.listEditorHeader}
        style={{ backgroundImage: `url(${game?.bannerURL})` }}
      >
        <div className={styles.headerContent}>
          <div className={styles.contentCover}>
            {game?.imageURL ? (
              <img src={game?.imageURL} alt={game?.name} />
            ) : null}
          </div>
          <div className={styles.contentTitle}>{game?.name}</div>
          <div className={styles.contentFavourite}>
            <Button
              className={styles.favouriteButton}
              type="ghost"
              onClick={async () => {
                if (userState?.user.id === '') {
                  warning('Please login to add or edit your GameList');
                  return;
                }
                if (!game?.isGameLiked) {
                  const tempGame = apolloClient.readFragment({
                    id: `Game:${game.id}`,
                    fragment: gql`
                      fragment GetAllGames on Game {
                        id
                        name
                        description
                        bannerURL
                        imageURL
                        releaseDate
                        avgScore
                        totalRating
                        genres
                        tags
                        platforms
                        isGameAdded
                        isGameLiked
                      }
                    `,
                  });
                  console.log('game before change', game);

                  const response = await addLike(
                    game.id,
                    game.__typename as string
                  );
                  setSelectedGame(response.like?.likeable as GameType);

                  info(`Game ${game?.name} added to your GameList`);
                } else {
                  const tempGame = apolloClient.readFragment({
                    id: `Game:${game.id}`,
                    fragment: gql`
                      fragment GetAllGames on Game {
                        id
                        name
                        description
                        bannerURL
                        imageURL
                        releaseDate
                        avgScore
                        totalRating
                        genres
                        tags
                        platforms
                        isGameAdded
                        isGameLiked
                      }
                    `,
                  });

                  const response = await removeLike(
                    game?.id,
                    game.__typename as string
                  );

                  setSelectedGame(response.like?.likeable as GameType);

                  info(`Game ${game?.name} already added to your GameList`);
                }
              }}
              icon={
                game?.isGameLiked ? (
                  <HeartFilled style={{ color: 'hotpink' }} />
                ) : (
                  <HeartOutlined />
                )
              }
            />
          </div>
          <div className={styles.contentSave}>
            <Button
              type="primary"
              onClick={async () => {
                if (userState?.user.id === '') {
                  warning('Please login to add or edit your GameList');
                  return;
                }
                const { id, ...newUserGame } = userGame;
                await editUserGame({ ...newUserGame, gameId: game.id });

                info(`Edit game ${game.name} successfully`);
                setOpen(false);
              }}
              className={styles.saveButton}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.listEditorBody}>
        <div className={styles.bodyInput}>
          <div style={{ gridArea: 'status' }}>
            <div>
              <h3>Status</h3>
              <Select
                data-testid="dropdown-Status"
                value={selectedStatus || undefined}
                onChange={(value: string): void => {
                  dispatch(
                    setUserGameReducer({ type: 'gameStatus', payload: value })
                  );
                }}
                options={statusOptions}
                placeholder="Status"
                allowClear
              />
            </div>
          </div>
          <div style={{ gridArea: 'score' }}>
            <div>
              <h3>Score</h3>
              <Select
                data-testid="dropdown-Score"
                value={selectedRating || undefined}
                onChange={(value: number): void => {
                  dispatch(
                    setUserGameReducer({
                      type: 'rating',
                      payload: value,
                    })
                  );
                }}
                options={scoreOptions}
                placeholder="Score"
                allowClear
              />
            </div>
          </div>
          <div style={{ gridArea: 'start' }}>
            <div>
              <h3>Start</h3>
              <DatePickerField
                defaultValue={selectedStart || undefined}
                onChange={(value: OnChangeDatePickerType) => {
                  dispatch(
                    setUserGameReducer({
                      type: 'startDate',
                      payload: value?.toISOString(),
                    })
                  );
                }}
                fieldName="Start"
                customCascaderStyle={styles.cascaderStyle}
              />
            </div>
          </div>
          <div style={{ gridArea: 'finish' }}>
            <div>
              <h3>Finish</h3>
              <DatePickerField
                defaultValue={selectedCompleted || undefined}
                fieldName="Finish"
                customCascaderStyle={styles.cascaderStyle}
                onChange={(value: OnChangeDatePickerType) => {
                  dispatch(
                    setUserGameReducer({
                      type: 'completedDate',
                      payload: value?.toISOString(),
                    })
                  );
                }}
              />
            </div>
          </div>
          <div style={{ gridArea: 'notes' }}>
            <div>
              <h3>Notes</h3>
              <TextAreaInput
                defaultValue={selectedNote || undefined}
                fieldName="Notes"
                customCascaderStyle={styles.cascaderStyle}
                onChange={(value: OnChangeTextAreaType) => {
                  dispatch(
                    setUserGameReducer({
                      type: 'gameNote',
                      payload: value.target.value,
                    })
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.bodyCheckbox}>
          <div className={styles.checkboxList}>
            <div>Custom Lists</div>
            <span>No custom game lists</span>
          </div>
          <Checkbox
            checked={selectedPrivate || false}
            onChange={(e: OnChangeCheckboxType) => {
              dispatch(
                setUserGameReducer({
                  type: 'private',
                  payload: e.target.checked,
                })
              );
            }}
          >
            Private
          </Checkbox>
          {isGameAdded && (
            <Button type="dashed" onClick={showDeleteConfirm}>
              Delete
            </Button>
          )}
        </div>
      </div>
      {contextHolder}
    </Modal>
  );
}

const ListEditor = React.memo(ListEditorTemp);

export default ListEditor;
