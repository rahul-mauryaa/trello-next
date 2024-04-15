"use client";
import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
} from "@chakra-ui/react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import Cards from "@/app/components/board/columns/cards";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { GrDrag } from "react-icons/gr";

// import { deleteColumn, fetchColumns, updateColumn } from '@/src/slices/columns';
// import { addCard, fetchCards } from "@/src/slices/cards";
import debounce from "lodash.debounce";
import { useAppSelector } from "../../hooks";
import {
  useDeleteColumnsMutation,
  useUpdateColumnsMutation,
} from "@/app/redux/api/columnApi";
// import { CardDetail } from '@/src/types/cards';
// import { useAppSelector } from '@/src/hooks';

const Column = ({
  showCardDetail,
  column,
  index,
  id,
  cards,
}: any): JSX.Element => {
  const dispatch = useDispatch();
  const [showEditBox, setEditBoxVisibility] = useState<boolean>(false);
  // const cardRequest = useAppSelector((state) => state.cards.isRequesting);

  const [columnName, setColumnName] = useState<string>(column.columnName);
  const [deleteColumns] = useDeleteColumnsMutation();

  const [updateColumns] = useUpdateColumnsMutation();

  const cardsInSortedSequence = cards.sort(
    //   (cardA: CardDetail, cardB: CardDetail) => cardA.sequence - cardB.sequence
    // );
    (cardA: any, cardB: any) => cardA.sequence - cardB.sequence
  );

  const loadColumnTitle = (draggableProps: any) => {
    if (showEditBox) {
      return (
        <Input
          bg="white"
          value={columnName}
          size="xs"
          width="60%"
          ml="20px"
          onChange={handleChange}
          onBlur={() => setEditBoxVisibility(false)}
          onKeyDown={handleKeyDown}
        />
      );
    }

    return (
      <Heading
        {...draggableProps}
        as="h6"
        size="sm"
        ml="10px"
        mt="5px"
        textAlign="center"
      >
        <Box display="flex">
          <GrDrag /> {columnName}
        </Box>
      </Heading>
    );
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setEditBoxVisibility(false);
    }
  };

  const handleCardAdd = async () => {
    // await dispatch(addCard(column._id));
    // await dispatch(fetchCards());
  };

  const handleChange = (e: any) => {
    setColumnName(e.target.value);
    handleColumnNameChange(e.target.value);
  };

  const handleColumnDelete = async () => {
    await deleteColumns(id);
    // await dispatch(fetchColumns());
  };

  const handleColumnNameChange = useCallback(
    debounce((value: any) => nameChange(value), 800),
    []
  );

  const nameChange = async (value: any) => {
    const data = {
      columnName: value,
    };

    await updateColumns({ data: data, id });
  };

  return (
    <Draggable draggableId={column._id} index={index} key={column._id}>
      {(provided: any) => (
        <Box
          key={index}
          width="272px"
          height="calc(100vh - 90px)"
          overflowY="auto"
          mt="10px"
          mx="10px"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Box
            bg={column.columnName === "addColumn" ? "" : "#F0F0F0"}
            pb="5px"
            rounded="lg"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {loadColumnTitle(provided.dragHandleProps)}
              <Box my="10px" mr="10px" cursor="grab" display="flex">
                <Menu>
                  <MenuButton aria-label="Options">
                    <FiMoreHorizontal />
                  </MenuButton>
                  <MenuList justifyContent="center" alignItems="center">
                    <MenuItem
                      onClick={() => setEditBoxVisibility(!showEditBox)}
                    >
                      <AiOutlineEdit />
                      <Text marginLeft="5px">Edit</Text>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleColumnDelete}>
                      <AiOutlineDelete />
                      <Text marginLeft="5px">Delete</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Box>
            <Droppable droppableId={column._id} type="card">
              {(provided: any) => (
                // 2px height is needed to make the drop work when there is no card.
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  minHeight="2px"
                >
                  <Cards
                    showCardDetail={showCardDetail}
                    cards={cardsInSortedSequence}
                  />
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
            <Button
              size="xs"
              my="10px"
              mx="auto"
              width="80%"
              color="black"
              variant="ghost"
              // disabled={cardRequest}
              // isLoading={cardRequest}
              display="flex"
              loadingText="Adding card"
              onClick={handleCardAdd}
            >
              + Add a card
            </Button>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};

export default Column;
