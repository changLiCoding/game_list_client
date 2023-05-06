import { Modal, Button } from 'antd';
import type { DatePickerProps } from 'antd';

import { HeartOutlined } from '@ant-design/icons';
import { Game as GameType } from '@/graphql/__generated__/graphql';
import type { DropDownOption, OnChangeType } from '@/types/global';
import FilterField from '../FiltersWrapper/FilterField';
import styles from '@/components/ListEditor/ListEditor.module.scss';

function ListEditor({
  open,
  setOpen,
  game,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  game: GameType | undefined;
}) {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
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
            <Button type="ghost" icon={<HeartOutlined />} />
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
              onChange={(value: OnChangeType): void => {
                // console.log(value);
              }}
              options={statusOptions}
              fieldName="Status"
              changeOnSelect
              type={null}
              optionalStyles={null}
            />
          </div>
          <div style={{ gridArea: 'score' }}>
            <FilterField
              type={null}
              optionalStyles={null}
              fieldName="Score"
              options={scoreOptions}
              changeOnSelect
              onChange={(value: OnChangeType): void => {
                // console.log(value);
              }}
            />
          </div>
          <div style={{ gridArea: 'start' }}>
            <FilterField type="date" onChange={onChange} fieldName="Start" />
          </div>
          <div style={{ gridArea: 'finish' }}>
            <FilterField type="date" fieldName="Finish" onChange={onChange} />
          </div>
          <div className={styles.inputNote} style={{ gridArea: 'notes' }}>
            <FilterField type="text" fieldName="Notes" />
          </div>
        </div>
        <div className={styles.bodyCheckbox}>Check box</div>
      </div>
    </Modal>
  );
}

export default ListEditor;
