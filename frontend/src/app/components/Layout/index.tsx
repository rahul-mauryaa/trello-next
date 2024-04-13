"use client";
import React, { useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineCreditCard,
  AiOutlineBuild,
} from "react-icons/ai";
import NavBar from "../navbar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useHandleToken from "@/app/hooks/useHandleToken";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const sidebarMenu = [
    { path: "/home", buttonName: "Home", page: "home", icon: AiOutlineHome },
    {
      path: "/boards",
      buttonName: "Boards",
      page: "boards",
      icon: AiOutlineCreditCard,
    },
    {
      path: "/templates",
      buttonName: "Templates",
      page: "templates",
      icon: AiOutlineBuild,
    },
    {
      path: "/settings",
      buttonName: "Settings",
      page: "settings",
      icon: AiOutlineSetting,
    },
  ];

  const pathname = usePathname();

  return (
    <div>
      <NavBar bg="white" />
      <Box display="flex" mt="2%">
        <Box
          height="80vh"
          width="20vw"
          boxShadow="base"
          rounded="lg"
          p="1em"
          ml="20px"
        >
          <Box display="flex" flexDirection="column">
            {sidebarMenu.map((menu, index) => (
              <Link href={menu.path} key={index}>
                <Button
                  mt="5px"
                  mb="5px"
                  height="4rem"
                  width={"160px"}
                  borderRadius="1rem"
                  boxShadow={"base"}
                  display="flex"
                  justifyContent="left"
                  colorScheme="gray"
                >
                  <>
                    <menu.icon size="20px" /> &nbsp; {menu.buttonName}
                  </>
                </Button>
              </Link>
            ))}
          </Box>
        </Box>
        {children}
      </Box>
    </div>
  );
};

export default Layout;
