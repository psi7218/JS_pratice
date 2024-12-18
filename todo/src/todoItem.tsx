import React, { useState } from "react";
import * as S from "./styles.ts";
import { todoProps } from "./types.ts";

const TodoItem: React.FC = ({ todo, todos, setTodos }) => {
  const [isModifiedClicked, setIsModifiedClicked] = useState<boolean>(false);
  const [currentwork, setCurrentwork] = useState<string>(todo.content);

  const handleModify = () => {
    setTodos(
      todos.map((tod: todoProps) =>
        tod.id === todo.id ? { ...todo, content: currentwork } : tod
      )
    );
    setIsModifiedClicked(false);
  };

  const handletodo = (e) => {
    setCurrentwork(e.target.value);
  };
  return (
    <>
      {isModifiedClicked ? (
        <S.ModifyingTodo
          type="text"
          value={currentwork}
          onChange={handletodo}
        />
      ) : (
        <S.TodoText $completed={todo.iscompleted}>{todo.content}</S.TodoText>
      )}

      {!isModifiedClicked ? (
        <S.Button onClick={() => setIsModifiedClicked(!isModifiedClicked)}>
          수정
        </S.Button>
      ) : (
        <S.Button onClick={handleModify}> 완료</S.Button>
      )}
    </>
  );
};

export default TodoItem;
