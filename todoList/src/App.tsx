// TodoList.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type dropdownProps = "done" | "yet" | "all";

const TodoApp = () => {
  const [tempwork, setTempwork] = useState<string>("");
  const [dropdown, setDropdown] = useState<string>("all");
  const [dropdownIsopen, setDropdwonIsopen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [searchedlist, setSearchedlist] = useState<Todo[]>([]);

  const [todolist, setTodolist] = useState<Todo[]>(() => {
    const getData = localStorage.getItem("data");
    return getData ? JSON.parse(getData) : [];
  });

  const searchedTodoList = () => {
    setSearchedlist(
      todolist.filter((todo) => {
        todo.text.includes(keyword);
      })
    );
    console.log(searchedlist);
  };

  const filteredTodoList = todolist.filter((todo) => {
    switch (dropdown) {
      case "yet":
        return !todo.completed;
      case "done":
        return todo.completed;
      default:
        return true;
    }
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todolist));
    console.log(1);
  }, [todolist]);

  const handletempwork = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempwork(e.target.value);
  };
  const deleteTodo = (id: string) => {
    setTodolist(todolist.filter((todo) => todo.id !== id));
  };

  const handletodoCheck = (id: string) => {
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
    if (tempwork.length < 1) {
      return;
    }

    const newTodo = {
      id: uuidv4(),
      text: tempwork,
      completed: false,
    };
    setTodolist([newTodo, ...todolist]);
    setTempwork("");
  };
  const handledropdown = (temp: string) => {
    setDropdown(temp);
    setDropdwonIsopen(false);
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
      <div>
        <input
          type="text"
          placeholder="검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={() => searchedTodoList()}>검색</button>
      </div>

      <div>
        <button onClick={() => setDropdwonIsopen(!dropdownIsopen)}>
          {dropdown === "all"
            ? "모두"
            : dropdown === "yet"
            ? "진행 중"
            : "완료됨"}
        </button>
      </div>

      {dropdownIsopen && (
        <ul>
          {["done", "yet", "all"].map((value) => (
            <p onClick={() => handledropdown(value)}>{value}</p>
          ))}
        </ul>
      )}

      {filteredTodoList.map((todo, id) => (
        <TodoItem key={id}>
          <Checkbox
            type="checkbox"
            checked={todo.completed}
            onChange={() => handletodoCheck(todo.id)}
          />
          {/* () => 와 그냥 함수의 차이 정리할 것 */}
          {/* checkbox에서는 onclick 대신 onChange */}
          <TodoText $completed={todo.completed}>{todo.text}</TodoText>
          <Button variant="delete" onClick={() => deleteTodo(todo.id)}>
            삭제
          </Button>
        </TodoItem>
      ))}
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
