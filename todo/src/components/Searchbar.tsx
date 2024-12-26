import React from "react";
import * as S from "../styles/styles";

interface SearchbarProps {
  typing: string;
  handleKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Searchbar = ({ typing, handleKeyword }: SearchbarProps) => {
  return (
    <S.Input
      type="text"
      placeholder="찾고 싶은 todo"
      value={typing}
      onChange={handleKeyword}
    />
  );
};

export default Searchbar;
