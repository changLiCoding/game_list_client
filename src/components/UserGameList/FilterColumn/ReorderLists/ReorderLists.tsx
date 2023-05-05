/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';

const initial = Array.from({ length: 5 }, (v, k) => k).map((k) => {
  const custom = {
    id: `id-${k}`,
    content: `Quote ${k}`,
  };

  return custom;
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Quote({ quote, index }) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {quote.content}
        </div>
      )}
    </Draggable>
  );
}

const QuoteList = React.memo(function QuoteList({ quotes }) {
  return quotes.map((quote, index) => (
    <Quote quote={quote} index={index} key={quote.id} />
  ));
});

function ReorderLists() {
  const [state, setState] = useState({ quotes: initial });

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );

    console.log(quotes);

    setState({ quotes });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}

export default ReorderLists;
