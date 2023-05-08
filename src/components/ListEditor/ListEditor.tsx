import { Modal, Button, Checkbox } from 'antd';

import { HeartOutlined } from '@ant-design/icons';
import useAddDeleteGame from '@/services/userGames/useAddDeleteGame';
import useNotification from '@/hooks/useNotification';
import { Game as GameType } from '@/graphql/__generated__/graphql';
import type {
  DropDownOption,
  OnChangeCheckboxType,
  OnChangeFilterType,
} from '@/types/global';
import FilterField from '../FiltersWrapper/FilterField';
import styles from '@/components/ListEditor/ListEditor.module.scss';

function ListEditor({
  open,
  setOpen,
  game,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  game: GameType;
}) {
  const onChange = (
    value: OnChangeFilterType | undefined,
    dateString: string | undefined
  ) => {
    // console.log(date, dateString);
  };

  const { contextHolder, info } = useNotification();

  const { addUserGames } = useAddDeleteGame();

  const onAddGameHandler = (gameId: string | undefined) => {
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
              onChange={(
                value: OnChangeFilterType | undefined,
                dateString?: string | undefined
              ): void => {
                // console.log(value);
              }}
              options={statusOptions}
              fieldName="Status"
              changeOnSelect
              type={undefined}
              optionalStyles={undefined}
            />
          </div>
          <div style={{ gridArea: 'score' }}>
            <FilterField
              type={undefined}
              optionalStyles={undefined}
              fieldName="Score"
              options={scoreOptions}
              changeOnSelect
              onChange={(
                value: OnChangeFilterType | undefined,
                dateString?: string | undefined
              ): void => {
                // console.log(value);
              }}
            />
          </div>
          <div style={{ gridArea: 'start' }}>
            <FilterField
              options={[]}
              optionalStyles={undefined}
              changeOnSelect={undefined}
              type="date"
              onChange={(
                value: OnChangeFilterType | undefined,
                dateString?: string | undefined
              ) => {
                // console.log(date, dateString);
              }}
              fieldName="Start"
            />
          </div>
          <div style={{ gridArea: 'finish' }}>
            <FilterField
              optionalStyles={undefined}
              options={[]}
              changeOnSelect={undefined}
              type="date"
              fieldName="Finish"
              onChange={(
                value: OnChangeFilterType | undefined,
                dateString?: string | undefined
              ) => {
                // console.log(date, dateString);
              }}
            />
          </div>
          <div style={{ gridArea: 'notes' }}>
            <FilterField
              optionalStyles={undefined}
              options={[]}
              changeOnSelect={undefined}
              type="text"
              fieldName="Notes"
              onChange={(
                value: OnChangeFilterType | undefined,
                dateString?: string | undefined
              ) => {
                // console.log(value?.target.value)
              }}
            />
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
