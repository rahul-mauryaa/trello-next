"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import UserNavbar from "@/app/components/user-navbar";
import SubNavbar from "@/app/components/sub-navbar";

import BoardColumns from "@/app/components/board/columns";
import PropType from "prop-types";
import { useAppSelector } from "../hooks";
import { useLazyGetBoardByIdQuery } from "@/app/redux/api/boardApi";

import { useParams } from "next/navigation";
import useHandleToken from "@/app/hooks/useHandleToken";

const Board = (): JSX.Element => {
  const params = useParams();
  const id = params?.id;
  const [board, setBoard] = useState([]);
  console.log(board, "board");
  const [trigger, result, lastPromiseInfo] = useLazyGetBoardByIdQuery();
  const { handleExpire } = useHandleToken();
  const {
    data: bordByid,
    error: bordByiderror,
    isError,
    isLoading,
    isFetching,
  } = result;

  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, []);

  useEffect(() => {
    if (bordByid && !isLoading) {
      setBoard(bordByid);
    }
  }, [bordByid, isLoading]);

  useEffect(() => {
    setTimeout(() => {
      handleExpire();
    }, 1000);
  }, []);

  return (
    <Box
      backgroundImage={`url('${""}')`}
      backgroundPosition="center"
      h="100vh"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <UserNavbar />
      <SubNavbar board={board} />
      <BoardColumns />
    </Box>
  );
};

export default Board;
