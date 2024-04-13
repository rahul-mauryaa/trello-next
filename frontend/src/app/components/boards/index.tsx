"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Input,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
// import { useDispatch } from 'react-redux';
// import { useAppSelector } from '@/src/hooks';
// import { updateBoardDetail, resetBoard } from '@/src/slices/board';
// import { createBoard } from '@/src/slices/boards';
import { AiOutlinePlus } from "react-icons/ai";
import {
  useCreateBoardMutation,
  useLazyGetBoardQuery,
} from "@/app/redux/api/boardApi";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setBoards } from "@/app/redux/slice/boardSlice";
// import { fetchBoards } from '@/src/slices/boards';

const Boards = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [
    createBoard,
    { data: createBoardData, isLoading: cbisLoading, error },
  ] = useCreateBoardMutation();

  const userData = useAppSelector((state: any) => state.auth.users);
  const user_id = userData && userData.id;

  const [trigger, result, lastPromiseInfo] = useLazyGetBoardQuery();
  const {
    data: gbData,
    error: gberror,
    isError,
    isLoading: gbisLoading,
    isFetching,
  } = result;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [values, setValues] = useState({
    name: "",
  });
  // const boards = useAppSelector((state) => state.boards.boards);
  const boards = [] as any;
  // const dispatch = useDispatch();
  // const board = useAppSelector((state) => state.board.board);
  // const boardRequest = useAppSelector((state) => state.boards.isRequesting);

  const handleCreate = async () => {
    await createBoard(values);

    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const createBoardModal = () => {
    return (
      <>
        <Button
          onClick={onOpen}
          leftIcon={<AiOutlinePlus />}
          colorScheme="green"
          size="lg"
          mt="1rem"
        >
          Create a board
        </Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create board</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                value={values.name}
                onChange={(e) => handleChange(e)}
                name="name"
                placeholder="Board name"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={handleCreate}
                isLoading={false}
                loadingText="Creating board"
              >
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  const loadExistingBoards = () => {
    return (
      <Box mt="1rem" minWidth="50vw" display="flex" flexWrap="wrap">
        {gbData &&
          gbData.map((board: any, index: number) => (
            <Link key={index} href={`boards/${board._id}`}>
              <Box
                mr="1rem"
                mt="1rem"
                height="150px"
                width="150px"
                background={`linear-gradient(
                rgba(0, 0, 0, 0.4),
                rgba(0, 0, 0, 0.4)
              ),
              url(${board.backgroundImage})`}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                borderRadius="5px"
                boxShadow="lg"
                cursor="pointer"
              >
                <Text
                  marginTop="calc(50% - 25px)"
                  height="25px"
                  textAlign="center"
                  textTransform="capitalize"
                  color="white"
                  fontSize="20px"
                  fontWeight="bold"
                >
                  {board.name}
                </Text>
              </Box>
            </Link>
          ))}
      </Box>
    );
  };

  useEffect(() => {
    if (createBoardData && !cbisLoading) {
      toast.success("Bord successfully Create");
      setValues({ name: "" });
    }
  }, [createBoardData, error, cbisLoading]);

  useEffect(() => {
    if (user_id) {
      trigger(user_id);
    }
  }, []);

  useEffect(() => {
    if (gbData && !gbisLoading) {
      dispatch(setBoards(gbData));
    }
  }, [gbData, gbisLoading]);

  return (
    <Box flexGrow={3} mx="2%" boxShadow="base" rounded="lg" bg="white" p="1rem">
      {createBoardModal()}
      {loadExistingBoards()}
    </Box>
  );
};

export default Boards;
