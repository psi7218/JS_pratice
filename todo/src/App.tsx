// TodoList.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface todoProps {
  iscompleted: boolean;
  content: string;
  id: string;
}
const TodoApp = () => {
  const [currentTodo, setCurrentTodo] = useState<string>("");
  const [todos, setTodos] = useState<todoProps[]>(() => {
    const temp = localStorage.getItem("todolist");
    return temp ? JSON.parse(temp) : [];
  });
  const [filter, setFilter] = useState<string>("all");
  const [filteredtodos, setFilteredtodos] = useState<todoProps[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    setFilteredtodos(todos.filter((todo) => todo.content.includes(keyword)));
    if (filter === "all") {
      setFilteredtodos(todos);
    } else if (filter === "ongoing") {
      setFilteredtodos(todos.filter((todo) => todo.iscompleted === false));
    } else {
      setFilteredtodos(todos.filter((todo) => todo.iscompleted === true));
    }
  }, [filter, todos, keyword]);

  const handleCurrentTodo = (e) => {
    setCurrentTodo(e.target.value);
  };
  const handleKeyword = (e) => {
    setKeyword(e.target.value);
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

  return (
    <Container>
      <Title>할 일 관리</Title>

      <InputContainer>
        <Input
          type="text"
          placeholder="할 일을 입력하세요"
          value={currentTodo}
          onChange={handleCurrentTodo}
        />
        <Button onClick={addTodo}>추가</Button>
      </InputContainer>
      <Statediv>
        <Olbutton $clicked={filter === "all"} onClick={() => setFilter("all")}>
          {" "}
          전체
        </Olbutton>
        <Olbutton
          $clicked={filter === "ongoing"}
          onClick={() => setFilter("ongoing")}
        >
          {" "}
          진행중
        </Olbutton>
        <Olbutton $clicked={filter === "end"} onClick={() => setFilter("end")}>
          {" "}
          완료
        </Olbutton>
      </Statediv>

      <Input
        type="text"
        placeholder="찾고 싶은 todo"
        value={keyword}
        onChange={handleKeyword}
      />
      {filteredtodos.map((todo, index) => {
        return (
          <TodoItem key={index}>
            <Checkbox
              type="checkbox"
              checked={todo.iscompleted}
              onChange={() => togglecheckebox(todo.id)}
            />
            <TodoText $completed={todo.iscompleted}>{todo.content}</TodoText>
            <Button variant="delete" onClick={() => deleteTodo(todo.id)}>
              삭제
            </Button>
          </TodoItem>
        );
      })}
    </Container>
  );
};

export default TodoApp;

const Statediv = styled.div`
  display: flex;
  align-items: space-between;
`;

const Olbutton = styled.ol<{ $clicked: boolean }>`
  background-color: ${($clicked) => ($clicked ? "white" : "green")};
`;
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #0066ff;
  }
`;

const Button = styled.button<{ variant?: "delete" }>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) =>
    props.variant === "delete" ? "#ff4444" : "#0066ff"};
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${(props) =>
      props.variant === "delete" ? "#cc0000" : "#0052cc"};
  }
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 8px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TodoText = styled.span<{ $completed: boolean }>`
  flex: 1;
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
  color: ${(props) => (props.$completed ? "#888" : "#333")};
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;
