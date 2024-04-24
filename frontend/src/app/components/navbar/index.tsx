"use client";
import React, { FC, useEffect } from "react";
import { Button, Image, Flex, Box, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { GrLogout } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "@/app/redux/slice/authSlice";
import { deleteCookie, getCookie } from "cookies-next";

type IProps = {
  bg?: string;
};

const NavBar: FC<IProps> = ({ bg }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const User = useAppSelector((state: any) => state.auth.users.id);

  const logoutFunc = async () => {
    deleteCookie("token");
    dispatch(logout());
    toast.success("Logout Successfully");
    router.replace("/login");
  };

  useEffect(() => {
    if (!getCookie("token")) {
      deleteCookie("token");
      dispatch(logout());
    }
  }, []);

  const renderButtons = () => {
    if (User) {
      return (
        <Button
          fontSize="20"
          color="danger"
          variant="link"
          float="right"
          mr="2"
          pr="2"
          onClick={logoutFunc}
        >
          <GrLogout />
        </Button>
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
    <Box bg={bg} boxShadow="md">
      <Flex>
        <Image height="8" src="/trello-logo.svg" alt="brand logo" m="5"></Image>
        <Spacer />
        {renderButtons()}
      </Flex>
    </Box>
  );
};

export default NavBar;
