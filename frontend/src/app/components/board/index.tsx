"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import UserNavbar from "@/app/components/user-navbar";
import SubNavbar from "@/app/components/sub-navbar";

import BoardColumns from "@/app/components/board/columns";
import { useLazyGetBoardByIdQuery } from "@/app/redux/api/boardApi";

import { useParams } from "next/navigation";

const Board = (): JSX.Element => {
  const params = useParams();
  const id = params?.id;
  const [board, setBoard] = useState<any>([]);

  const [trigger, result, lastPromiseInfo] = useLazyGetBoardByIdQuery();

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

  return (
    <Box
      backgroundImage={`url('${board[0]?.backgroundImage}')`}
      backgroundPosition="center"
      h="100vh"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <UserNavbar />
      <SubNavbar board={board} />
      <BoardColumns board={board} />
    </Box>
  );
};

export default Board;
