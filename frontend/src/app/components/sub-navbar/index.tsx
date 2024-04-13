import { Box, Heading, Avatar, Tooltip } from "@chakra-ui/react";

import PropType from "prop-types";
import BoardSettings from "@/app/components/sub-navbar/board-settings";
import InviteModal from "@/app/components/sub-navbar/invite-user/modal";
import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import UnsplashDrawer from "@/app/components/sub-navbar/unsplash-in-drawer";
import { useAppSelector } from "../hooks";

const SubNavbar = ({ board }: any): JSX.Element => {
  const users = useAppSelector((state) => state.auth.users);

  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     await dispatch(fetchUsers());
  //   }
  //   fetchMyAPI();
  // }, []);

  const loadBoardUsers = () => {
    return (
      <>
        <Tooltip label={users.username} aria-label="A tooltip">
          <Avatar
            size="sm"
            name={users.username}
            mr="5px"
            src="https://bit.ly/tioluwani-kolawole"
          />
        </Tooltip>
        ;
      </>
    );
  };

  return (
    <Box
      height="40px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bg="rgba(0,0,0,0.1)"
    >
      <Heading
        ml="0.5rem"
        color="white"
        as="h4"
        size="sm"
        whiteSpace="nowrap"
        display="block"
      >
        {board[0]?.name}
      </Heading>
      <Box>{loadBoardUsers()}</Box>
      <Box>
        <InviteModal />
        <BoardSettings board={board} />
        <UnsplashDrawer />
      </Box>
    </Box>
  );
};

export default SubNavbar;
