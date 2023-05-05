/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { StatusContentType } from '../types';

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
        >
          {status.content}
        </div>
      )}
    </Draggable>
  );
}

export default StatusItem;
