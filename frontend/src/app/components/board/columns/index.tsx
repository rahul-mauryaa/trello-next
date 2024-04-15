"use client";
import React, { useState, FC, useEffect } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import AddColumnButton from "@/app/components/board/columns/buttons/add-column-button";
import CardDetailsModal from "@/app/components/board/columns/modals/card-details-modal";
import Column from "@/app/components/board/columns/column";
// import { CardDetail } from '@/app/types/cards';

import { useDispatch } from "react-redux";
// import {
//   addColumnToBoard,
//   fetchColumns,
//   updateColumnSequenceToLocalState,
//   updateColumnSequence
// } from '@/src/slices/columns';
// import { updateCardSequence, updateCardSequenceToLocalState } from '@/src/slices/cards';

import shortId from "shortid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  useLazyGetAllColumnsQuery,
  useCreateColumnsMutation,
} from "@/app/redux/api/columnApi";
import { resetColumns, setColumns } from "@/app/redux/slice/columnSlice";
import { useGetAllCardsQuery } from "@/app/redux/api/cardApi";
import { setCards } from "@/app/redux/slice/cardSlice";
import { toast } from "react-toastify";

const BoardColumns: FC = ({ board }: any): JSX.Element => {
  const boardId = board && board[0]?._id;
  const dispatch = useAppDispatch();
  const [trigger, result, lastPromiseInfo] = useLazyGetAllColumnsQuery();

  const {
    data: columnData,
    error: columnerror,
    isLoading: columnisLoading,
  } = result;

  const {
    data: cardData,
    isLoading: cardisLoading,
    error: cardError,
  } = useGetAllCardsQuery();

  const [createColumns, { isLoading: ccIsLoading }] =
    useCreateColumnsMutation();

  const columns = useAppSelector((state) => state.column.columns);
  const cards = useAppSelector((state) => state.card.cards);
  // const columns = [
  //   {
  //     _id: "6610cabf40f47793f8ee2f49",
  //     boardId: "vheA1N9be",
  //     boardName: null,
  //     columnName: "Add title",
  //     dateCreated: "4/8/2024, 9:28:02 AM",
  //     userId: "_rajoA53Q",
  //     sequence: 1,
  //   },
  // ];
  // const cards = [
  //   {
  //     _id: "3zk4GmbUX",
  //     boardId: "vheA1N9be",
  //     columnId: "6610cabf40f47793f8ee2f49",
  //     title: "Add title",
  //     type: "",
  //     dateCreated: "4/8/2024, 9:28:57 AM",
  //     userId: "_rajoA53Q",
  //     sequence: 1,
  //     description: "",
  //   },
  //   {
  //     _id: "etrytytu",
  //     boardId: "fdfdfd",
  //     columnId: "6610cabf40f47793f8ee2f49",
  //     title: "Add title",
  //     type: "",
  //     dateCreated: "4/8/2024, 9:28:57 AM",
  //     userId: "_rajoA53Q",
  //     sequence: 1,
  //     description: "",
  //   },
  // ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cardDetail, setCardDetail] = useState<any>({
    _id: "",
    title: "",
    description: "",
  });

  const showCardDetail = (cardId: string) => {
    const card = cards.filter((card: any) => card._id === cardId);

    setCardDetail(card[0]);
    onOpen();
  };

  const addColumn = async () => {
    await createColumns({ boardId: board[0]?._id });
    // await dispatch(addColumnToBoard(columnId));
    // await dispatch(fetchColumns());
  };

  const filterCards = (columnId: string) => {
    const filteredCards = cards.filter(
      (card: any) => card.columnId === columnId
    );
    return filteredCards;
  };

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId, type } = result;

    // Don't do anything where there is not destination
    if (!destination) {
      return;
    }

    // Do nothing if the card is put back where it was
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If card is being dragged
    if (type === "card") {
      await saveCardSequence(
        destination.index,
        destination.droppableId,
        draggableId
      );
    }

    // If column is being dragged
    if (type === "column") {
      await saveColumnSequence(destination.index, draggableId);
    }
  };

  const saveCardSequence = async (
    destinationIndex: number,
    destinationColumnId: string,
    cardId: string
  ) => {
    const cardsFromColumn = cards.filter(
      (card: any) =>
        card.columnId === destinationColumnId && card._id !== cardId
    );
    const sortedCards = cardsFromColumn.sort(
      (a: any, b: any) => a.sequence - b.sequence
    );

    let sequence =
      destinationIndex === 0
        ? 1
        : sortedCards[destinationIndex - 1].sequence + 1;

    const patchCard = {
      _id: cardId,
      sequence,
      columnId: destinationColumnId,
    };

    // This is just for updating local state so that there won't be any lag after saving the sequence and fetching again
    // Now we don't to fetch the cards again
    // await dispatch(updateCardSequenceToLocalState(patchCard));
    // await dispatch(updateCardSequence(patchCard));

    for (let i = destinationIndex; i < sortedCards.length; i++) {
      const card = sortedCards[i];
      sequence += 1;

      const patchCard = {
        _id: card._id,
        sequence,
        columnId: destinationColumnId,
      };

      // await dispatch(updateCardSequenceToLocalState(patchCard));
      // await dispatch(updateCardSequence(patchCard));
    }
  };

  const saveColumnSequence = async (
    destinationIndex: number,
    columnId: string
  ) => {
    // Remove the column which is dragged from the list
    const filteredColumns = columns.filter(
      (column: any) => column._id !== columnId
    );

    const sortedColumns = filteredColumns.sort(
      (a: any, b: any) => a.sequence - b.sequence
    );

    let sequence =
      destinationIndex === 0
        ? 1
        : sortedColumns[destinationIndex - 1].sequence + 1;

    const patchColumn = {
      _id: columnId,
      sequence,
    };

    // This is just for updating local state so that there won't be any lag after saving the sequence and fetching again
    // await dispatch(updateColumnSequenceToLocalState(patchColumn));
    // await dispatch(updateColumnSequence(patchColumn));

    for (let i = destinationIndex; i < sortedColumns.length; i++) {
      const column = sortedColumns[i];

      sequence += 1;

      const patchColumn = {
        _id: column._id,
        sequence,
      };

      // await dispatch(updateColumnSequenceToLocalState(patchColumn));
      // await dispatch(updateColumnSequence(patchColumn));
    }

    // Added temporarily to refresh the page on column, otherwise it will not reflect the changes
    // Will be fixed later
    window.location.reload();
  };

  useEffect(() => {
    if (boardId) {
      trigger(boardId);
    }
  }, [boardId]);

  useEffect(() => {
    if (columnData && !columnisLoading) {
      dispatch(setColumns(columnData));
    }
  }, [columnData, columnisLoading]);

  useEffect(() => {
    if (columnerror) {
      toast.error((columnerror as unknown as any).data.message);
      dispatch(resetColumns());
    }
  }, [columnerror]);

  useEffect(() => {
    if (cardData && !cardisLoading) {
      dispatch(setCards(cardData));
    }
  }, [cardData, cardisLoading]);

  return (
    <Box
      display="block"
      position="relative"
      height="calc(100vh - 90px)"
      overflowX="auto"
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-collumns"
          direction="horizontal"
          type="column"
        >
          {(provided: any) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              display="flex"
              position="absolute"
              overflowY="auto"
            >
              {columns &&
                columns.map((column: any, index: number) => (
                  <Column
                    key={column._id}
                    column={column}
                    id={column._id}
                    index={index}
                    cards={filterCards(column._id)}
                    showCardDetail={showCardDetail}
                  />
                ))}
              {provided.placeholder}
              <AddColumnButton
                addColumn={addColumn}
                isLoadingColumn={ccIsLoading}
              />
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      {isOpen && (
        <CardDetailsModal isOpen={isOpen} onClose={onClose} card={cardDetail} />
      )}
    </Box>
  );
};

export default BoardColumns;
