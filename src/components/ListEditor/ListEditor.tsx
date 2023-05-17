import { Modal, Button, Checkbox } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import useAddDeleteGame from '@/services/userGames/useAddDeleteGame';
import useNotification from '@/hooks/useNotification';
import type {
  DropDownOption,
  OnChangeCascaderType,
  OnChangeCheckboxType,
  OnChangeDatePickerType,
  OnChangeTextAreaType,
} from '@/types/global';
import FilterField from '../FiltersWrapper/FilterField';
import styles from '@/components/ListEditor/ListEditor.module.scss';
import DatePickerField from '../DatePickerField';
import TextAreaInput from '../TextAreaInput';
import type { ListEditorType } from '@/components/ListEditor/types';
import useUserGameById from '@/services/userGames/useUserGameById';

function ListEditor({ open, setOpen, game }: ListEditorType) {
  const onChange = (value: OnChangeDatePickerType, dateString: string) => {
    // console.log(date, dateString);
  };

  const { userGameLoading, userGame } = useUserGameById(game.id);

  const userGameData = userGameLoading ? [] : userGame.getUserGameByGameId;
  !userGameLoading && console.log(userGameData);

  const { contextHolder, info } = useNotification();

  const { addUserGames } = useAddDeleteGame();

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
              type="ghost"
              onClick={() => {
                onAddGameHandler(game?.id);
              }}
              icon={<HeartOutlined />}
            />
          </div>
          <div className={styles.contentSave}>
            <Button type="primary">Save</Button>
          </div>
        </div>
      </div>
      <div className={styles.listEditorBody}>
        <div className={styles.bodyInput}>
          <div style={{ gridArea: 'status' }}>
            <FilterField
              defaultValue={
                userGameData.length > 0
                  ? userGameData[0]?.gameStatus
                  : undefined
              }
              onChange={(value: OnChangeCascaderType): void => {
                // console.log(value);
              }}
              options={statusOptions}
              fieldName="Status"
              changeOnSelect
              customCascaderStyle={styles.cascaderStyle}
            />
          </div>
          <div style={{ gridArea: 'score' }}>
            <FilterField
              defaultValue={
                userGameData[0]?.rating
                  ? userGameData[0]?.rating.toString()
                  : undefined
              }
              fieldName="Score"
              changeOnSelect
              customCascaderStyle={styles.cascaderStyle}
              options={scoreOptions}
              onChange={(value: OnChangeCascaderType): void => {
                // console.log(value);
              }}
            />
          </div>
          <div style={{ gridArea: 'start' }}>
            <div>
              <h3 className={styles.h3FilterFieldTitle}>Start</h3>
              <DatePickerField
                // value={
                //   userGameData[0]?.startDate
                //     ? userGameData[0].startDate
                //     : undefined
                // }
                value="2023-05-17T03:02:48Z"
                onChange={onChange}
                fieldName="Start"
                customCascaderStyle={styles.cascaderStyle}
              />
            </div>
          </div>
          <div style={{ gridArea: 'finish' }}>
            <div>
              <h3 className={styles.h3FilterFieldTitle}>Finish</h3>
              <DatePickerField
                fieldName="Finish"
                customCascaderStyle={styles.cascaderStyle}
                onChange={onChange}
              />
            </div>
          </div>
          <div style={{ gridArea: 'notes' }}>
            <div>
              <h3 className={styles.h3FilterFieldTitle}>Notes</h3>
              <TextAreaInput
                fieldName="Notes"
                customCascaderStyle={styles.cascaderStyle}
                onChange={(value: OnChangeTextAreaType) => {
                  // console.log(value?.target.value)
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
            onChange={(e: OnChangeCheckboxType) => {
              // console.log(`checked = ${e.target.checked}`);
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
