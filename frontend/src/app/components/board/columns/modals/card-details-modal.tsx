import React, { FC, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Input,
  ModalOverlay,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Badge,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
// import { CardDetail } from '@/src/types/cards';
// import { deleteCard, fetchCards, updateCard } from '@/src/slices/cards';
// import { useAppSelector } from '@/src/hooks';
import {
  AiOutlineDelete,
  AiOutlineClose,
  AiOutlineLaptop,
  AiOutlineEdit,
} from "react-icons/ai";
import { GrTextAlignFull } from "react-icons/gr";
import CardLabel from "@/app/components/board/columns/modals/card-labels-menu";
import QuillEditor from "@/app/components/quill-editor";
import { AiOutlineDown } from "react-icons/ai";
import {
  useDeleteCardsMutation,
  useUpdateCardsMutation,
} from "@/app/redux/api/cardApi";

// type Props = {
//   onClose: () => void;
//   isOpen: boolean;
//   card: CardDetail;
// };

const CardDetailsModal: FC<any> = ({ onClose, isOpen, card }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(card?.title);
  const [description, setDescription] = useState(card?.description);
  const [assigned, assignUser] = useState(card?.assignedTo);
  const [deleteCards, { isLoading: dcIsLoading }] = useDeleteCardsMutation();
  const [updateCards, { isLoading: ucIsLoading }] = useUpdateCardsMutation();
  // const cardRequest = useAppSelector((state) => state.cards.isRequesting);
  // const cardDelete = useAppSelector((state) => state.cards.isDeleting);
  // const users = useAppSelector((state) => state.users.users);

  const handleCardDelete = async () => {
    await deleteCards(card?._id);
    // await dispatch(deleteCard(card._id));
    // await dispatch(fetchCards());
    onClose();
  };

  const handleCardUpdate = async () => {
    const data = {
      title,
      description,
      columnId: card.columnId,
      assignedTo: assigned,
    };

    await updateCards({ data, id: card?._id });
    onClose();
  };

  const handleModalClose = async () => {
    onClose();
  };

  const handleClick = async (userId: any) => {
    assignUser(userId);

    const data = {
      _id: card._id,
      title,
      description,
      columnId: card.columnId,
      assignedTo: userId,
    };

    // await dispatch(updateCard(data));
  };

  const assignToMenu = () => {
    return (
      <Menu>
        <MenuButton as={Button} size="xs" rightIcon={<AiOutlineDown />}>
          Assign To
        </MenuButton>
        <MenuList>
          {/* {
            .map((user, index) => (
            <MenuItem key={index} onClick={() => handleClick(user._id)}>
              {user?.fullName}
            </MenuItem>
          ))} */}
          <MenuItem onClick={() => handleClick("")}>Unassign</MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <>
      <Modal size="xl" onClose={handleModalClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        {/* https://github.com/chakra-ui/chakra-ui/discussions/2676 */}
        <ModalContent maxW="64rem">
          <ModalBody>
            {card.label && (
              <Badge bg={card.label.type} color="white">
                {card.label.type}
              </Badge>
            )}
            <Box display="flex" marginTop="1rem">
              <AiOutlineLaptop />
              <Input
                name="title"
                size="sm"
                marginLeft="1rem"
                value={title}
                fontWeight="bold"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Card title"
              />
            </Box>
            <Box display="flex">
              <Box width="100%" marginTop="2rem">
                <Box display="flex" fontWeight="bold">
                  <GrTextAlignFull />
                  <Text marginLeft="1rem">Description</Text>
                </Box>
                <Box marginLeft="1.5rem" minHeight="200px" width="90%">
                  <QuillEditor value={description} onChange={setDescription} />
                </Box>
              </Box>
              <Box display="flex" flexDirection="column">
                <CardLabel id={card._id} boardId={card.boardId} />
                {assignToMenu()}
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              size="xs"
              marginRight="1rem"
              onClick={handleCardDelete}
              disabled={dcIsLoading}
              isLoading={ucIsLoading}
              loadingText="Deleting"
              bg="red.500"
              color="white"
              _hover={{
                backgroundColor: "red.600",
              }}
            >
              <AiOutlineDelete />
            </Button>
            <Button
              size="xs"
              marginRight="1rem"
              onClick={handleCardUpdate}
              disabled={dcIsLoading}
              isLoading={ucIsLoading}
              loadingText="Editing"
              bg="green.500"
              color="white"
              _hover={{
                backgroundColor: "green.600",
              }}
            >
              <AiOutlineEdit />
            </Button>

            <Button
              size="xs"
              onClick={handleModalClose}
              disabled={ucIsLoading}
              isLoading={ucIsLoading}
              loadingText="Updating"
            >
              <AiOutlineClose /> Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardDetailsModal;
