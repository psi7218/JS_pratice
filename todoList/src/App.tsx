// TodoList.tsx
import React, { useState } from "react";
import styled from "styled-components";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  const [tempwork, setTempwork] = useState<string>("");
  const [todolist, setTodolist] = useState<Todo[]>([]);
  const [todoNumber, setTodoNumber] = useState<number>(0);

  const handletempwork = (e) => {
    console.log(e);
    setTempwork(e.target.value);
  };

  const handletodoCheck = (id: number) => {
    setTodolist(
      todolist.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };
  const addTodo = () => {
    setTodoNumber(todoNumber + 1);

    const newTodo = {
      id: todoNumber,
      text: tempwork,
      completed: false,
    };
    setTodolist([newTodo, ...todolist]);
  };
  return (
    <Container>
      <Title>할 일 관리</Title>

      <InputContainer>
        <Input
          type="text"
          placeholder="할 일을 입력하세요"
          value={tempwork}
          onChange={handletempwork}
        />
        <Button onClick={addTodo}>추가</Button>
      </InputContainer>

      {todolist.map((todo, id) => (
        <TodoItem key={id}>
          <Checkbox
            type="checkbox"
            checked={todo.completed}
            onClick={() => handletodoCheck(todo.id)}
          />
          <TodoText completed={todo.completed}>{todo.text}</TodoText>
          <Button variant="delete">삭제</Button>
        </TodoItem>
      ))}
      {/* <TodoList>
        <TodoItem>
          <Checkbox type="checkbox" />
          <TodoText completed={false}>예시 할 일</TodoText>
          <Button variant="delete">삭제</Button>
        </TodoItem>
      </TodoList> */}
    </Container>
  );
};

export default TodoApp;

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

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
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

const TodoText = styled.span<{ completed: boolean }>`
  flex: 1;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: ${(props) => (props.completed ? "#888" : "#333")};
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;
