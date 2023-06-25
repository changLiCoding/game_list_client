/* eslint-disable react/jsx-props-no-spreading */
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
import type {
  StatusContentType,
  StatusListType,
} from '@/components/UserListFilterColumn/types';
import StatusItem from '@/components/UserListFilterColumn/Desktop/StatusItem';
import { setLocalListOrder } from '@/features/userGamesListSlice';
import { useAppSelector, useAppDispatch } from '@/app/hooks';

const reorder = (
  list: StatusListType,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function ReorderLists() {
  const dispatch = useAppDispatch();
  const listState = useAppSelector((state) => state.userGames.localListOrder);

  const formattedListState = listState.map((item) => ({
    id: item,
    content: item[0].toUpperCase() + item.slice(1),
  }));

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newStatusOrder = reorder(
      formattedListState,
      result.source.index,
      result.destination.index
    );

    dispatch(setLocalListOrder(newStatusOrder.map((item) => item.id)));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {formattedListState.map(
              (singleStatus: StatusContentType, index: number) => (
                <StatusItem
                  status={singleStatus}
                  index={index}
                  key={singleStatus.id}
                />
              )
            )}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}

export default ReorderLists;

// import React, { useState } from 'react';
// import { DragDropContext, Draggable } from 'react-beautiful-dnd';
// import { StrictModeDroppable } from './StrictModeDroppable';

// const initial = Array.from({ length: 5 }, (v, k) => k).map((k) => {
//   const custom = {
//     id: `id-${k}`,
//     content: `Quote ${k}`,
//   };

//   return custom;
// });

// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// function Quote({ quote, index }) {
//   return (
//     <Draggable draggableId={quote.id} index={index}>
//       {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//         >
//           {quote.content}
//         </div>
//       )}
//     </Draggable>
//   );
// }

// const QuoteList = React.memo(function QuoteList({ quotes }) {
//   return quotes.map((quote, index) => (
//     <Quote quote={quote} index={index} key={quote.id} />
//   ));
// });

// function ReorderLists() {
//   const [state, setState] = useState({ quotes: initial });

//   const onDragEnd = (result) => {
//     if (!result.destination) {
//       return;
//     }

//     if (result.destination.index === result.source.index) {
//       return;
//     }

//     const quotes = reorder(
//       state.quotes,
//       result.source.index,
//       result.destination.index
//     );

//     console.log(quotes);

//     setState({ quotes });
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <StrictModeDroppable droppableId="list">
//         {(provided) => (
//           <div ref={provided.innerRef} {...provided.droppableProps}>
//             <QuoteList quotes={state.quotes} />
//             {provided.placeholder}
//           </div>
//         )}
//       </StrictModeDroppable>
//     </DragDropContext>
//   );
// }

// export default ReorderLists;
