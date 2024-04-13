import React, { FC } from "react";
import PropTypes from "prop-types";
// import { CardDetail } from '@/src/types/cards';
import Card from "@/app/components/board/columns/card";

type Props = {
  cards: any[];
  showCardDetail: (cardId: string) => void;
};

const Cards: FC<Props> = ({ cards, showCardDetail }) => {
  return (
    <>
      {cards?.map((card, index) => (
        <Card
          key={index}
          card={card}
          cardIndex={index}
          showCardDetail={showCardDetail}
        />
      ))}
    </>
  );
};

export default Cards;
