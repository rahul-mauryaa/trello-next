import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  FormControl,
  FormLabel,
  FormHelperText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
// import {
//   updateBoardDetail,
//   saveBoard,
//   fetchBoard,
//   deleteBoard,
// } from "@/src/slices/board";
import { AiFillSetting, AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";
import { useRouter } from "next/navigation";
import {
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} from "@/app/redux/api/boardApi";
import { toast } from "react-toastify";

const BoardSettings = ({ board }: any): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateBoardDetail, { data, isLoading }] = useUpdateBoardMutation();
  const [deleteBoard, { data: delBoard, isLoading: delIsLoading }] =
    useDeleteBoardMutation();
  const [values, setValues] = useState({
    name: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSave = async () => {
    updateBoardDetail({ data: values, id: board[0]?._id });
    onClose();
  };

  const handleDelete = async () => {
    deleteBoard(board[0]?._id);
    // await dispatch(deleteBoard());
    // if (boardDetail.status === "success") {
    //   router.push("/boards");
    // }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    setValues({ name: board[0]?.name });
  }, [board]);

  useEffect(() => {
    if (delBoard && !delIsLoading) {
      toast.success("Board delete Successfully");
      router.push("/boards");
    }
  }, [delIsLoading, delBoard]);

  return (
    <>
      <Button onClick={onOpen} size="xs" as={Button} m="5px">
        <AiFillSetting />
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Board Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs isFitted variant="enclosed">
              <TabList mb="2rem">
                <Tab>Basic</Tab>
                <Tab>Advance</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <FormControl id="email">
                    <FormLabel>Board name</FormLabel>
                    <Input
                      value={values?.name}
                      name="name"
                      onChange={(e) => handleChange(e)}
                    />
                    <FormHelperText>
                      You can change this any time
                    </FormHelperText>
                  </FormControl>
                  <Box alignItems="right">
                    <Button
                      backgroundColor="black"
                      color="white"
                      onClick={handleSave}
                      isLoading={isLoading}
                    >
                      <AiOutlineCheck /> &nbsp; Save
                    </Button>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <p>To delete your board, Click on Delete button.</p>
                  <Box alignItems="right">
                    <Button
                      bg="red.500"
                      color="white"
                      onClick={handleDelete}
                      _hover={{
                        backgroundColor: "red.600",
                      }}
                      // isLoading={boardDelete}
                      loadingText="Deleting"
                    >
                      <AiOutlineDelete /> &nbsp;Delete
                    </Button>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default BoardSettings;
