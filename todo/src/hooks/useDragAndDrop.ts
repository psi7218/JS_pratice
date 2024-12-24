import { useRef } from "react";

import { todoProps } from "../types";

interface useDragAndDropProps {
  todos: todoProps[];
  setTodos: React.Dispatch<React.SetStateAction<todoProps[]>>;
  filteredtodos: todoProps[];
  setFilteredtodos: React.Dispatch<React.SetStateAction<todoProps[]>>;
  filter: string;
}

export const useDragAndDrop = ({
  todos,
  filteredtodos,
  setTodos,
  setFilteredtodos,
  filter,
}: useDragAndDropProps) => {
  const dragItem = useRef<number>(0); // 드래그할 todo idx 저장
  const dragOverItem = useRef<number>(0); // 드래그할 위치의 todo idx 저장

  const dragStart = (e: React.DragEvent, position: number) => {
    dragItem.current = position;
  };

  const dragEnter = (e: React.DragEvent, position: number) => {
    dragOverItem.current = position;
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    const newTodos = filter === "all" ? [...todos] : [...filteredtodos];
    const dragItemValue = newTodos[dragItem.current];
    newTodos.splice(dragItem.current, 1);
    newTodos.splice(dragOverItem.current, 0, dragItemValue);
    dragItem.current = 0;
    dragOverItem.current = 0;
    if (filter === "all") {
      setTodos(newTodos);
    } else {
      setFilteredtodos(newTodos);
    }
  };
  return {
    dragStart,
    dragEnter,
    drop,
  };
};
