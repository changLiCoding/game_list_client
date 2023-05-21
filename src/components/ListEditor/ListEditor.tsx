import { Modal, Button, Checkbox, Select } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import useAddDeleteGame from '@/services/userGames/useAddDeleteGame';
import useEditUserGame from '@/services/userGames/useEditUserGame';
import useNotification from '@/hooks/useNotification';
import type {
  DropDownOption,
  OnChangeCheckboxType,
  OnChangeDatePickerType,
  OnChangeTextAreaType,
} from '@/types/global';
import {
  setUserGameCompletedDate,
  setUserGameNote,
  setUserGameStatus,
  setUserGamePrivate,
  setUserGameRating,
  setUserGameStartDate,
} from '@/features/userGameSlice';
import { useAppSelector } from '@/app/hooks';
import styles from '@/components/ListEditor/ListEditor.module.scss';
import DatePickerField from '../DatePickerField';
import TextAreaInput from '../TextAreaInput';
import type { ListEditorType } from '@/components/ListEditor/types';

function ListEditor({ userGameLoading, open, setOpen, game }: ListEditorType) {
  const dispatch = useDispatch();
  const { userGame } = useAppSelector((state) => state);

  const {
    gameStatus: selectedStatus,
    rating: selectedRating,
    gameNote: selectedNote,
    startDate: selectedStart,
    completedDate: selectedCompleted,
    private: selectedPrivate,
  } = userGame;

  const { contextHolder, info } = useNotification();

  const { addUserGames } = useAddDeleteGame();
  const { editUserGame } = useEditUserGame();

  const onAddGameHandler = (gameId: string) => {
    addUserGames(gameId);
    info(`Game ${game?.name} added to your list`);
  };

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
    label: score.toString(),
    value: score.toString(),
  }));

  if (userGameLoading) {
    return <div>Loading...</div>;
  }

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
              onClick={() => {
                onAddGameHandler(game?.id);
              }}
              icon={<HeartOutlined />}
            />
          </div>
          <div className={styles.contentSave}>
            <Button
              type="primary"
              onClick={async () => {
                // Have to parse rating to int before send the request
                await editUserGame({
                  ...userGame,
                  rating: parseInt(userGame?.rating.toString(), 10),
                  gameId: game?.id,
                });

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
              <h3 className={styles.h3FilterFieldTitle}>Status</h3>
              <Select
                data-testid="dropdown-Status"
                defaultValue={selectedStatus || undefined}
                onChange={(value: string): void => {
                  dispatch(setUserGameStatus(value));
                }}
                options={statusOptions}
                placeholder="Status"
                allowClear
              />
            </div>
          </div>
          <div style={{ gridArea: 'score' }}>
            <div>
              <h3 className={styles.h3FilterFieldTitle}>Score</h3>
              <Select
                data-testid="dropdown-Score"
                defaultValue={selectedRating || undefined}
                onChange={(value: number): void => {
                  dispatch(setUserGameRating(value));
                }}
                options={scoreOptions}
                placeholder="Score"
                allowClear
              />
            </div>
          </div>
          <div style={{ gridArea: 'start' }}>
            <div>
              <h3 className={styles.h3FilterFieldTitle}>Start</h3>
              <DatePickerField
                defaultValue={selectedStart || undefined}
                onChange={(value: OnChangeDatePickerType) => {
                  dispatch(setUserGameStartDate(value?.toISOString()));
                }}
                fieldName="Start"
                customCascaderStyle={styles.cascaderStyle}
              />
            </div>
          </div>
          <div style={{ gridArea: 'finish' }}>
            <div>
              <h3 className={styles.h3FilterFieldTitle}>Finish</h3>
              <DatePickerField
                defaultValue={selectedCompleted || undefined}
                fieldName="Finish"
                customCascaderStyle={styles.cascaderStyle}
                onChange={(value: OnChangeDatePickerType) => {
                  dispatch(setUserGameCompletedDate(value?.toISOString()));
                }}
              />
            </div>
          </div>
          <div style={{ gridArea: 'notes' }}>
            <div>
              <h3 className={styles.h3FilterFieldTitle}>Notes</h3>
              <TextAreaInput
                defaultValue={selectedNote || undefined}
                fieldName="Notes"
                customCascaderStyle={styles.cascaderStyle}
                onChange={(value: OnChangeTextAreaType) => {
                  dispatch(setUserGameNote(value.target.value));
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
              dispatch(setUserGamePrivate(e.target.checked));
            }}
          >
            Private
          </Checkbox>
        </div>
      </div>
      {contextHolder}
    </Modal>
  );
}

export default ListEditor;
