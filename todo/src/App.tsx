// TodoList.tsx
import React, { useEffect, useState } from "react";
import * as S from "./styles.ts";
import TodoItem from "./todoItem.tsx";
import { todoProps } from "./types.ts";
import { useDragAndDrop } from "./hooks/useDragAndDrop.ts";

const TodoApp = () => {
  const [currentTodo, setCurrentTodo] = useState<string>("");
  const [todos, setTodos] = useState<todoProps[]>(() => {
    const temp = localStorage.getItem("todolist");
    return temp ? JSON.parse(temp) : [];
  });
  const [filter, setFilter] = useState<string>("all");
  const [filteredtodos, setFilteredtodos] = useState<todoProps[]>([]);
  const [typing, setTyping] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setKeyword(typing);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [typing]);

  useEffect(() => {
    let tempTodos = [...todos];
    if (filter === "ongoing") {
      tempTodos = tempTodos.filter((todo) => todo.iscompleted === false);
    } else if (filter === "end") {
      tempTodos = tempTodos.filter((todo) => todo.iscompleted === true);
    }

    if (keyword.trim()) {
      tempTodos = tempTodos.filter((todo) => todo.content.includes(keyword));
    }
    setFilteredtodos(tempTodos);
  }, [filter, todos, keyword]);

  const handleCurrentTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTodo(e.target.value);
  };
  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTyping(e.target.value);
  };
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (currentTodo === "") {
      return;
    }

    const newTodo = {
      iscompleted: false,
      content: currentTodo,
      id: crypto.randomUUID(),
    };
    setTodos([newTodo, ...todos]);
    setCurrentTodo("");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const togglecheckebox = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, iscompleted: !todo.iscompleted } : todo
      )
    );
  };

  const { dragStart, dragEnter, drop } = useDragAndDrop({
    todos,
    setTodos,
    filter,
    filteredtodos,
    setFilteredtodos,
  });
  return (
    <S.Container>
      <S.Title>할 일 관리</S.Title>

      <S.InputContainer>
        <S.Input
          type="text"
          placeholder="할 일을 입력하세요"
          value={currentTodo}
          onChange={handleCurrentTodo}
        />
        <S.Button onClick={addTodo}>추가</S.Button>
      </S.InputContainer>
      <S.Statediv>
        <S.Olbutton
          $clicked={filter === "all"}
          onClick={() => setFilter("all")}
        >
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
        <S.Olbutton
          $clicked={filter === "end"}
          onClick={() => setFilter("end")}
        >
          {" "}
          완료
        </S.Olbutton>
      </S.Statediv>

      <S.Input
        type="text"
        placeholder="찾고 싶은 todo"
        value={typing}
        onChange={handleKeyword}
      />

      <div>
        {filteredtodos.map((todo, index) => {
          return (
            <S.TodoItem
              key={index}
              draggable={true}
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              onDragOver={(e) => e.preventDefault()}
            >
              <S.Checkbox
                type="checkbox"
                checked={todo.iscompleted}
                onChange={() => togglecheckebox(todo.id)}
              />
              <TodoItem
                todo={todo}
                setTodos={setTodos}
                todos={todos}
                currentEditingId={currentEditingId}
                setCurrentEditingId={setCurrentEditingId}
              />

              <S.Button variant="delete" onClick={() => deleteTodo(todo.id)}>
                삭제
              </S.Button>
            </S.TodoItem>
          );
        })}
      </div>
    </S.Container>
  );
};

export default TodoApp;
