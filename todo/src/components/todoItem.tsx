import React, { useState, useEffect } from "react";
import * as S from "../styles/styles.ts";
import { todoProps } from "../types/types.ts";

interface TodoItemProps {
  todo: todoProps;
  todos: todoProps[];
  setTodos: React.Dispatch<React.SetStateAction<todoProps[]>>;
  currentEditingId: string | null;
  setCurrentEditingId: React.Dispatch<React.SetStateAction<string | null>>;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  setTodos,
  todos,
  currentEditingId,
  setCurrentEditingId,
}) => {
  const [currentwork, setCurrentwork] = useState<string>(todo.content);

  useEffect(() => {
    if (currentEditingId === todo.id) {
      setCurrentwork(todo.content);
    }
  }, [currentEditingId, todo.content]);

  const handleModify = () => {
    setTodos(
      todos.map((tod: todoProps) =>
        tod.id === todo.id ? { ...todo, content: currentwork } : tod
      )
    );
    setCurrentEditingId(null);
  };

  const handletodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentwork(e.target.value);
  };
  const isEditing = currentEditingId === todo.id;
  return (
    <>
      {isEditing ? (
        <S.ModifyingTodo
          type="text"
          value={currentwork}
          onChange={handletodo}
        />
      ) : (
        <S.TodoText $completed={todo.iscompleted}>{todo.content}</S.TodoText>
      )}

      {!isEditing ? (
        <S.Button onClick={() => setCurrentEditingId(todo.id)}>수정</S.Button>
      ) : (
        <S.Button onClick={handleModify}> 완료</S.Button>
      )}
    </>
  );
};

export default TodoItem;
