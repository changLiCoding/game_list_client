/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { DragOutlined } from '@ant-design/icons';
import type { StatusContentType } from '../../types';
import styles from './StatusItemStyle.module.scss';

function StatusItem({
  status,
  index,
}: {
  status: StatusContentType;
  index: number;
}) {
  return (
    <Draggable draggableId={status.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.statusItem}
        >
          <p>{status.content}</p>
          <DragOutlined />
        </div>
      )}
    </Draggable>
  );
}

export default StatusItem;
