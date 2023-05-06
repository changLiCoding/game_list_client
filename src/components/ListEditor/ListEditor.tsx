import { Modal, Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Game as GameType } from '@/graphql/__generated__/graphql';

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
  return (
    <Modal
      className={styles.listEditorContainer}
      wrapClassName={styles.listEditor}
      zIndex={1500}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
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
        <div className={styles.bodyInput}>input</div>
        <div className={styles.bodyCheckbox}>Check box</div>
      </div>
    </Modal>
  );
}

export default ListEditor;
