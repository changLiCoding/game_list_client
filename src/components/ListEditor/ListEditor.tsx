import { Modal, Button, Checkbox, Select } from 'antd';
import {
  HeartOutlined,
  ExclamationCircleFilled,
  HeartFilled,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import React from 'react';

import useEditUserGame from '@/services/userGames/useEditUserGame';
import useNotification from '@/hooks/useNotification';
import type {
  DropDownOption,
  OnChangeCheckboxType,
  OnChangeDatePickerType,
  OnChangeTextAreaType,
} from '@/types/global';
import { setUserGameReducer } from '@/features/userGameSlice';
import { useAppSelector } from '@/app/hooks';
import styles from '@/components/ListEditor/ListEditor.module.scss';
import useAddRemoveGameCustomHook from '@/hooks/useAddRemoveGameCustomHook';
import DatePickerField from '../DatePickerField';
import TextAreaInput from '../TextAreaInput';
import type { ListEditorType } from '@/components/ListEditor/types';

function ListEditorTemp({
  isGameAdded,
  userGameLoading,
  open,
  setOpen,
  game,
}: ListEditorType) {
  const dispatch = useDispatch();
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

  const {
    handleAddGameHook,
    handleRemoveGameHook,
    contextHolder: handGameContextHolder,
  } = useAddRemoveGameCustomHook();
  const { editUserGame } = useEditUserGame();

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
            {game?.imageURL && <img src={game?.imageURL} alt={game?.name} />}
          </div>
          <div className={styles.contentTitle}>{game?.name}</div>
          <div className={styles.contentFavourite}>
            <Button
              className={styles.favouriteButton}
              type="ghost"
              onClick={async () => {
                if (!isGameAdded) {
                  await handleAddGameHook(game);
                } else {
                  info(`Game ${game?.name} already added to your GameList`);
                }
              }}
              icon={
                isGameAdded ? (
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

                    // Rating(value)
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
      {handGameContextHolder}
    </Modal>
  );
}

const ListEditor = React.memo(ListEditorTemp);

export default ListEditor;
