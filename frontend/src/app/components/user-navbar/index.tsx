"use client";
import React, { FC } from "react";
import {
  Button,
  Box,
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import PropTypes from "prop-types";

import { AiOutlineHome } from "react-icons/ai";
import { SiTrello } from "react-icons/si";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteCookie } from "cookies-next";
import { logout } from "@/app/redux/slice/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const UserNavBar: FC = () => {
  const user = useAppSelector((state: any) => state.auth.users);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const logoutFun = async () => {
    deleteCookie("token");
    dispatch(logout());
    router.replace("/login");
    toast.success("Logout Successfully");
  };

  const renderButtons = () => {
    if (user) {
      return (
        <>
          <Menu>
            <MenuButton size="xs" mr="5px">
              <Avatar
                size="sm"
                name={user?.username}
                color="white"
                src="https://bit.ly/tioluwani-kolawole"
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logoutFun}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </>
      );
    }

    return (
      <>
        <Button
          fontSize="20"
          color="brand"
          variant="link"
          float="right"
          mr="2"
          pr="2"
        >
          <Link href="/login">Log in</Link>
        </Button>
        <Button fontSize="md" colorScheme="green" color="white" m="4">
          <Link href="/signup">Sign up</Link>
        </Button>
      </>
    );
  };

  return (
    <Box boxShadow="sm" bg="rgba(0,0,0,0.2)" display="flex">
      <Link href="/home">
        <Button size="xs" ml="5px" my="5px">
          <AiOutlineHome />
        </Button>
      </Link>
      <Link href="/boards">
        <Button size="xs" ml="5px" mr="10px" my="5px">
          Boards
        </Button>
      </Link>
      <Spacer />
      <Box size="md" m="10px" color="white">
        <SiTrello />
      </Box>
      <Text fontWeight="bold" fontSize="20px" mt="2px" color="white">
        Trello clone
      </Text>
      <Spacer />
      {renderButtons()}
    </Box>
  );
};

UserNavBar.propTypes = {
  bg: PropTypes.string,
};

export default UserNavBar;
