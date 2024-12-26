import React from "react";
import * as S from "../styles/styles.ts";

interface VerticalProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Vertical = ({ filter, setFilter }: VerticalProps) => {
  return (
    <S.Statediv>
      <S.Olbutton $clicked={filter === "all"} onClick={() => setFilter("all")}>
        {" "}
        전체
      </S.Olbutton>
      <S.Olbutton
        $clicked={filter === "ongoing"}
        onClick={() => setFilter("ongoing")}
      >
        {" "}
        진행중
      </S.Olbutton>
      <S.Olbutton $clicked={filter === "end"} onClick={() => setFilter("end")}>
        {" "}
        완료
      </S.Olbutton>
    </S.Statediv>
  );
};

export default Vertical;
